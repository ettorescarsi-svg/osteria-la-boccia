/**
 * Minimal QR Code generator (byte mode, error correction level L, versions 1-5).
 * Enough for short URLs (up to 106 bytes). No dependencies.
 * Returns a square matrix where `true` is a dark module.
 */

// Version -> [data codewords, error-correction codewords]. Level L, single block.
const VERSIONS: ReadonlyArray<readonly [number, number]> = [
  [19, 7],
  [34, 10],
  [55, 15],
  [80, 20],
  [108, 26],
];

const MAX_VERSION = VERSIONS.length;

// --- Reed-Solomon over GF(256), primitive polynomial 0x11D -------------------

const EXP = new Uint8Array(512);
const LOG = new Uint8Array(256);
(() => {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = x;
    LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255] ?? 0;
})();

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return EXP[(LOG[a] ?? 0) + (LOG[b] ?? 0)] ?? 0;
}

function reedSolomon(data: number[], ecLen: number): number[] {
  // Generator polynomial: product of (x - alpha^i), i = 0 .. ecLen - 1
  let gen: number[] = [1];
  for (let i = 0; i < ecLen; i++) {
    const next = new Array<number>(gen.length + 1).fill(0);
    for (let j = 0; j < gen.length; j++) {
      next[j] = (next[j] ?? 0) ^ (gen[j] ?? 0);
      next[j + 1] = (next[j + 1] ?? 0) ^ gfMul(gen[j] ?? 0, EXP[i] ?? 0);
    }
    gen = next;
  }
  const rem = new Array<number>(ecLen).fill(0);
  for (const byte of data) {
    const factor = byte ^ (rem.shift() ?? 0);
    rem.push(0);
    for (let i = 0; i < ecLen; i++) {
      rem[i] = (rem[i] ?? 0) ^ gfMul(gen[i + 1] ?? 0, factor);
    }
  }
  return rem;
}

// --- Bit helpers -------------------------------------------------------------

function toBytes(text: string): number[] {
  return Array.from(new TextEncoder().encode(text));
}

function getBit(value: number, index: number): boolean {
  return ((value >>> index) & 1) !== 0;
}

// --- Matrix construction -----------------------------------------------------

function buildCodewords(bytes: number[], version: number): number[] {
  const [dataLen, ecLen] = VERSIONS[version - 1] ?? VERSIONS[0]!;
  const bits: number[] = [];
  const push = (value: number, count: number) => {
    for (let i = count - 1; i >= 0; i--) bits.push((value >>> i) & 1);
  };
  push(0b0100, 4); // byte mode
  push(bytes.length, 8); // character count (8 bits for versions 1-9)
  for (const b of bytes) push(b, 8);
  push(0, Math.min(4, dataLen * 8 - bits.length)); // terminator
  while (bits.length % 8 !== 0) bits.push(0);

  const data: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    let byte = 0;
    for (let j = 0; j < 8; j++) byte = (byte << 1) | (bits[i + j] ?? 0);
    data.push(byte);
  }
  for (let pad = 0xec; data.length < dataLen; pad ^= 0xec ^ 0x11) data.push(pad);

  return [...data, ...reedSolomon(data, ecLen)];
}

type Grid = boolean[][];

function makeGrid(size: number): Grid {
  return Array.from({ length: size }, () => new Array<boolean>(size).fill(false));
}

