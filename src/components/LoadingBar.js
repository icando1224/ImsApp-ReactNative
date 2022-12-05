import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { theme } from '../utils/Theme'

export default function LoadingBar() {
  return (
    <View style={styles.progress}>
      <ActivityIndicator size="large" color={theme.colors.danger} />
    </View>
  )
}

const styles = StyleSheet.create({
  progress: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
})
