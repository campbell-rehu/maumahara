export type RootStackParamList = {
  Welcome: undefined;
  Game: { difficulty: 'easy' | 'medium' | 'hard' };
  Celebration: { score: number; time: number; mistakes: number };
};