function maskApplies(mask: number, x: number, y: number): boolean {
  switch (mask) {
    case 0:
      return (x + y) % 2 === 0;
    case 1:
      return y % 2 === 0;
    case 2:
      return x % 3 === 0;
    case 3:
      return (x + y) % 3 === 0;
    case 4:
      return (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0;
    case 5:
      return ((x * y) % 2) + ((x * y) % 3) === 0;
    case 6:
      return (((x * y) % 2) + ((x * y) % 3)) % 2 === 0;
    default:
      return (((x + y) % 2) + ((x * y) % 3)) % 2 === 0;
  }
}

function penalty(m: Grid): number {
  const size = m.length;
  let score = 0;

  // Rule 1: runs of five or more same-colour modules in a row or column
  for (let pass = 0; pass < 2; pass++) {
    for (let a = 0; a < size; a++) {
      let run = 1;
      for (let b = 1; b < size; b++) {
        const cur = pass === 0 ? m[a]![b]! : m[b]![a]!;
        const prev = pass === 0 ? m[a]![b - 1]! : m[b - 1]![a]!;
        if (cur === prev) {
          run++;
          if (run === 5) score += 3;
          else if (run > 5) score += 1;
        } else run = 1;
      }
    }
  }

  // Rule 2: 2x2 blocks of the same colour
  for (let y = 0; y < size - 1; y++) {
    for (let x = 0; x < size - 1; x++) {
      const c = m[y]![x]!;
      if (c === m[y]![x + 1] && c === m[y + 1]![x] && c === m[y + 1]![x + 1]) score += 3;
    }
  }

  // Rule 3: finder-like pattern 1011101 with four light modules on one side
  const pattern = [true, false, true, true, true, false, true];
  const matches = (get: (i: number) => boolean, start: number) =>
    pattern.every((p, i) => get(start + i) === p);
  for (let pass = 0; pass < 2; pass++) {
    for (let a = 0; a < size; a++) {
      const get = (i: number) => (pass === 0 ? m[a]![i]! : m[i]![a]!);
      for (let s = 0; s + 7 <= size; s++) {
        if (!matches(get, s)) continue;
        const lightBefore = s >= 4 && [1, 2, 3, 4].every((k) => !get(s - k));
        const lightAfter = s + 11 <= size && [7, 8, 9, 10].every((k) => !get(s + k));
        if (lightBefore || lightAfter) score += 40;
      }
    }
  }

  // Rule 4: balance of dark and light modules
  let dark = 0;
  for (const row of m) for (const v of row) if (v) dark++;
  const percent = (dark * 100) / (size * size);
  score += Math.floor(Math.abs(percent - 50) / 5) * 10;

  return score;
}

/** Returns the QR matrix for `text`, or `null` when it is too long for versions 1-5. */
export function encodeQr(text: string): boolean[][] | null {
  const bytes = toBytes(text);
  let version = 0;
  for (let v = 1; v <= MAX_VERSION; v++) {
    if (bytes.length <= (VERSIONS[v - 1]?.[0] ?? 0) - 2) {
      version = v;
      break;
    }
  }
  if (version === 0) return null;

  const size = 17 + 4 * version;
  const modules = makeGrid(size);
  const isFunction = makeGrid(size);

  const setFunction = (x: number, y: number, dark: boolean) => {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    modules[y]![x] = dark;
    isFunction[y]![x] = true;
  };

  const drawFinder = (cx: number, cy: number) => {
    for (let dy = -4; dy <= 4; dy++) {
      for (let dx = -4; dx <= 4; dx++) {
        const dist = Math.max(Math.abs(dx), Math.abs(dy));
        setFunction(cx + dx, cy + dy, dist !== 2 && dist !== 4);
      }
    }
  };

  const drawFormat = (mask: number) => {
    const data = (0b01 << 3) | mask; // error correction level L = 01
    let rem = data;
    for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
    const bits = ((data << 10) | rem) ^ 0x5412;

    for (let i = 0; i <= 5; i++) setFunction(8, i, getBit(bits, i));
    setFunction(8, 7, getBit(bits, 6));
    setFunction(8, 8, getBit(bits, 7));
    setFunction(7, 8, getBit(bits, 8));
    for (let i = 9; i < 15; i++) setFunction(14 - i, 8, getBit(bits, i));

    for (let i = 0; i < 8; i++) setFunction(size - 1 - i, 8, getBit(bits, i));
    for (let i = 8; i < 15; i++) setFunction(8, size - 15 + i, getBit(bits, i));
    setFunction(8, size - 8, true); // the always-dark module
  };

  // Timing patterns, finders and (from version 2) the alignment pattern
  for (let i = 0; i < size; i++) {
    setFunction(6, i, i % 2 === 0);
    setFunction(i, 6, i % 2 === 0);
  }
  drawFinder(3, 3);
  drawFinder(size - 4, 3);
  drawFinder(3, size - 4);
  if (version >= 2) {
    const c = size - 7;
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        setFunction(c + dx, c + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
      }
    }
  }
  drawFormat(0); // reserves the format areas

  // Place the codewords in the zigzag order
  const codewords = buildCodewords(bytes, version);
  const totalBits = codewords.length * 8;
  let bitIndex = 0;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vert = 0; vert < size; vert++) {
      for (let j = 0; j < 2; j++) {
        const x = right - j;
        const upward = ((right + 1) & 2) === 0;
        const y = upward ? size - 1 - vert : vert;
        if (!isFunction[y]![x] && bitIndex < totalBits) {
          modules[y]![x] = getBit(codewords[bitIndex >>> 3] ?? 0, 7 - (bitIndex & 7));
          bitIndex++;
        }
      }
    }
  }

  // Choose the mask with the lowest penalty
  const applyMask = (mask: number) => {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (!isFunction[y]![x] && maskApplies(mask, x, y)) modules[y]![x] = !modules[y]![x];
      }
    }
  };
  let bestMask = 0;
  let bestScore = Infinity;
  for (let mask = 0; mask < 8; mask++) {
    applyMask(mask);
    drawFormat(mask);
    const score = penalty(modules);
    if (score < bestScore) {
      bestScore = score;
      bestMask = mask;
    }
    applyMask(mask); // undo
  }
  applyMask(bestMask);
  drawFormat(bestMask);

  return modules;
}
