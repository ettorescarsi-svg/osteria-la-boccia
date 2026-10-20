export type Dish = {
  name: string;
  /** Nota sugli ingredienti, facoltativa */
  desc?: string;
  price: string;
  /** Piatto vegano o vegetariano */
  veg?: boolean;
  /** Piatto della casa, consigliato dallo chef */
  pick?: boolean;
};

export type MenuCategory = {
  id: string;
  label: string;
  dishes: Dish[];
};

// Menu reale dell'osteria (fornito dal titolare).
// NOTE: le schede "Aperitivo" e "Vini" sono ancora esempi da verificare con l'osteria:
// i prezzi del tavolo e della carta dei vini vanno confermati prima della pubblicazione.
export const MENU: MenuCategory[] = [
  {
    id: "antipasti",
    label: "Antipasti",
    dishes: [
      {
        name: "Antipasto veneziano sarde in saor baccalà mantecato e alici marinate",
        price: "14,00 €",
        pick: true,
      },
      {
        name: "Tagliere salumi e formaggi selezione la boccia",
        price: "15,00 €",
      },
      {
        name: "Cipolla arrostita crema di caprino acciughe del cantabrico e mandorle",
        price: "13,00 €",
      },
    ],
  },
  {
    id: "primi",
    label: "Primi",
    dishes: [
      {
        name: "Paccheri con crema di zucchine al basilico e mandorle",
        price: "14,00 €",
        veg: true,
      },
      {
        name: "Paccheri cacio & pepe al profumo di limone",
        price: "14,00 €",
        veg: true,
      },
      {
        name: "Fettuccine al ragù di cortile",
        price: "15,00 €",
      },
    ],
  },
  {
    id: "secondi",
    label: "Secondi",
    dishes: [
      {
        name: "Faraona arrosto con patate",
        price: "18,00 €",
      },
      {
        name: "Baccalà alla vicentina con polenta",
        price: "19,00 €",
        pick: true,
      },
    ],
  },
  {
    id: "tartare",
    label: "Le nostre tartare",
    dishes: [
      {
        name: "La cruda (sale pepe tabacco worchestershire, senape, trito capperi acciughe olive cipolla e tuorlo)",
        price: "18,00 €",
      },
      {
        name: "La leggermente scottata con cipolla caramellata e caprino",
        price: "18,00 €",
      },
      {
        name: "La leggermente scottata con crema cacio e guanciale croccante",
        price: "18,00 €",
      },
    ],
  },
  {
    id: "contorni",
    label: "Contorni",
    dishes: [
      {
        name: "Erbette spadellate",
        price: "6,00 €",
        veg: true,
      },
      {
        name: "Patate al forno",
        price: "6,00 €",
        veg: true,
      },
    ],
  },
  {
    id: "dolci",
    label: "Dolci",
    dishes: [
      {
        name: "Dolci del giorno fatti in casa",
        price: "6,00 €",
      },
    ],
  },
  {
    id: "aperitivo",
    label: "Aperitivo",
    dishes: [
      // da confermare: non arriva dal menu del titolare
      {
        name: "Spritz padovano",
        desc: "Aperol, prosecco e seltz, come vuole la tradizione",
        price: "4 €",
        pick: true,
      },
      {
        name: "Cicchetti misti",
        desc: "Baccalà mantecato, sarde in saor, polpette",
        price: "9 €",
      },
      {
        name: "Tagliere della Boccia",
        desc: "Salumi e formaggi veneti, mostarda e pane",
        price: "14 €",
      },
    ],
  },
  {
    id: "vini",
    label: "Vini",
    dishes: [
      // da confermare: la carta dei vini non era nel sito originale
      {
        name: "Ombra di vino della casa",
        desc: "Rosso o bianco, al calice, come si beve al banco",
        price: "2,50 €",
      },
      {
        name: "Fior d'Arancio dei Colli Euganei",
        desc: "Moscato aromatico e profumato, dal Padovano",
        price: "5 €",
        pick: true,
      },
      {
        name: "Prosecco",
        desc: "Secco e fresco, per l'aperitivo",
        price: "4,50 €",
      },
      {
        name: "Rosso dei Colli Euganei",
        desc: "Corpo pieno, da abbinare a bigoli e fegato",
        price: "5 €",
      },
    ],
  },
];
