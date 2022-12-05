import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { theme } from '../utils/Theme'
import { InputField } from './InputField'

export const PasswordInputField = ({ label, ...rest }) => {
  const [securePassword, setSecurePassword] = useState(true)
  return (
    <View style={styles.container}>
      <InputField {...rest} secureTextEntry={securePassword} placeholder={label} />
      <View style={styles.showPasswordContainer}>
        <TouchableOpacity onPress={() => setSecurePassword((prev) => !prev)}>
          <Image
            resizeMode={'contain'}
            style={styles.imgPassword}
            source={securePassword ? require('../assets/images/show_icon.png') : require('../assets/images/hide.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
  },
  showPasswordContainer: { position: 'absolute', right: 0, alignItems: 'center' },
  imgPassword: { width: 25, height: 25, marginTop: 5, marginRight: 5 },
})
