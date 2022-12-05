import React, { useState } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import PhoneInput from 'react-native-phone-number-input'
import * as ImagePicker from 'expo-image-picker'
import { connect } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'
import { InputField } from '../../components/InputField'
import { MainButton } from '../../components/MainButton'
import { PasswordInputField } from '../../components/PasswordInputField'
import { Text } from '../../components/Text'
import { theme } from '../../utils/Theme'
import { NavService } from '../../utils/NavService'
import { Toolbar } from '../../components/Toolbar'
import { SERVER_URL } from '../../utils/Utils'
import LoadingBar from '../../components/LoadingBar'
import { updateAuthUser } from '../../container/actions/login'
const EditProfileScreen = (props) => {
  const [phone, setPhone] = useState(props.auth.user.phone)
  const [name, setName] = useState(props.auth.user.name)
  const [email, setEmail] = useState(props.auth.user.email)
  const [dob, setDob] = useState(new Date(props.auth.user.dob))
  const [showDate, setShowDate] = useState(false)
  const [city, setCity] = useState(props.auth.user.city)
  const [country, setCountry] = useState(props.auth.user.country)
  const [loading, setLoading] = useState(false)

  const [image, setImage] = useState(null)
  const navigation = NavService.getNavRef()

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const handleDatePicker = (event, selectedDate) => {
    const currentDate = selectedDate || dob
    setShowDate(Platform.OS === 'ios')
    setDob(currentDate)
  }

  const handleUpdateProfile = async () => {
    try {
      if (!name) {
        alert('Please enter a valid name')
      } else if (!phone) {
        alert('Please enter a phone number')
      } else if (!city) {
        alert('Please enter your city')
      } else if (!country) {
        alert('Please enter your country')
      } else {
        setLoading(true)
        const formData = new FormData()
        formData.append('user_id', props.auth.user.id)
        formData.append('name', name)
        formData.append('dob', format(dob, 'yyyy-MM-dd'))
        formData.append('phone', phone)
        formData.append('city', city)
        formData.append('country', country)
        console.log(formData)
        const response = await fetch(`${SERVER_URL}user/updateProfile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${props.auth.token}`,
          },
          body: formData,
        })
        setLoading(false)
        const responseJson = await response.json()
        console.log(responseJson)
        if (responseJson.success === false) {
          alert(responseJson.errors.toString())
        } else if (responseJson.success === true) {
          const tempAuth = props.auth
          tempAuth.user = responseJson.user
          updateAuthUser(tempAuth)
        }
      }
    } catch (e) {
      console.log('Invalid Response from server', e)
      alert('Invalid Response from server')
      setLoading(false)
    }
  }

  return (
    <View>
      <Toolbar navigation={navigation.current} title="Edit Profile" />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.inputSpacer} />
          <TouchableOpacity onPress={() => pickImage()}>
            {image == null ? (
              <Image style={styles.pickImg} source={require('../../assets/images/user.png')} />
            ) : (
              <Image style={styles.pickImg} source={{ uri: image }} />
            )}
          </TouchableOpacity>
          <View style={styles.inputSpacer} />
          <InputField placeholder="Name" value={name} onChangeText={setName} />
          <View style={styles.inputSpacer} />
          <InputField placeholder="Email" value={email} onChangeText={setEmail} editable={false} />
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
          <TouchableOpacity onPress={() => setShowDate(true)} style={styles.width}>
            <InputField placeholder="Date Of Birth" value={format(dob, 'dd-MMM-yyyy')} editable={false} />
          </TouchableOpacity>
          <View style={styles.inputSpacer} />
          <InputField placeholder="City" value={city} onChangeText={setCity} />
          <View style={styles.inputSpacer} />
          <InputField placeholder="Country" value={country} onChangeText={setCountry} />
          <View style={styles.inputSpacer} />
          <View style={styles.width}>
            <MainButton title="Update" onPress={handleUpdateProfile} />
          </View>
        </View>
      </ScrollView>
      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dob}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={handleDatePicker}
        />
      )}
      {loading && <LoadingBar />}
    </View>
  )
}

const styles = StyleSheet.create({
  width: { width: '100%' },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: theme.spacing.appPadding,
    alignItems: 'center',
  },
  inputSpacer: { height: 24 },
  phoneContainer: { width: '100%', borderBottomWidth: 1, borderColor: theme.colors.primary },
  phoneText: { backgroundColor: '#fff' },
  pickImg: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 50,
  },
})

const mapStateToProps = (state) => {
  const { auth } = state.login
  return { auth }
}

const mapDispatchToProps = {
  updateAuthUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)
