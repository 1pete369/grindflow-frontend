// File: src/screens/Onboarding1.tsx
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';
import Animated, { SlideInRight, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import ScreenLayout from '~/components/layouts/ScreenLayout';
import { OnboardingStackParamList } from '../../screens/navigators/OnboardingNavigator';
import AnimatedNavButton from '~/components/buttons/AnimatedNavButton';
import CircularImageSpinner from '~/components/ui/AnimateImages';
import { LinearGradient } from 'expo-linear-gradient';

type NavProp = NativeStackNavigationProp<OnboardingStackParamList, 'Onboarding1'>;

export default function Onboarding1() {
  const nav = useNavigation<NavProp>();
  const [subTypingDone, setSubTypingDone] = useState(false);

  const shift = useSharedValue(0);

  // Animated style for shifting the form
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: shift.value }],
  }));

  const handleNext = () => {
    nav.navigate('Onboarding2');
  };

  return (
    <ScreenLayout className="">
      <Animated.View
        // entering={SlideInRight.duration(600)}
        style={animatedStyle}
        className="flex-1 justify-between px-8 pt-10">
        <View className="flex items-center gap-4">
          <Text className="text-center text-2xl font-bold">Welcome To GrindFlow</Text>

          <Text className="text-center text-lg text-gray-500">
            Your journey to unstoppable focus, discipline, and freedom starts now.
          </Text>

          <CircularImageSpinner />
        </View>
        <AnimatedNavButton label="Get Started" onPress={handleNext} />
      </Animated.View>
    </ScreenLayout>
  );
}
