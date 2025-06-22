// app/_layout.tsx
import React, { useEffect, useState } from 'react'
import { Slot, useRouter }          from 'expo-router'
import { SafeAreaProvider }         from 'react-native-safe-area-context'
import AsyncStorage                 from '@react-native-async-storage/async-storage'
import { UserProvider, useUserContext } from '~/context/useAuthContext'
import '../../global.css'  // if you need global CSS

export default function RootLayout() {
  return (
    <UserProvider>
      <SafeAreaProvider>
        <RootGuard />
      </SafeAreaProvider>
    </UserProvider>
  )
}

function RootGuard() {
  const { isCheckingAuth, user } = useUserContext()
  const [loading, setLoading]    = useState(true)
  const [onboard, setOnboard]    = useState(true)
  const router = useRouter()

  useEffect(() => {
    AsyncStorage.getItem('onBoardingDone')
      .then(flag => setOnboard(flag === null))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!loading && !isCheckingAuth) {
      if (onboard)        router.replace('/1')
      else if (!user)     router.replace('/signup')
      else                router.replace('/main/home')
    }
  }, [loading, isCheckingAuth, onboard, user])

  return <Slot />
}
