import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ImageSourcePropType,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';
import AnimationErrorBoundary from './AnimationErrorBoundary';

interface MemoryCardProps {
  cardId: string;
  animal: {
    id: string;
    english: string;
    maori: string;
    image: string;
  };
  isFlipped: boolean;
  isMatched: boolean;
  onPress: () => void;
  cardWidth: number;
  cardHeight: number;
  disabled?: boolean;
  selectionOrder?: 'first' | 'second' | null;
}

// Function to get the image source from assets
const getImageSource = (imageName: string): ImageSourcePropType => {
  const imageMap: Record<string, ImageSourcePropType> = {
    butterfly: require('../../assets/images/animals/butterfly.png'),
    cat: require('../../assets/images/animals/cat.png'),
    cow: require('../../assets/images/animals/cow.png'),
    dog: require('../../assets/images/animals/dog.png'),
    horse: require('../../assets/images/animals/horse.png'),
    kiwi: require('../../assets/images/animals/kiwi.png'),
    pig: require('../../assets/images/animals/pig.png'),
    pukeko: require('../../assets/images/animals/pukeko.png'),
    sheep: require('../../assets/images/animals/sheep.png'),
    snail: require('../../assets/images/animals/snail.png'),
    tui: require('../../assets/images/animals/tui.png'),
  };
  
  return imageMap[imageName] || imageMap.dog; // fallback to dog image
};

export default function MemoryCard({
  cardId,
  animal,
  isFlipped,
  isMatched,
  onPress,
  cardWidth,
  cardHeight,
  disabled = false,
  selectionOrder = null,
}: MemoryCardProps) {
  const flipAnimation = useSharedValue(0);
  const scaleAnimation = useSharedValue(1);

  // Handle flip animation
  useEffect(() => {
    flipAnimation.value = withTiming(isFlipped ? 1 : 0, {
      duration: 600,
    });
  }, [isFlipped, flipAnimation]);

  // Handle press with scale animation
  const handlePress = () => {
    if (disabled) return;
    
    scaleAnimation.value = withTiming(0.95, { duration: 100 }, () => {
      scaleAnimation.value = withTiming(1, { duration: 100 });
    });
    
    // Run the onPress callback on the JS thread
    runOnJS(onPress)();
  };

  // Animated styles for the card container
  const cardContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleAnimation.value,
        },
      ],
    };
  });

  // Animated styles for the front side
  const frontSideStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipAnimation.value, [0, 1], [180, 0]);
    
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
      position: 'absolute',
      width: '100%',
      height: '100%',
    };
  });

  // Animated styles for the back side
  const backSideStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipAnimation.value, [0, 1], [0, 180]);
    
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
      position: 'absolute',
      width: '100%',
      height: '100%',
    };
  });

  const getBorderStyle = () => {
    if (isMatched) {
      return {}; // No border needed, gradient will be applied
    }
    if (isFlipped && selectionOrder === 'first') {
      return { borderColor: COLORS.firstSelection, borderWidth: 4 };
    }
    if (isFlipped && selectionOrder === 'second') {
      return { borderColor: COLORS.secondSelection, borderWidth: 4 };
    }
    return {};
  };

  const cardStyle = [
    styles.card,
    {
      width: cardWidth - 8,
      height: cardHeight - 8,
    },
    getBorderStyle(),
  ];

  return (
    <AnimationErrorBoundary>
      <Pressable
        onPress={handlePress}
        disabled={disabled || isMatched}
        testID={`card-${cardId}`}
        accessibilityRole="button"
        accessibilityLabel={`Memory card for ${animal.english}, ${animal.maori}`}
        accessibilityHint={
          isFlipped
            ? isMatched
              ? 'Card is matched'
              : 'Card is face up, showing the animal'
            : 'Card is face down, tap to flip'
        }
        accessibilityState={{
          selected: isFlipped,
          disabled: disabled,
        }}
      >
        {/* Always render gradient border but make it transparent when not matched */}
        <LinearGradient
          colors={isMatched ? COLORS.rainbow : ['transparent', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.gradientBorder,
            {
              width: cardWidth,
              height: cardHeight,
            },
          ]}
        >
          <Animated.View style={[
            cardContainerStyle, 
            styles.gradientInner,
            {
              width: cardWidth - 8,
              height: cardHeight - 8,
            }
          ]}>
            {/* Card Back */}
            <Animated.View style={[cardStyle, styles.cardBack, backSideStyle]}>
              <Text style={styles.questionMark}>?</Text>
            </Animated.View>

            {/* Card Front */}
            <Animated.View style={[cardStyle, styles.cardFront, frontSideStyle]}>
              <View style={styles.cardFrontContent}>
                {/* Animal Image - now takes up most of the card */}
                <View style={styles.imageContainer}>
                  <Image
                    source={getImageSource(animal.image)}
                    style={[
                      styles.animalImage,
                      {
                        width: (cardWidth - 8) * 0.9,
                        height: (cardHeight - 8) * 0.9,
                      },
                    ]}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </Animated.View>
          </Animated.View>
        </LinearGradient>
      </Pressable>
    </AnimationErrorBoundary>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  cardBack: {
    backgroundColor: COLORS.cardBack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFront: {
    backgroundColor: COLORS.cardFront,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  cardFrontContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animalImage: {
    borderRadius: 8,
  },
  gradientBorder: {
    borderRadius: 12,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientInner: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  questionMark: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.textLight,
    textAlign: 'center',
  },
});