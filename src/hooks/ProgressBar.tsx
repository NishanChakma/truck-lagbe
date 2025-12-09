import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface Props {
  progress: number; // 0 to 100
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
  duration?: number;
  borderRadius?: number;
}

const ProgressBar: React.FC<Props> = ({
  progress,
  height = 4,
  backgroundColor = '#EBE1E1',
  fillColor = '#B00000',
  duration = 600,
  borderRadius = 20,
}) => {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(progress, {
      duration,
      easing: Easing.out(Easing.cubic),
    });
  }, [progress]);

  const animatedStyles = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <View style={[styles.container, { height, backgroundColor, borderRadius }]}>
      <Animated.View
        style={[
          styles.fill,
          animatedStyles,
          { backgroundColor: fillColor, borderRadius },
        ]}
      />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    width: 68,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
