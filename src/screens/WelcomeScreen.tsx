import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { COLORS } from '../constants/colors';
import KoruPattern from '../components/KoruPattern';

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
    navigation.navigate('Game', { difficulty });
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
        <Text style={styles.greeting}>Kia ora! Haere mai ki Maumahara</Text>
        <Text style={styles.englishSubtitle}>Welcome to Memory</Text>
        
        <Text style={styles.title}>Maumahara</Text>
        
        <Text style={styles.description}>
          Match animals with their Te Reo Māori names
        </Text>

        <TouchableOpacity
          style={styles.playButton}
          onPress={() => setShowDifficulty(true)}
          activeOpacity={0.8}
          accessibilityLabel="Start game button"
          accessibilityHint="Tap to select difficulty and start playing"
        >
          <Text style={styles.playButtonText}>Tīmata | Start</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showDifficulty}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDifficulty(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Difficulty</Text>
            
            <TouchableOpacity
              style={[styles.difficultyButton, styles.easyButton]}
              onPress={() => handleDifficultySelect('easy')}
            >
              <Text style={styles.difficultyText}>Easy</Text>
              <Text style={styles.difficultySubtext}>2 × 3 cards</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.difficultyButton, styles.mediumButton]}
              onPress={() => handleDifficultySelect('medium')}
            >
              <Text style={styles.difficultyText}>Medium</Text>
              <Text style={styles.difficultySubtext}>4 × 4 cards</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.difficultyButton, styles.hardButton]}
              onPress={() => handleDifficultySelect('hard')}
            >
              <Text style={styles.difficultyText}>Hard</Text>
              <Text style={styles.difficultySubtext}>4 × 5 cards</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowDifficulty(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  greeting: {
    fontSize: 28,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  englishSubtitle: {
    fontSize: 20,
    color: COLORS.text,
    marginBottom: 40,
    opacity: 0.8,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderRadius: 20,
    padding: 30,
    width: width * 0.85,
    maxWidth: 400,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 30,
  },
  difficultyButton: {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  easyButton: {
    backgroundColor: COLORS.easy,
  },
  mediumButton: {
    backgroundColor: COLORS.medium,
  },
  hardButton: {
    backgroundColor: COLORS.hard,
  },
  difficultyText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  difficultySubtext: {
    fontSize: 16,
    color: COLORS.text,
    opacity: 0.8,
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 15,
  },
  cancelText: {
    fontSize: 18,
    color: COLORS.text,
    opacity: 0.6,
  },
});