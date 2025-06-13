export interface Animal {
  id: string;
  english: string;
  maori: string;
  image: string;
}

export const ANIMALS: Animal[] = [
  { id: '1', english: 'Dog', maori: 'Kurī', image: 'dog' },
  { id: '2', english: 'Cat', maori: 'Ngeru', image: 'cat' },
  { id: '3', english: 'Horse', maori: 'Hōiho', image: 'horse' },
  { id: '4', english: 'Sheep', maori: 'Hipi', image: 'sheep' },
  { id: '5', english: 'Cow', maori: 'Kau', image: 'cow' },
  { id: '6', english: 'Pig', maori: 'Poaka', image: 'pig' },
  { id: '7', english: 'Kiwi', maori: 'Kiwi', image: 'kiwi' },
  { id: '8', english: 'Pukeko', maori: 'Pūkeko', image: 'pukeko' },
  { id: '9', english: 'Tui', maori: 'Tūī', image: 'tui' },
  { id: '10', english: 'Butterfly', maori: 'Pūrerehua', image: 'butterfly' },
  { id: '11', english: 'Snail', maori: 'Pupu', image: 'snail' },
];