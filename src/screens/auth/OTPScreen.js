import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { InputField } from '../../components/InputField'
import { MainButton } from '../../components/MainButton'
import { Text } from '../../components/Text'
import { theme } from '../../utils/Theme'
import { NavService } from '../../utils/NavService'
import { SERVER_URL } from '../../utils/Utils'
import { Toolbar } from '../../components/Toolbar'
import LoadingBar from '../../components/LoadingBar'

export const OTPScreen = () => {
  const navigation = NavService.getNavRef()
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const params = NavService.getCurrentRouteParams()
  console.log('params', params)
  const handleVerify = async () => {
    try {
      if (!otp) {
        alert('Please enter OTP')
      } else {
        setLoading(true)
        const formData = new FormData()
        formData.append('user_id', params.user.id)
        formData.append('otp', otp)
        const response = await fetch(`${SERVER_URL}confirm-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        })
        setLoading(false)
        const responseJson = await response.json()
        console.log(responseJson)
        if (responseJson.success === false) {
          alert(responseJson.message)
        } else {
          Alert.alert(
            'Success..',
            'Your account verified successfully, Kindly login',
            [{ text: 'OK', onPress: () => NavService.popTo(2) }],
            { cancelable: false },
          )
          // todo
          // NavService.push(EAuthScreens.OTP_SCREEN)
        }
      }
    } catch (e) {
      console.log('Invalid Response from server', e)
      setLoading(false)
    }
  }

  return (
    <ScrollView>
      <Toolbar navigation={navigation.current} title="OTP Verification" />
      <View style={styles.container}>
        <View style={styles.inputSpacer} />
        <Text color="primary" variant="h1SemiBold24">
          OTP Verification
        </Text>
        <View style={styles.inputSpacer} />
        <Text color="black" variant="body3SemiBold12">
          Kindly check your email for otp verification
        </Text>
        <InputField placeholder="Enter OTP" value={otp} onChangeText={setOtp} />
        <TouchableOpacity>
          <View style={styles.forgetPasswordContainer}>
            <Text variant="body3Regular12" color="textForeground">
              {'Did not receive otp? '}
            </Text>
            <Text variant="body3Regular12" color="primary">
              {'Resend. '}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.inputSpacer} />
        <View style={{ width: '100%' }}>
          <MainButton title="Verify" onPress={handleVerify} />
        </View>
      </View>
      {loading && <LoadingBar />}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: theme.spacing.appPadding,
    alignItems: 'center',
  },
  forgetPasswordContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  inputSpacer: { height: 24 },
})
