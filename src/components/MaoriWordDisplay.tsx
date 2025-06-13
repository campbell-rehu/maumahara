import React from "react";
import { View, Text, StyleSheet, ColorValue } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/colors";

interface MaoriWordDisplayProps {
  leftWord?: string;
  rightWord?: string;
  leftBorderColor?: string;
  rightBorderColor?: string;
  isMatched: boolean;
}

export default function MaoriWordDisplay({
  leftWord,
  rightWord,
  leftBorderColor = "transparent",
  rightBorderColor = "transparent",
  isMatched = false,
}: MaoriWordDisplayProps) {
  // If matched, show a single "Ōrite!" message with rainbow border
  if (isMatched) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={COLORS.rainbow as readonly [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.matchedGradientBorder}
        >
          <View style={styles.matchedMessageBox}>
            <Text style={styles.matchedText}>Ōrite!</Text>
          </View>
        </LinearGradient>
      </View>
    );
  }

  const renderWordBox = (
    word: string | undefined,
    borderColor: string,
  ) => {
    return (
      <View style={[styles.wordBox, { borderColor: borderColor }]}>
        {word && <Text style={styles.wordText}>{word}</Text>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Left Word Display */}
      {renderWordBox(leftWord, leftBorderColor)}

      {/* Right Word Display */}
      {renderWordBox(rightWord, rightBorderColor)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 20,
    marginTop: 20,
  },
  wordBox: {
    flex: 1,
    height: 60,
    borderRadius: 12,
    borderWidth: 3,
    backgroundColor: COLORS.cardFront,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gradientBorder: {
    flex: 1,
    height: 60,
    borderRadius: 12,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  gradientInner: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.cardFront,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  wordText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
  },
  matchedGradientBorder: {
    flex: 1,
    height: 60,
    borderRadius: 12,
    padding: 4,
    marginHorizontal: 10,
  },
  matchedMessageBox: {
    flex: 1,
    width: "100%",
    borderRadius: 8,
    backgroundColor: COLORS.cardFront,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  matchedText: {
    fontSize: 36,
    fontWeight: "bold",
    letterSpacing: 1,
    color: COLORS.success,
    textAlign: "center",
  },
});

