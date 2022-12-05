import React from 'react'
import { Text as RNText } from 'react-native'
import { useTheme } from '../utils/ThemeProvider'

export const Text = ({ color, style, variant, ...rest }) => {
  const { appTheme } = useTheme()
  return (
    <RNText
      allowFontScaling={false}
      style={{
        color: appTheme.colors[color],
        ...appTheme.textVariants[variant],
        ...style,
      }}
      {...rest}
    />
  )
}
