import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Modal, Image, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { CommonActions } from '@react-navigation/native'
import { InputField } from '../../components/InputField'
import { MainButton } from '../../components/MainButton'
import { PasswordInputField } from '../../components/PasswordInputField'
import { Text } from '../../components/Text'
import { theme } from '../../utils/Theme'
import { NavService } from '../../utils/NavService'
import { EAuthScreens, EStacks } from '../../navigation/AppRouts'
import { login } from '../../container/actions/login'
import LoadingBar from '../../components/LoadingBar'
const LoinScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // console.log('auth ', props)
    if (props.auth && props.loginSuccess) {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: EStacks.DRAWER_STACK }],
        }),
      )
    }
  }, [props, props.auth, props.loginSuccess])

  const handleLogin = () => {
    // if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    if (!email) {
      alert('Please enter a valid email')
    } else if (!password) {
      alert('Please enter a password')
    } else {
      setLoading(true)
      props
        .login(email, password)
        .then(
          (data) => {
            if (data.success === false) {
              alert(data.message)
            }
            setLoading(false)
          },
          (error) => {
            console.log('error', error)
            alert(error.message)
            setLoading(false)
          },
        )
        .catch((error) => {
          console.log(error)
        })
    }
    // NavService.reset(EStacks.DRAWER_STACK)
  }

  const forgetPasswordModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false)
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={{ alignSelf: 'flex-end' }}>
            <AntDesign name="closecircleo" size={24} color="red" />
          </TouchableOpacity>
          <Text color="black" variant="body2SemiBold14" style={styles.modalText}>
            Reset Password!
          </Text>
          <InputField placeholder="Email" />
          <View style={styles.inputSpacer} />
          <View style={{ width: '100%' }}>
            <MainButton
              style={{ backgroundColor: theme.colors.blue }}
              title="Reset Password"
              onPress={() => console.log('reset password')}
            />
            <View style={styles.inputSpacer} />
          </View>
        </View>
      </View>
    </Modal>
  )

  return (
    <View style={styles.container}>
      {forgetPasswordModal()}
      <Text color="primary" variant="h1SemiBold24">
        Login
      </Text>
      <View style={styles.inputSpacer} />
      <View style={styles.inputSpacer} />
      <InputField
        placeholder="Enter Your Email"
        value={email}
        keyboardType="email-address"
        onChangeText={(value) => {
          setEmail(value)
        }}
      />
      <View style={styles.inputSpacer} />
      <PasswordInputField
        label="Enter Your Password"
        value={password}
        onChangeText={(value) => {
          setPassword(value)
        }}
      />
      <View style={styles.inputSpacer} />
      <View style={{ width: '100%' }}>
        <MainButton title="Login" onPress={handleLogin} />
      </View>
      <View style={styles.inputSpacer} />
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text color="gray500" variant="h3Regular18">
          Forget Password
        </Text>
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
          title="Create new account"
          onPress={() => NavService.push(EAuthScreens.SIGN_UP_SCREEN)}
        />
      </View>
      {loading && <LoadingBar />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: theme.spacing.appPadding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputSpacer: { height: 24 },
  modalView: {
    margin: 20,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
})
const mapStateToProps = (state) => {
  const { auth, loading, loginSuccess } = state.login
  return { loginSuccess, loading, auth }
}

const mapDispatchToProps = {
  login,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoinScreen)
