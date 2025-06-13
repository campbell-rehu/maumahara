import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface KoruPatternProps {
  color?: string;
  opacity?: number;
}

export default function KoruPattern({ 
  color = '#8B4513', 
  opacity = 0.05 
}: KoruPatternProps) {
  return (
    <View style={[styles.container, { opacity }]}>
      {/* Top left koru */}
      <Svg width="120" height="120" style={styles.topLeft}>
        <Path
          d="M 60 20 Q 20 20 20 60 Q 20 100 60 100 Q 90 100 90 70 Q 90 50 70 50 Q 60 50 60 60"
          fill="none"
          stroke={color}
          strokeWidth="3"
        />
      </Svg>
      
      {/* Bottom right koru */}
      <Svg width="150" height="150" style={styles.bottomRight}>
        <Path
          d="M 75 30 Q 30 30 30 75 Q 30 120 75 120 Q 110 120 110 85 Q 110 60 85 60 Q 75 60 75 75"
          fill="none"
          stroke={color}
          strokeWidth="3"
        />
      </Svg>
      
      {/* Top right small koru */}
      <Svg width="80" height="80" style={styles.topRight}>
        <Path
          d="M 40 15 Q 15 15 15 40 Q 15 65 40 65 Q 60 65 60 45 Q 60 30 45 30 Q 40 30 40 40"
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  topLeft: {
    position: 'absolute',
    top: -20,
    left: -20,
  },
  bottomRight: {
    position: 'absolute',
    bottom: -30,
    right: -30,
  },
  topRight: {
    position: 'absolute',
    top: 50,
    right: -10,
  },
});