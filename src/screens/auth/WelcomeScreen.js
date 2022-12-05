import React from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { InputField } from '../../components/InputField'
import { MainButton } from '../../components/MainButton'
import { Text } from '../../components/Text'
import { Theme } from '../../utils//Theme'

export class welcomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/images/header_bg.png')} style={styles.image}>
          <View style={styles.text}>
            <Text variant="h2SemiBold20" style={{ color: '#fff' }}>
              Welcome
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.button}>
          <View style={{ backgroundColor: '#d4d4d4', height: 1, width: '100%' }} />

          <Text color="primary" variant="body2SemiBold14" style={{ margin: 10, padding: 10 }}>
            Create New Account
          </Text>

          <View style={{ backgroundColor: '#d4d4d4', height: 1, width: '100%' }} />

          <Text color="primary" variant="body2SemiBold14" style={{ margin: 10, padding: 10 }}>
            Log In Existing Account
          </Text>
        </View>

        <View />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    flex: 0.5,
    justifyContent: 'center',
  },
})
