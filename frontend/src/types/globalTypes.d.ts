export interface Product {
  Varenavn: string;
  Varenummer: string;
  Varetype: string;
  Volum: string;
  Pris: string;
  Produsent: string;
  Land: string;
  Farge: string;
  Lukt: string;
  Smak: string;
}

export interface IReview {
  userEmail?: string;
  varenummer: string;
  title: string;
  description: string;
  rating: number;
}
