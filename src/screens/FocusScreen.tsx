import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useStandStore } from "../store/useStandStore";
import ProgressRing from "../components/ProgressRing";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FocusScreen() {
  const { todayCount, dailyGoal, streak, logStand } = useStandStore();

  const progress = Math.min(todayCount / dailyGoal, 1);

  const scale = useSharedValue(1);
  const glow = useSharedValue(0);

  // 🎯 Count animation
  const animatedText = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // ✨ Glow animation
  const glowStyle = useAnimatedStyle(() => ({
    shadowColor: "#00E5FF",
    shadowOpacity: glow.value,
    shadowRadius: 20 * glow.value,
  }));

  // 🚀 Handle press
  const handlePress = () => {
    logStand();

    // number pop
    scale.value = 1.2;
    scale.value = withSpring(1, { damping: 5 });

    // glow pulse
    glow.value = 0.8;
    glow.value = withTiming(0, { duration: 600 });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0F1E' }}>
    <View style={styles.container}>
  <View style={styles.topSection}>
    <Text style={styles.streak}>🔥 {streak} day streak</Text>
  </View>

  <View style={styles.middleSection}>
    {/* Ring */}
    <View style={styles.ringContainer}>
      <Animated.View style={[styles.glowWrapper, glowStyle]}>
        <ProgressRing progress={progress} />
      </Animated.View>

      <View style={styles.centerText}>
        <Animated.Text style={[styles.progress, animatedText]}>
          {todayCount}/{dailyGoal}
        </Animated.Text>
        <Text style={styles.label}>stands today</Text>
      </View>
    </View>

    <Text style={styles.motivation}>
       {todayCount >= dailyGoal
  ? "Goal completed 🎉"
  : `${dailyGoal - todayCount} more to reach your goal`}
    </Text>
  </View>

  <View style={styles.bottomSection}>
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.button,
        pressed && { transform: [{ scale: 0.96 }] },
      ]}
    >
      <Text style={styles.buttonText}>I am standing</Text>
    </Pressable>
  </View>
</View>
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 130,
    justifyContent: 'space-between',
  },

  topSection: {
    alignItems: 'center',
  },

  middleSection: {
    alignItems: 'center',
  },

  bottomSection: {
    width: '100%',
  },

  streak: {
    color: '#7DD3FC',
    fontSize: 14,
    opacity: 0.9,
  },

  ringContainer: {
    width: 240,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },

  glowWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 12, // Android glow
  },

  centerText: {
    position: 'absolute',
    alignItems: 'center',
  },

  progress: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '700',
    letterSpacing: -1,
  },

  label: {
    color: '#7DD3FC',
    fontSize: 13,
    marginTop: 4,
  },

  motivation: {
    color: '#00E5FF',
    fontSize: 14,
    marginTop: 10,
    opacity: 0.9,
  },

  button: {
    backgroundColor: '#00E5FF',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',

    // subtle glow
    shadowColor: '#00E5FF',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },

  buttonText: {
    color: '#001f24',
    fontWeight: '600',
    fontSize: 16,
  },
})