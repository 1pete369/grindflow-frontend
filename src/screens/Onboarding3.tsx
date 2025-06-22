// File: src/screens/Onboarding3.tsx
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Animated, { SlideInRight } from 'react-native-reanimated'

import ScreenLayout from '~/components/layouts/ScreenLayout'
import AnimatedButton from '~/components/buttons/AnimatedButton'
import AnimatedNavButton from '~/components/buttons/AnimatedNavButton'
import { OnboardingStackParamList } from './navigators/OnboardingNavigator'

type NavProp = NativeStackNavigationProp<OnboardingStackParamList, 'Onboarding3'>
const STORAGE_KEY = '@onboarding:goal'

export default function Onboarding3() {
  const nav = useNavigation<NavProp>()
  const [selected, setSelected] = useState<string | null>(null)

  const goals = [
    'Build better habits',
    'Stay laser-focused',
    'Track my progress',
    'Get community support',
    'Other',
  ]

  // Load persisted goal
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (value) setSelected(value)
    })
  }, [])

  // Save on select
  const handleSelect = (goal: string) => {
    setSelected(goal)
    AsyncStorage.setItem(STORAGE_KEY, goal).catch(console.error)
  }

  const handleNext = () => {
    nav.navigate('Onboarding4')
  }

  return (
    <ScreenLayout>
      <Animated.View
        // entering={SlideInRight.duration(600)}
        className="flex-1 justify-between px-8 pt-10"
      >
        <View>
          <Text className="mb-4 text-2xl font-bold text-gray-900">
            What&apos;s the one thing you want to crush first?
          </Text>
          <Text className="mb-4 text-lg text-gray-700">
            Pick your top productivity goal 👇
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {goals.map((g) => (
              <AnimatedButton
                key={g}
                label={g}
                type="primary"
                selected={selected === g}
                onPress={() => handleSelect(g)}
              />
            ))}
          </ScrollView>
        </View>

        <AnimatedNavButton label="Next" onPress={handleNext} />
      </Animated.View>
    </ScreenLayout>
  )
}
