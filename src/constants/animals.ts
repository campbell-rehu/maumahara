export interface Animal {
  id: string;
  english: string;
  maori: string;
  image: string;
}

export const ANIMALS: Animal[] = [
  { id: '1', english: 'Dog', maori: 'Kurī', image: 'dog' },
  { id: '2', english: 'Cat', maori: 'Ngeru', image: 'cat' },
  { id: '3', english: 'Bird', maori: 'Manu', image: 'bird' },
  { id: '4', english: 'Fish', maori: 'Ika', image: 'fish' },
  { id: '5', english: 'Horse', maori: 'Hōiho', image: 'horse' },
  { id: '6', english: 'Sheep', maori: 'Hipi', image: 'sheep' },
  { id: '7', english: 'Cow', maori: 'Kau', image: 'cow' },
  { id: '8', english: 'Pig', maori: 'Poaka', image: 'pig' },
  { id: '9', english: 'Chicken', maori: 'Heihei', image: 'chicken' },
  { id: '10', english: 'Whale', maori: 'Tohorā', image: 'whale' },
];