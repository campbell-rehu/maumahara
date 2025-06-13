import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Animated,
} from 'react-native';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');

export interface DifficultyLevel {
  name: 'Easy' | 'Medium' | 'Hard';
  maoriName: string;
  gridSize: { rows: number; cols: number };
  pairs: number;
  animals: string[];
  color: string;
  description: string;
}

interface DifficultyModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

const DIFFICULTY_LEVELS: DifficultyLevel[] = [
  {
    name: 'Easy',
    maoriName: 'Easy',
    gridSize: { rows: 2, cols: 3 },
    pairs: 3,
    animals: ['Kurī', 'Ngeru', 'Hipi'],
    color: COLORS.easy,
    description: '3 pairs • Perfect for beginners',
  },
  {
    name: 'Medium',
    maoriName: 'Medium',
    gridSize: { rows: 4, cols: 4 },
    pairs: 8,
    animals: ['Kurī', 'Ngeru', 'Hipi', 'Kau', 'Poaka', 'Hōiho', 'Kākā', 'Kekeno'],
    color: COLORS.medium,
    description: '8 pairs • Good challenge',
  },
  {
    name: 'Hard',
    maoriName: 'Hard',
    gridSize: { rows: 4, cols: 5 },
    pairs: 10,
    animals: ['Kurī', 'Ngeru', 'Hipi', 'Kau', 'Poaka', 'Hōiho', 'Kākā', 'Kekeno', 'Tūī', 'Kererū'],
    color: COLORS.hard,
    description: '10 pairs • Expert level',
  },
];

const GridIcon: React.FC<{ rows: number; cols: number; color: string }> = ({ rows, cols, color }) => {
  const gridItems = [];
  for (let i = 0; i < rows * cols; i++) {
    gridItems.push(
      <View
        key={i}
        style={[
          styles.gridItem,
          {
            backgroundColor: color,
            width: (120 - (cols - 1) * 4) / cols,
            height: (80 - (rows - 1) * 4) / rows,
          },
        ]}
      />
    );
  }

  return (
    <View style={[styles.gridContainer, { width: 120, height: 80 }]}>
      {gridItems}
    </View>
  );
};

export default function DifficultyModal({
  visible,
  onClose,
  onSelectDifficulty,
}: DifficultyModalProps) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, scaleAnim]);

  const handleDifficultySelect = (difficulty: 'easy' | 'medium' | 'hard') => {
    onSelectDifficulty(difficulty);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      accessibilityViewIsModal
    >
      <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.modalTitle}>Kōwhiri te Uaua</Text>
          <Text style={styles.modalSubtitle}>Choose Difficulty</Text>

          {DIFFICULTY_LEVELS.map((level, index) => (
            <TouchableOpacity
              key={level.name}
              style={[styles.difficultyButton, { backgroundColor: level.color }]}
              onPress={() => handleDifficultySelect(level.name.toLowerCase() as 'easy' | 'medium' | 'hard')}
              activeOpacity={0.8}
              accessibilityLabel={`${level.name} difficulty: ${level.description}`}
              accessibilityHint={`Tap to start ${level.name.toLowerCase()} game with ${level.pairs} pairs`}
            >
              <View style={styles.buttonContent}>
                <View style={styles.buttonLeft}>
                  <GridIcon
                    rows={level.gridSize.rows}
                    cols={level.gridSize.cols}
                    color={COLORS.textLight}
                  />
                </View>
                <View style={styles.buttonCenter}>
                  <Text style={styles.difficultyText}>{level.maoriName}</Text>
                  <Text style={styles.difficultyEnglish}>{level.name}</Text>
                  <Text style={styles.difficultyDescription}>{level.description}</Text>
                </View>
                <View style={styles.buttonRight}>
                  <Text style={styles.pairCount}>{level.pairs}</Text>
                  <Text style={styles.pairLabel}>pairs</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}
            activeOpacity={0.6}
            accessibilityLabel="Cancel"
            accessibilityHint="Close difficulty selection and return to welcome screen"
          >
            <Text style={styles.cancelText}>Whakakore | Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderRadius: 24,
    padding: 32,
    width: width * 0.9,
    maxWidth: 420,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 18,
    color: COLORS.text,
    opacity: 0.8,
    marginBottom: 32,
    textAlign: 'center',
  },
  difficultyButton: {
    width: '100%',
    borderRadius: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  buttonLeft: {
    marginRight: 16,
  },
  buttonCenter: {
    flex: 1,
    alignItems: 'center',
  },
  buttonRight: {
    alignItems: 'center',
    marginLeft: 16,
  },
  difficultyText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  difficultyEnglish: {
    fontSize: 18,
    color: COLORS.text,
    opacity: 0.9,
    marginBottom: 4,
  },
  difficultyDescription: {
    fontSize: 14,
    color: COLORS.text,
    opacity: 0.7,
    textAlign: 'center',
  },
  pairCount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  pairLabel: {
    fontSize: 12,
    color: COLORS.text,
    opacity: 0.7,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    padding: 4,
  },
  gridItem: {
    borderRadius: 2,
    opacity: 0.8,
    margin: 1,
  },
  cancelButton: {
    marginTop: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  cancelText: {
    fontSize: 18,
    color: COLORS.text,
    opacity: 0.6,
    textAlign: 'center',
  },
});