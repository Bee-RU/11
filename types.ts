export enum CakeType {
  STRAWBERRY = 'STRAWBERRY',
  CHOCOLATE = 'CHOCOLATE',
  MATCHA = 'MATCHA',
  LEMON = 'LEMON'
}

export interface CakeTheme {
  id: CakeType;
  mainColor: string;
  secondaryColor: string;
  accentColor: string;
  bgColor: string;
  flavors: string[]; // Hex codes representing flavor profile
  sweetness: number; // 1-5
  texture: number; // 1-5 (Fluffy to Dense)
}

export const CAKE_THEMES: Record<CakeType, CakeTheme> = {
  [CakeType.STRAWBERRY]: {
    id: CakeType.STRAWBERRY,
    mainColor: '#FF9AA2',
    secondaryColor: '#FFDAC1',
    accentColor: '#FF6F61',
    bgColor: '#FFF0F5',
    flavors: ['#FF6F61', '#FFF', '#FFB7B2'],
    sweetness: 4,
    texture: 3,
  },
  [CakeType.CHOCOLATE]: {
    id: CakeType.CHOCOLATE,
    mainColor: '#5D4037',
    secondaryColor: '#8D6E63',
    accentColor: '#3E2723',
    bgColor: '#EFEBE9',
    flavors: ['#3E2723', '#D7CCC8', '#5D4037'],
    sweetness: 5,
    texture: 5,
  },
  [CakeType.MATCHA]: {
    id: CakeType.MATCHA,
    mainColor: '#9CCC65',
    secondaryColor: '#DCEDC8',
    accentColor: '#558B2F',
    bgColor: '#F1F8E9',
    flavors: ['#558B2F', '#FFF', '#C5E1A5'],
    sweetness: 2,
    texture: 4,
  },
  [CakeType.LEMON]: {
    id: CakeType.LEMON,
    mainColor: '#FFF176',
    secondaryColor: '#FFF9C4',
    accentColor: '#FBC02D',
    bgColor: '#FFFDE7',
    flavors: ['#FBC02D', '#FFF', '#FFF59D'],
    sweetness: 3,
    texture: 2,
  },
};