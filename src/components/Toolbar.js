import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '../utils/Theme'
import { Text } from './Text'

export const Toolbar = ({ navigation, title }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.title} color="white" variant="buttonSemiBold16">
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.appPadding,
  },
  title: { marginLeft: 20 },
})
