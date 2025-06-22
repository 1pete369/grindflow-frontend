// File: src/navigators/RootNavigator.tsx
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import OnboardingNavigator from './OnboardingNavigator'
import AuthNavigator       from './AuthNavigator'
import { horizontalTransition } from './transitions'

export type RootStackParamList = {
  Onboarding: undefined
  Auth:       undefined
}

const RootStack = createStackNavigator<RootStackParamList>()

export default function RootNavigator({ initialRouteName }: { initialRouteName: keyof RootStackParamList }) {
  return (
    <RootStack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        ...horizontalTransition,      // ← apply here
      }}
    >
      <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
      <RootStack.Screen name="Auth"       component={AuthNavigator} />
    </RootStack.Navigator>
  )
}
