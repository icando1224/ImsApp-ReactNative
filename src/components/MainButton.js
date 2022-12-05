import React from 'react'
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native'
import { theme } from '../utils/Theme'
import { Text } from './Text'

export const MainButton = ({ loading, onPress, style, title }) => {
  return (
    <Pressable onPress={!loading ? onPress : undefined}>
      <View style={{ ...styles.buttonContainer, ...style }}>
        {!loading ? (
          <Text variant="buttonSemiBold16" color="white" style={styles.label}>
            {title}
          </Text>
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
  },
  label: {
    textAlign: 'center',
  },
})
