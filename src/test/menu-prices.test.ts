import { describe, expect, it } from "vitest";
import { MENU } from "@/lib/menu-data";

describe("Prezzi del menu fornito dal titolare", () => {
  it.each([
    ["Dolci del giorno fatti in casa", "6,00 €"],
    ["Erbette spadellate", "6,00 €"],
    ["Patate al forno", "6,00 €"],
    ["Antipasto veneziano sarde in saor baccalà mantecato e alici marinate", "14,00 €"],
    ["Tagliere salumi e formaggi selezione la boccia", "15,00 €"],
    ["Cipolla arrostita crema di caprino acciughe del cantabrico e mandorle", "13,00 €"],
    ["Paccheri con crema di zucchine al basilico e mandorle", "14,00 €"],
    ["Paccheri cacio & pepe al profumo di limone", "14,00 €"],
    ["Fettuccine al ragù di cortile", "15,00 €"],
    ["Faraona arrosto con patate", "18,00 €"],
    ["Baccalà alla vicentina con polenta", "19,00 €"],
    ["La leggermente scottata con cipolla caramellata e caprino", "18,00 €"],
    ["La cruda (sale pepe tabacco worchestershire, senape, trito capperi acciughe olive cipolla e tuorlo)", "18,00 €"],
    ["La leggermente scottata con crema cacio e guanciale croccante", "18,00 €"],
  ])("%s costa %s", (name, price) => {
    const dish = MENU.flatMap((category) => category.dishes).find((item) => item.name === name);
    expect(dish?.price).toBe(price);
  });
});