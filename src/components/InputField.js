import React from 'react'
import { StyleSheet, TextInput as RNTextInput, View } from 'react-native'
import { theme } from '../utils/Theme'
import { useTheme } from '../utils/ThemeProvider'
import { Text } from './Text'

export const InputField = ({ label, ...rest }) => {
  const { appTheme } = useTheme()
  return (
    <View style={styles.container}>
      {label ? (
        <Text variant="body4Medium10" color="textForeground">
          {label}
        </Text>
      ) : null}
      <RNTextInput style={styles.input} placeholderTextColor={appTheme.colors.textForeground} {...rest} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: '100%',
    backgroundColor: theme.colors.white,
    height: 38,
    justifyContent: 'center',
    paddingLeft: 5,
    borderColor: theme.colors.primary,
    borderRadius: 5,
  },
  input: {
    ...theme.textVariants.inputMedium14,
    color: theme.colors.black,
    width: '100%',
  },
})
