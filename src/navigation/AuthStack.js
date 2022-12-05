import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoinScreen from '../screens/auth/LoginScreen'
import { welcomeScreen } from '../screens/auth/WelcomeScreen'
import { SignUpScreen } from '../screens/auth/SignUpScreen'
import { OTPScreen } from '../screens/auth/OTPScreen'
import { EAuthScreens } from './AppRouts'
const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={EAuthScreens.LOGIN_SCREEN} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={EAuthScreens.WELCOME_SCREEN} component={welcomeScreen} />
      <Stack.Screen name={EAuthScreens.LOGIN_SCREEN} component={LoinScreen} />
      <Stack.Screen name={EAuthScreens.SIGN_UP_SCREEN} component={SignUpScreen} />
      <Stack.Screen name={EAuthScreens.OTP_SCREEN} component={OTPScreen} />
    </Stack.Navigator>
  )
}

export default AuthStack
