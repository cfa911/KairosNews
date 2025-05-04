import React, {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';
import type {PropsWithChildren} from 'react';
import type {ViewStyle} from 'react-native';

type FadeInViewProps = PropsWithChildren<{
  style?: ViewStyle;
  duration?: number; // Add a duration prop
  cycle?: boolean; // Add a cycle prop
  start?: boolean; // Add a start prop
  initialOpacity?: number; // Add an initialOpacity prop
}>;

const FadeInView: React.FC<FadeInViewProps> = ({
  style,
  children,
  duration = 2000,
  cycle = false,
  start = true,
  initialOpacity = 0.2, // Default initial opacity
}) => {
  const fadeAnim = useRef(new Animated.Value(initialOpacity)).current; // Use initialOpacity as the starting value

  useEffect(() => {
    if (!start) return; // Do not start the animation if start is false

    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration, // Use the duration prop
      useNativeDriver: true,
    });

    const fadeOut = Animated.timing(fadeAnim, {
      toValue: initialOpacity, // Return to the initial opacity
      duration, // Use the duration prop
      useNativeDriver: true,
    });

    if (cycle) {
      Animated.loop(
        Animated.sequence([fadeIn, fadeOut]) // Cycle between fadeIn and fadeOut
      ).start();
    } else {
      fadeIn.start(); // Run the fade-in animation once
    }
  }, [fadeAnim, duration, cycle, start, initialOpacity]);

  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {children}
    </Animated.View>
  );
};

type WrapperProps = PropsWithChildren<{
  style?: ViewStyle;
  duration?: number; // Pass duration to the wrapper as well
  cycle?: boolean; // Pass cycle to the wrapper as well
  start?: boolean; // Pass start to the wrapper as well
  initialOpacity?: number; // Pass initialOpacity to the wrapper as well
}>;

const FadeInViewWrapper: React.FC<WrapperProps> = ({
  style,
  children,
  duration,
  cycle,
  start,
  initialOpacity,
}) => {
  return (
    <View style={style}>
      <FadeInView
        style={style}
        duration={duration}
        cycle={cycle}
        start={start}
        initialOpacity={initialOpacity}>
        {children}
      </FadeInView>
    </View>
  );
};

export default FadeInViewWrapper;