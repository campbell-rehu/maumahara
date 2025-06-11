import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { COLORS } from '../constants/colors';

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
    <View style={styles.container}>
      <View style={styles.patternOverlay} />
      
      <View style={styles.content}>
        <Text style={styles.greeting}>Kia ora!</Text>
        <Text style={styles.subtitle}>Haere mai ki Maumahara</Text>
        <Text style={styles.description}>
          Learn animals in Te Reo Māori
        </Text>

        <TouchableOpacity
          style={styles.playButton}
          onPress={() => setShowDifficulty(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.playButtonText}>PLAY</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  patternOverlay: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: COLORS.primary,
    opacity: 0.1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    color: COLORS.text,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 50,
  },
  playButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 60,
    paddingVertical: 20,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  playButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textLight,
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