import React, { useRef, useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavService } from '../utils/NavService'
import { SearchScreen } from '../screens/course/SearchScreen'
import { EStacks, ECourseScreens } from './AppRouts'
import AuthStack from './AuthStack'
import ProfileStack from './ProfileStack'
import { DrawerNavigation } from './DrawerNavigation'
import CourseStack from './CourseStack'
import CartStack from './CartStack'
const Stack = createNativeStackNavigator()
const Navigation = () => {
  const routeName = useRef()

  const handleScreenChange = useCallback(async () => {
    const prevRouteName = routeName.current
    const currentRouteName = NavService.getCurrentRoute()
    if (!NavService.isCurrentRoute(prevRouteName)) {
      // trackScreen(currentRouteName)
    }
    routeName.current = currentRouteName
  }, [])
  return (
    <NavigationContainer ref={NavService.getNavRef()} onStateChange={handleScreenChange}>
      <Stack.Navigator initialRouteName={EStacks.AUTh_STACK} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={EStacks.DRAWER_STACK} component={DrawerNavigation} />
        <Stack.Screen name={EStacks.AUTh_STACK} component={AuthStack} />
        <Stack.Screen name={EStacks.PROFILE_STACK} component={ProfileStack} />
        <Stack.Screen name={EStacks.COURSE_STACK} component={CourseStack} />
        <Stack.Screen name={EStacks.CART_STACK} component={CartStack} />
        <Stack.Screen name={ECourseScreens.SEARCH_SCREEN} component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default Navigation
