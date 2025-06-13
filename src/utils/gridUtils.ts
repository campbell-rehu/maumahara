import { Dimensions } from 'react-native';

export interface GridConfig {
  rows: number;
  cols: number;
  totalCards: number;
  pairs: number;
}

export interface CardDimensions {
  width: number;
  height: number;
}

export const GRID_CONFIGS: Record<string, GridConfig> = {
  easy: { rows: 2, cols: 3, totalCards: 6, pairs: 3 },
  medium: { rows: 4, cols: 4, totalCards: 16, pairs: 8 },
  hard: { rows: 5, cols: 4, totalCards: 20, pairs: 10 },
};

/**
 * Calculate card dimensions based on screen size and grid configuration
 * @param gridConfig - The grid configuration for the current difficulty
 * @returns Card dimensions that fit optimally on screen
 */
export const calculateCardDimensions = (gridConfig: GridConfig): CardDimensions => {
  const { width, height } = Dimensions.get('window');
  
  const availableWidth = width - 40; // 20px padding on each side
  const availableHeight = height - 220; // Space for header + word display + margins

  const cardSpacing = 10; // Space between cards
  const cardWidth =
    (availableWidth - (gridConfig.cols - 1) * cardSpacing) / gridConfig.cols;
  const cardHeight =
    (availableHeight - (gridConfig.rows - 1) * cardSpacing) / gridConfig.rows;

  // Ensure cards fit within screen bounds
  const minSize = 75;
  const maxSize = 110;
  
  // Calculate final dimensions ensuring they fit
  const finalWidth = Math.min(cardWidth, maxSize);
  const finalHeight = Math.min(cardHeight, maxSize);

  // Keep cards reasonably square by using the smaller dimension
  const size = Math.max(Math.min(finalWidth, finalHeight), minSize);
  
  return { width: size, height: size };
};