// App.tsx
import 'expo-router/entry'

// // File: App.tsx
// import React, { useEffect, useState } from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import { SafeAreaProvider } from 'react-native-safe-area-context'
// import { ActivityIndicator, View } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import Toast from 'react-native-toast-message'

// import { UserProvider } from '~/context/useAuthContext'    // ← import this
// import OnboardingNavigator from '~/screens/navigators/OnboardingNavigator'
// import AuthNavigator       from '~/screens/navigators/AuthNavigator'
// import "./global.css"

// export default function App() {
//   const [loading, setLoading]         = useState(true)
//   const [showOnboarding, setShowOnboarding] = useState(true)

//   useEffect(() => {
//     AsyncStorage.getItem('onBoardingDone')
//       .then(flag => setShowOnboarding(flag === null))
//       .finally(() => setLoading(false))
//   }, [])

//   if (loading) {
//     return (
//       <View className="flex-1 items-center justify-center">
//         <ActivityIndicator size="large" />
//       </View>
//     )
//   }

//   return (
//     <SafeAreaProvider>
//       {/* ← Wrap your entire navigation tree in the UserProvider */}
//       <UserProvider>
//         <NavigationContainer>
//           {showOnboarding ? <OnboardingNavigator /> : <AuthNavigator />}
//         </NavigationContainer>
//       </UserProvider>
//       <Toast />
//     </SafeAreaProvider>
//   )
// }

