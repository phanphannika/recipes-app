import { Image, Pressable, Text, View, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import className from 'twrnc';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();
  const scaleValue = useRef(new Animated.Value(0)).current; // Initial scale value
  const opacityValue = useRef(new Animated.Value(0)).current; // Initial opacity value

  useEffect(() => {
    // Start the animation when the component mounts
    Animated.timing(scaleValue, {
      toValue: 1, // Scale to full size
      duration: 800, // Duration of animation
      easing: Easing.ease, // Easing function
      useNativeDriver: true, // Use native driver for performance
    }).start();

    Animated.timing(opacityValue, {
      toValue: 1, // Fade in
      duration: 800, // Duration of animation
      easing: Easing.ease, // Easing function
      useNativeDriver: true, // Use native driver for performance
    }).start();
  }, [scaleValue, opacityValue]);

  return (
    <Pressable 
      onPress={() => router.push('home')} 
      style={className`bg-orange-500 flex-1 justify-center items-center`}
    >
      <Animated.View 
        style={{
          transform: [{ scale: scaleValue }],
          opacity: opacityValue,
        }}
      >
        <Image 
          source={require('../assets/logo.webp')}
          style={className`w-70 h-70`}
        />
        <Text style={className`text-6xl font-bold text-white text-center`}>Foody</Text>
        <Text style={className`text-lg font-semibold text-white text-center`}>Food is always right!</Text>
      </Animated.View>
    </Pressable>
  );
}

export default Index;
