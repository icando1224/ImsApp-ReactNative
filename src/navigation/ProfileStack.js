import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '../screens/profile/ProfileScreen'
import changePasswordScreen from '../screens/profile/ChangePasswordScreen'
import { PurchaseHistoryScreen } from '../screens/profile/PurchaseHistoryScreen'
import { WishlistScreen } from '../screens/profile/WishlistScreen'
import EditProfileScreen from '../screens/profile/EditProfileScreen'
import { EProfileScreens } from './AppRouts'
const Stack = createNativeStackNavigator()

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={EProfileScreens.My_PROFILE} component={ProfileScreen} />
      <Stack.Screen name={EProfileScreens.CHANGE_PASSWORD} component={changePasswordScreen} />
      <Stack.Screen name={EProfileScreens.PURCHASE_HISTORY_SCREEN} component={PurchaseHistoryScreen} />
      <Stack.Screen name={EProfileScreens.WISHLIST_SCREEN} component={WishlistScreen} />
      <Stack.Screen name={EProfileScreens.EDIT_PROFILE} component={EditProfileScreen} />
    </Stack.Navigator>
  )
}

export default ProfileStack
