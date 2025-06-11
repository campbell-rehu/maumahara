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
import { COLORS } from '../constants/colors';

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
}: MemoryCardProps) {
  const flipAnimation = useSharedValue(0);
  const scaleAnimation = useSharedValue(1);

  // Handle flip animation
  useEffect(() => {
    flipAnimation.value = withTiming(isFlipped ? 1 : 0, {
      duration: 500,
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
    const opacity = interpolate(flipAnimation.value, [0.5, 1], [0, 1]);
    
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity,
      backfaceVisibility: 'hidden',
    };
  });

  // Animated styles for the back side
  const backSideStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipAnimation.value, [0, 1], [0, 180]);
    const opacity = interpolate(flipAnimation.value, [0, 0.5], [1, 0]);
    
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity,
      backfaceVisibility: 'hidden',
    };
  });

  const cardStyle = [
    styles.card,
    {
      width: cardWidth,
      height: cardHeight,
    },
    isMatched && styles.matchedCard,
  ];

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
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
      <Animated.View style={[cardContainerStyle, { width: cardWidth, height: cardHeight }]}>
        {/* Card Back */}
        <Animated.View style={[cardStyle, styles.cardBack, backSideStyle]} />

        {/* Card Front */}
        <Animated.View style={[cardStyle, styles.cardFront, frontSideStyle]}>
          <View style={styles.cardFrontContent}>
            {/* Animal Image */}
            <View style={styles.imageContainer}>
              <Image
                source={getImageSource(animal.image)}
                style={[
                  styles.animalImage,
                  {
                    width: cardWidth * 0.8,
                    height: cardHeight * 0.65,
                  },
                ]}
                resizeMode="contain"
              />
            </View>

            {/* Text Content */}
            <View style={styles.textContainer}>
              {/* Te Reo Māori name (larger, top) */}
              <Text
                style={[
                  styles.maoriText,
                  { fontSize: Math.min(cardWidth * 0.14, 22) },
                ]}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {animal.maori}
              </Text>

              {/* English name (smaller, bottom) */}
              <Text
                style={[
                  styles.englishText,
                  { fontSize: Math.min(cardWidth * 0.1, 16) },
                ]}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {animal.english}
              </Text>
            </View>
          </View>

          {/* Matched State Overlay */}
          {isMatched && (
            <View style={styles.matchedOverlay}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </Pressable>
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
    position: 'absolute',
  },
  cardBack: {
    backgroundColor: COLORS.cardBack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFront: {
    backgroundColor: COLORS.cardFront,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
  },
  cardFrontContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  animalImage: {
    borderRadius: 8,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    minHeight: 35,
  },
  maoriText: {
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    lineHeight: 20,
  },
  englishText: {
    fontWeight: '500',
    color: COLORS.text,
    textAlign: 'center',
    opacity: 0.8,
    marginTop: 2,
    lineHeight: 14,
  },
  matchedCard: {
    borderWidth: 3,
    borderColor: COLORS.success,
  },
  matchedOverlay: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: COLORS.success,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: 'bold',
  },
});