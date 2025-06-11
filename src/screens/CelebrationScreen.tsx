import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { COLORS } from '../constants/colors';

type CelebrationScreenRouteProp = RouteProp<RootStackParamList, 'Celebration'>;
type CelebrationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Celebration'
>;

interface CelebrationScreenProps {
  route: CelebrationScreenRouteProp;
}

export default function CelebrationScreen({ route }: CelebrationScreenProps) {
  const navigation = useNavigation<CelebrationScreenNavigationProp>();
  const { score, time, mistakes } = route.params;

  const handlePlayAgain = () => {
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ka pai!</Text>
      <Text style={styles.subtitle}>Well done!</Text>

      <View style={styles.statsContainer}>
        <Text style={styles.statText}>Score: {score}</Text>
        <Text style={styles.statText}>Time: {time}s</Text>
        <Text style={styles.statText}>Mistakes: {mistakes}</Text>
      </View>

      <TouchableOpacity
        style={styles.playAgainButton}
        onPress={handlePlayAgain}
        activeOpacity={0.8}
      >
        <Text style={styles.playAgainText}>Play Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.success,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    color: COLORS.text,
    marginBottom: 40,
  },
  statsContainer: {
    backgroundColor: COLORS.cardFront,
    padding: 30,
    borderRadius: 20,
    marginBottom: 40,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  statText: {
    fontSize: 20,
    color: COLORS.text,
    marginBottom: 10,
  },
  playAgainButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  playAgainText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textLight,
  },
});