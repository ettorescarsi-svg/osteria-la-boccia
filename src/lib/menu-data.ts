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
        name: "Antipasto veneziano",
        desc: "Sarde in saor, baccalà mantecato e alici marinate",
        price: "14,00 €",
        pick: true,
      },
      {
        name: "Tagliere salumi e formaggi",
        desc: "Selezione La Boccia",
        price: "15,00 €",
      },
      {
        name: "Cipolla arrostita",
        desc: "Crema di caprino, acciughe del Cantabrico e mandorle",
        price: "13,00 €",
      },
    ],
  },
  {
    id: "primi",
    label: "Primi",
    dishes: [
      {
        name: "Paccheri con crema di zucchine",
        desc: "Basilico e mandorle",
        price: "14,00 €",
        veg: true,
      },
      {
        name: "Paccheri cacio e pepe",
        desc: "Al profumo di limone",
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
        name: "Faraona arrosto",
        desc: "Con patate",
        price: "18,00 €",
      },
      {
        name: "Baccalà alla vicentina",
        desc: "Con polenta",
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
        name: "La cruda",
        desc: "Sale, pepe, tabasco, worcestershire, senape, trito di capperi, acciughe, olive, cipolla e tuorlo",
        price: "18,00 €",
      },
      {
        name: "La leggermente scottata al caprino",
        desc: "Con cipolla caramellata e caprino",
        price: "18,00 €",
      },
      {
        name: "La leggermente scottata al cacio e guanciale",
        desc: "Con crema cacio e guanciale croccante",
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
