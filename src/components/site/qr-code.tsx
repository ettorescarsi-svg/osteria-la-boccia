import { useEffect, useState } from "react";

import { encodeQr } from "@/lib/qr";

/**
 * QR code che apre il menu di questo stesso sito.
 * Si genera nel browser a partire dall'indirizzo reale della pagina, quindi
 * funziona su qualsiasi dominio senza doverlo scrivere nel codice.
 */
export function QrCode({ className }: { className?: string }) {
  const [matrix, setMatrix] = useState<boolean[][] | null>(null);

  useEffect(() => {
    setMatrix(encodeQr(`${window.location.origin}/#menu`));
  }, []);

  if (!matrix) {
    // Prima del montaggio (e nel rendering sul server) resta solo un riquadro vuoto.
    return <div className={className} aria-hidden="true" />;
  }

  const quiet = 4; // margine bianco richiesto dallo standard
  const size = matrix.length + quiet * 2;
  const path = matrix
    .flatMap((row, y) => row.map((dark, x) => (dark ? `M${x + quiet} ${y + quiet}h1v1h-1z` : "")))
    .join("");

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      role="img"
      aria-label="QR code per aprire il menu dell'osteria dal telefono"
      shapeRendering="crispEdges"
    >
      <rect width={size} height={size} fill="oklch(0.975 0.012 80)" />
      <path d={path} fill="oklch(0.24 0.02 45)" />
    </svg>
  );
}
