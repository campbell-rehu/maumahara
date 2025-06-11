import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { COLORS } from '../constants/colors';

type GameScreenRouteProp = RouteProp<RootStackParamList, 'Game'>;

interface GameScreenProps {
  route: GameScreenRouteProp;
}

export default function GameScreen({ route }: GameScreenProps) {
  const { difficulty } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Screen</Text>
      <Text style={styles.difficulty}>Difficulty: {difficulty}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
  },
  difficulty: {
    fontSize: 20,
    color: COLORS.text,
  },
});