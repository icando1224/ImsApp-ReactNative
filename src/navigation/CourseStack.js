import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CourseDetailScreen from '../screens/course/CourseDetailScreen'
import PlayVideoScreen from '../screens/course/PlayVideoScreen'
import { ECourseScreens } from './AppRouts'
const Stack = createNativeStackNavigator()

const CourseStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ECourseScreens.COURSE_DETAIL} component={CourseDetailScreen} />
      <Stack.Screen name={ECourseScreens.PLAY_VIDEO_SCREEN} component={PlayVideoScreen} />
    </Stack.Navigator>
  )
}

export default CourseStack
