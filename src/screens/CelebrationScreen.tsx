import React, { useMemo } from 'react';
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

// Celebratory Māori phrases with their meanings
const CELEBRATION_PHRASES = [
  'Ka pai!',           // Good!/Well done!
  'Ka mau te wehi!',   // Amazing!/Fantastic!
  'Tino pai!',         // Very good!
  'Ka pai rawa!',      // Really good!
  'Me he tē!',         // Like a boss!
];

export default function CelebrationScreen({ route }: CelebrationScreenProps) {
  const navigation = useNavigation<CelebrationScreenNavigationProp>();

  // Select a random celebratory phrase each time the screen loads
  const celebrationPhrase = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * CELEBRATION_PHRASES.length);
    return CELEBRATION_PHRASES[randomIndex];
  }, []);

  const handlePlayAgain = () => {
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{celebrationPhrase}</Text>
      <Text style={styles.subtitle}>Well done!</Text>

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
    marginBottom: 80,
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