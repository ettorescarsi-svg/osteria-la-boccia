export type Dish = {
  name: string;
  desc: string;
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

// NOTE: i piatti segnati "da confermare" sono esempi inseriti per completare le schede
// Dolci e Vini: nomi e prezzi vanno verificati con l'osteria prima della pubblicazione.
export const MENU: MenuCategory[] = [
  {
    id: "primi",
    label: "Primi",
    dishes: [
      {
        name: "Bigoli all'anatra",
        desc: "Bigoli al torchio con ragù d'anatra dei Colli Euganei",
        price: "12 €",
        pick: true,
      },
      {
        name: "Risotto al radicchio",
        desc: "Radicchio tardivo di Treviso e Monte Veronese",
        price: "13 €",
      },
      {
        name: "Pasta e fagioli",
        desc: "Fagioli di Lamon, rosmarino e olio del Garda",
        price: "10 €",
        veg: true,
      },
    ],
  },
  {
    id: "secondi",
    label: "Secondi",
    dishes: [
      {
        name: "Baccalà alla vicentina",
        desc: "Con polenta di mais Marano morbida",
        price: "16 €",
        pick: true,
      },
      {
        name: "Fegato alla veneziana",
        desc: "Cipolla bianca stufata lentamente",
        price: "14 €",
      },
      {
        name: "Polenta e funghi",
        desc: "Funghi chiodini trifolati e prezzemolo",
        price: "11 €",
        veg: true,
      },
      {
        name: "Verdure di stagione",
        desc: "Dagli orti della bassa padovana, alla griglia",
        price: "6 €",
        veg: true,
      },
    ],
  },
  {
    id: "dolci",
    label: "Dolci",
    dishes: [
      {
        name: "Tiramisù della casa",
        desc: "Mascarpone fresco e caffè, ricetta della nonna",
        price: "6 €",
        pick: true,
      },
      {
        name: "Torta di mele vegana",
        desc: "Mele del Veneto e cannella",
        price: "5 €",
        veg: true,
      },
      // da confermare
      {
        name: "Zaleti con vin santo",
        desc: "Biscotti veneti di farina di mais e uvetta, da inzuppare",
        price: "6 €",
        veg: true,
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
  {
    id: "aperitivo",
    label: "Aperitivo",
    dishes: [
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
];
