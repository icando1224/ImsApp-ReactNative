import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { MainButton } from '../../components/MainButton'
import { PasswordInputField } from '../../components/PasswordInputField'
import { Text } from '../../components/Text'
import { theme } from '../../utils/Theme'
import { Toolbar } from '../../components/Toolbar'
import { NavService } from '../../utils/NavService'
import { SERVER_URL } from '../../utils/Utils'
import LoadingBar from '../../components/LoadingBar'
const ChangePasswordScreen = (props) => {
  const navigation = NavService.getNavRef()
  const [pPassword, setPPassword] = useState('')
  const [nPassword, setNPassword] = useState('')
  const [cPassword, setCPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChangePassword = async () => {
    try {
      if (!pPassword) {
        alert('Please enter previous password.')
      } else if (!nPassword) {
        alert('Please enter new password.')
      } else if (!cPassword) {
        alert('Please enter confirm password.')
      } else if (cPassword !== nPassword) {
        alert('Confirm password did not match.')
      } else {
        setLoading(true)
        const formData = new FormData()
        formData.append('user_id', props.auth.user.id)
        formData.append('new_password', nPassword)
        formData.append('old_password', pPassword)
        console.log(formData)
        const response = await fetch(`${SERVER_URL}user/changePassword`, {
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
          alert(responseJson.message.toString())
        } else alert(responseJson.message.toString())
      }
    } catch (e) {
      console.log('Invalid Response from server', e)
      alert('Invalid Response from server')
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Toolbar navigation={navigation.current} title="Change Password" />
      <View style={styles.formContainer}>
        <View style={styles.inputSpacer} />
        <Text color="primary" variant="h1SemiBold24">
          Change Password
        </Text>
        <View style={styles.inputSpacer} />
        <PasswordInputField label="Previous Password" value={pPassword} onChangeText={setPPassword} />
        <View style={styles.inputSpacer} />
        <PasswordInputField label="New Password" value={nPassword} onChangeText={setNPassword} />
        <View style={styles.inputSpacer} />
        <PasswordInputField label="Confirm Password" value={cPassword} onChangeText={setCPassword} />
        <View style={styles.inputSpacer} />

        <View style={styles.inputSpacer} />
        <View style={{ width: '100%' }}>
          <MainButton title="Change Password" onPress={handleChangePassword} />
        </View>
      </View>
      {loading && <LoadingBar />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  formContainer: { width: '100%', paddingHorizontal: theme.spacing.appPadding, alignItems: 'center' },
  inputSpacer: { height: 24 },
})

const mapStateToProps = (state) => {
  const { auth } = state.login
  return { auth }
}

export default connect(mapStateToProps)(ChangePasswordScreen)
