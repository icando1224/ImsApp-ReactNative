import React, { useState } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import PhoneInput from 'react-native-phone-number-input'
import { InputField } from '../../components/InputField'
import { MainButton } from '../../components/MainButton'
import { PasswordInputField } from '../../components/PasswordInputField'
import { Text } from '../../components/Text'
import { theme } from '../../utils/Theme'
import { NavService } from '../../utils/NavService'
import { SERVER_URL } from '../../utils/Utils'
import { EAuthScreens } from '../../navigation/AppRouts'
import LoadingBar from '../../components/LoadingBar'

export const SignUpScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    try {
      if (!name) {
        alert('Please enter a valid name')
      } else if (!email) {
        alert('Please enter a valid email')
      } else if (!password) {
        alert('Please enter password')
      } else if (!phone) {
        alert('Please enter a phone number')
      } else if (!city) {
        alert('Please enter your city')
      } else if (!country) {
        alert('Please enter your country')
      } else {
        setLoading(true)
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('password_confirmation', password)
        formData.append('dob', '2020-12-19')
        formData.append('phone', phone)
        formData.append('city', city)
        formData.append('country', country)
        formData.append('role', 'user')
        const response = await fetch(`${SERVER_URL}register`, {
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
          alert(responseJson.errors.toString())
        } else {
          NavService.push(EAuthScreens.OTP_SCREEN, responseJson)
        }
      }
    } catch (e) {
      console.log('Invalid Response from server', e)
      setLoading(false)
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.inputSpacer} />
        <Text color="primary" variant="h1SemiBold24">
          Create new Account
        </Text>
        <View style={styles.inputSpacer} />
        <InputField placeholder="Name" value={name} onChangeText={setName} />
        <View style={styles.inputSpacer} />
        <InputField placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <View style={styles.inputSpacer} />
        <PasswordInputField label="password" value={password} onChangeText={setPassword} />
        <View style={styles.inputSpacer} />
        <PhoneInput
          defaultValue={phone}
          defaultCode="US"
          layout="first"
          onChangeFormattedText={(text) => {
            setPhone(text)
          }}
          placeholder="Mobile"
          containerStyle={styles.phoneContainer}
          textContainerStyle={styles.phoneText}
        />

        <View style={styles.inputSpacer} />
        <InputField placeholder="Date Of Birth" />
        <View style={styles.inputSpacer} />
        <InputField placeholder="City" value={city} onChangeText={setCity} />
        <View style={styles.inputSpacer} />
        <InputField placeholder="Country" value={country} onChangeText={setCountry} />
        <View style={styles.inputSpacer} />
        <View style={{ width: '100%' }}>
          <MainButton title="Register" onPress={handleRegister} />
        </View>

        <TouchableOpacity>
          <View style={styles.forgetPasswordContainer}>
            <Text variant="body3Regular12" color="textForeground">
              {'I agree '}
            </Text>
            <Text variant="body3Regular12" color="primary">
              {'term & conditions? '}
            </Text>
            <Text variant="body3Regular12" color="textForeground">
              and
            </Text>
            <Text variant="body3Regular12" color="primary">
              {' privacy policy'}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.inputSpacer} />
        <Image
          style={{ width: '100%', height: 15, resizeMode: 'cover' }}
          source={require('../../assets/images/continue_with.png')}
        />
        <View style={styles.inputSpacer} />
        <View style={{ width: '100%' }}>
          <MainButton
            style={{ backgroundColor: theme.colors.blue }}
            title="Login into exiting account"
            onPress={() => NavService.popTo(1)}
          />
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
  phoneContainer: { width: '100%', borderBottomWidth: 1, borderColor: theme.colors.primary },
  phoneText: { backgroundColor: '#fff' },
})
