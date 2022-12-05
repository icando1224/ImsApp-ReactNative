import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { DrawerToolbar } from '../../components/DrawerToolbar'
const Tab = createMaterialTopTabNavigator()
export const BookmarksScreen = ({ navigation }) => {
  const renderQuestions = () => {
    return (
      <View style={styles.tabContainer}>
        <Text>No data found</Text>
      </View>
    )
  }
  const renderPdf = () => {
    return (
      <View style={styles.tabContainer}>
        <Text>No data found</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <DrawerToolbar navigation={navigation} title="MY Bookmarks" />
      <Tab.Navigator>
        <Tab.Screen name="questions" component={renderQuestions} options={{ tabBarLabel: 'Questions' }} />
        <Tab.Screen name="pdf" component={renderPdf} options={{ tabBarLabel: 'PDFs' }} />
      </Tab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  tabContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
})
