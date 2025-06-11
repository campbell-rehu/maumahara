import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { COLORS } from '../constants/colors';
import GameBoard from '../components/GameBoard';

type GameScreenRouteProp = RouteProp<RootStackParamList, 'Game'>;
type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Game'>;

interface GameScreenProps {
  route: GameScreenRouteProp;
}

export default function GameScreen({ route }: GameScreenProps) {
  const { difficulty } = route.params;
  const navigation = useNavigation<GameScreenNavigationProp>();

  const handleGameComplete = (score: number, time: number, mistakes: number) => {
    navigation.navigate('Celebration', { score, time, mistakes });
  };

  return (
    <View style={styles.container}>
      <GameBoard 
        difficulty={difficulty} 
        onGameComplete={handleGameComplete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});