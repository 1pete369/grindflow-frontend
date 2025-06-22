// File: App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from '~/screens/navigators/RootNavigator';
import './global.css';
import Toast from 'react-native-toast-message';
import { SplashScreen } from 'expo-router';

// SplashScreen.preventAutoHideAsync()

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    (async () => {
      // const launched = await AsyncStorage.getItem('alreadyLaunched');
      // setShowOnboarding(!launched);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator initialRouteName={showOnboarding ? 'Onboarding' : 'Auth'} />
        </NavigationContainer>
      </SafeAreaProvider>
      <Toast />
    </>
  );
}
