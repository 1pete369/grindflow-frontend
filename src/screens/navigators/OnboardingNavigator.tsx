// File: src/navigators/OnboardingNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding1 from '../../app/(onboarding)/Onboarding1';
import Onboarding2 from '../../app/(onboarding)/Onboarding2';
import Onboarding3 from '../../app/(onboarding)/Onboarding3';
import Onboarding4 from '../../app/(onboarding)/Onboarding4';
import { horizontalTransition } from './transitions';

export type OnboardingStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  Onboarding4: undefined;
};

const OnboardingStack = createStackNavigator<OnboardingStackParamList>();

export default function OnboardingNavigator() {
  return (
    <OnboardingStack.Navigator
      initialRouteName="Onboarding1"
      screenOptions={{
        headerShown: false,
        ...horizontalTransition, // ← and here
      }}>
      <OnboardingStack.Screen name="Onboarding1" component={Onboarding1} />
      <OnboardingStack.Screen name="Onboarding2" component={Onboarding2} />
      <OnboardingStack.Screen name="Onboarding3" component={Onboarding3} />
      <OnboardingStack.Screen name="Onboarding4" component={Onboarding4} />
    </OnboardingStack.Navigator>
  );
}
