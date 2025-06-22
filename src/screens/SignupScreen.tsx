// File: src/screens/SignupScreen.tsx
import React, { useEffect } from 'react';
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from './navigators/AuthNavigator';
import ScreenLayout from '~/components/layouts/ScreenLayout';

type SignupNavProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

export default function SignupScreen() {
  const nav = useNavigation<SignupNavProp>();
  const shift = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: shift.value }],
  }));

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      shift.value = withTiming(-100, { duration: 300 });
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      shift.value = withTiming(0, { duration: 300 });
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [shift]);

  return (
    <ScreenLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center bg-white px-6">
        <Animated.View style={animatedStyle}>
          <Text className="mb-6 text-3xl font-bold text-brand-500">Sign Up</Text>

          <TextInput
            placeholder="Name"
            autoCapitalize="words"
            className="mb-4 rounded border border-gray-300 px-4 py-4"
          />

          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            className="mb-4 rounded border border-gray-300 px-4 py-4"
          />

          <TextInput
            placeholder="Password"
            secureTextEntry
            className="mb-6 rounded border border-gray-300 px-4 py-4"
          />

          <TouchableOpacity
            className="mb-4 rounded bg-brand-500 py-3"
            onPress={() => {
              /* TODO: call your signup API, then navigate to main app */
            }}>
            <Text className="text-center text-lg font-semibold text-white">Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => nav.navigate('Login')}>
            <Text className="text-center text-gray-600">
              Already have an account? <Text className="font-semibold text-brand-500">Log In</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}
