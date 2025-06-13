import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { COLORS } from '../constants/colors';
import KoruPattern from '../components/KoruPattern';
import DifficultyModal from '../components/DifficultyModal';

type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const [showDifficulty, setShowDifficulty] = useState(false);

  const handleDifficultySelect = (difficulty: 'easy' | 'medium' | 'hard') => {
    setShowDifficulty(false);
    // Delay navigation to allow modal fade-out animation to complete (250ms + small buffer)
    setTimeout(() => {
      navigation.navigate('Game', { difficulty });
    }, 300);
  };

  return (
    <LinearGradient
      colors={['#E6F3FF', '#F0E6FF']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KoruPattern color={COLORS.primary} opacity={0.08} />
      
      <View style={styles.content}>
        <Text style={styles.title}>Maumahara</Text>
        
        <Text style={styles.description}>
          Te Reo Māori Memory Match Game
        </Text>

        <TouchableOpacity
          style={styles.playButton}
          onPress={() => setShowDifficulty(true)}
          activeOpacity={0.8}
          accessibilityLabel="Start game button"
          accessibilityHint="Tap to select difficulty and start playing"
        >
          <Text style={styles.playButtonText}>Start</Text>
        </TouchableOpacity>
      </View>

      <DifficultyModal
        visible={showDifficulty}
        onClose={() => setShowDifficulty(false)}
        onSelectDifficulty={handleDifficultySelect}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  patternOverlay: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 16,
    letterSpacing: 1,
  },
  description: {
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 60,
    textAlign: 'center',
    opacity: 0.9,
  },
  playButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 80,
    paddingVertical: 24,
    borderRadius: 40,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  playButtonText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.textLight,
    letterSpacing: 0.5,
  },
});