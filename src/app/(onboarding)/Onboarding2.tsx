// File: src/screens/Onboarding2.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Animated, { SlideInRight, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { OnboardingStackParamList } from '../../screens/navigators/OnboardingNavigator';
import ScreenLayout from '~/components/layouts/ScreenLayout';
import AnimatedButton from '~/components/buttons/AnimatedButton';
import AnimatedNavButton from '~/components/buttons/AnimatedNavButton';

type Onboarding2NavProp = NativeStackNavigationProp<OnboardingStackParamList, 'Onboarding2'>;

const STORAGE_KEY = '@onboarding:blocker';

export default function Onboarding2() {
  const nav = useNavigation<Onboarding2NavProp>();
  const [selected, setSelected] = useState<string | null>(null);

  const blockers = [
    'Procrastination',
    'No Accountability',
    'Too Many Distractions',
    'Lack of Clarity',
    'Inconsistent Habits',
    'Others',
  ];

  // Load saved choice on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        if (value) setSelected(value);
      })
      .catch((err) => console.error('Failed to load blocker:', err));
  }, []);

  // Handler for picking one
  const handleSelect = (item: string) => {
    setSelected(item);
    AsyncStorage.setItem(STORAGE_KEY, item).catch((err) =>
      console.error('Failed to save blocker:', err)
    );
  };

  const shift = useSharedValue(0);

  // Animated style for shifting the form
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: shift.value }],
  }));

  const handleNext = () => {
    nav.navigate('Onboarding3');
  };

  return (
    <ScreenLayout>
      <Animated.View
        // entering={SlideInRight.duration(600)}
        style={animatedStyle}
        className="flex-1 justify-between px-8 pt-10">
        <View>
          <Text className="mb-4 text-2xl font-bold text-gray-900">
            What&apos;s stopping you from being your most productive self?
          </Text>
          <Text className="mb-4 text-center text-lg text-gray-700">
            Select one blocker you face most often 👇
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {blockers.map((item) => (
              <AnimatedButton
                key={item}
                label={item}
                type="primary"
                selected={selected === item}
                onPress={() => handleSelect(item)}
              />
            ))}
          </ScrollView>
        </View>
        <AnimatedNavButton label="Next" onPress={handleNext} />
      </Animated.View>
    </ScreenLayout>
  );
}
