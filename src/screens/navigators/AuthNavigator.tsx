// File: src/navigators/AuthNavigator.tsx
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen  from '../LoginScreen'
import SignupScreen from '../SignupScreen'
import { horizontalTransition } from './transitions'

export type AuthStackParamList = {
  Login:  undefined
  Signup: undefined
}

const AuthStack = createStackNavigator<AuthStackParamList>()

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerShown: false,
        ...horizontalTransition,      // ← and here
      }}
    >
      <AuthStack.Screen name="Signup" component={SignupScreen} />
      <AuthStack.Screen name="Login"  component={LoginScreen}  />
    </AuthStack.Navigator>
  )
}
