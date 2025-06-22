// File: src/screens/LoginScreen.tsx
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

type LoginNavProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export default function LoginScreen() {
  const nav = useNavigation<LoginNavProp>();
  const shift = useSharedValue(0);

  // Animated style for shifting the form
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: shift.value }],
  }));

  useEffect(() => {
    // When keyboard opens, slide up
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      shift.value = withTiming(-100, { duration: 300 });
    });
    // When keyboard closes, slide back down
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
          <Text className="mb-6 text-3xl font-bold text-brand-500">Login</Text>

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
            activeOpacity={0.8} // ← less aggressive fade (1.0 = no fade, 0.85 = mild)
            className="mb-4 rounded bg-brand-500 py-3"
            onPress={() => {
              /* TODO: call your login API, then navigate to main app */
            }}>
            <Text className="text-center text-lg font-semibold text-white">Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8} // ← less aggressive fade (1.0 = no fade, 0.85 = mild)
            onPress={() => nav.goBack()}>
            <Text className="text-center text-gray-600">
              Don&apos;t have an account?{' '}
              <Text className="font-semibold text-brand-500">Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}
