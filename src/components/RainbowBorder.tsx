import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface RainbowBorderProps {
  width: number;
  height: number;
  borderRadius?: number;
  borderWidth?: number;
  children: React.ReactNode;
}

export default function RainbowBorder({
  width,
  height,
  borderRadius = 12,
  borderWidth = 4,
  children,
}: RainbowBorderProps) {
  return (
    <View style={{ width, height }}>
      <LinearGradient
        colors={['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.gradient,
          {
            width,
            height,
            borderRadius,
          },
        ]}
      >
        <View
          style={[
            styles.innerContent,
            {
              width: width - borderWidth * 2,
              height: height - borderWidth * 2,
              borderRadius: Math.max(0, borderRadius - borderWidth),
            },
          ]}
        >
          {children}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContent: {
    overflow: 'hidden',
  },
});