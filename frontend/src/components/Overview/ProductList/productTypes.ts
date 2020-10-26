const brennevin = [
  'Akevitt',
  'Vodka',
  'Druebrennevin',
  'Whisky',
  'Genever',
  'Gin',
  'Bitter',
  'Fruktbrennevin',
  'Brennevin, annet',
  'Rom',
  'Sake',
  'Brennevin, nøytralt < 37,5 %',
  'Likør',
];
const annet = ['Spesial', 'Mjød', 'Sider'];
const alkoholfritt = [
  'Alkoholfri musserende drikk',
  'Alkoholfri most',
  'Alkoholfri leskedrikk',
  'Alkoholfri vin',
  'Alkoholfritt øl',
  'Alkoholfritt, øvrig',
];
const ol = [
  'Klosterstil',
  'Red/amber',
  'Scotch ale',
  'Porter & stout',
  'Saison farmhouse ale',
  'Hveteøl',
  'Pale ale',
  'Mørk lager',
  'Lys lager',
  'Brown ale',
  'India pale ale',
  'Lys ale',
  'Surøl',
];
const annen_vin = [
  'Aromatisert vin',
  'Perlende vin, rosé',
  'Rosévin',
  'Perlende vin, rød',
  'Perlende vin, hvit',
  'Barley wine',
  'Fruktvin',
  'Madeira',
];
const sterk_vin = ['Sherry', 'Portvin', 'Vermut', 'Sterkvin, annen'];
const musserende_vin = [
  'Champagne, brut',
  'Musserende vin, rosé',
  'Champagne, rosé',
  'Champagne extra brut',
  'Champagne, sec',
  'Champagne, annen',
];

export const getProductType = (product: string) => {
  switch (product) {
    case 'rodvin': {
      return ['Rødvin'];
    }
    case 'hvitvin': {
      return ['Hvitvin'];
    }
    case 'musserende_vin': {
      return musserende_vin;
    }
    case 'sterk_vin': {
      return sterk_vin;
    }
    case 'annen_vin': {
      return annen_vin;
    }
    case 'ol': {
      return ol;
    }
    case 'brennevin': {
      return brennevin;
    }
    case 'alkoholfritt': {
      return alkoholfritt;
    }
    case 'annet': {
      return annet;
    }
    default: {
      return ['Rødvin', 'Hvitvin'].concat(musserende_vin, sterk_vin, annen_vin, ol, brennevin, alkoholfritt, annet);
    }
  }
};
