import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { usePreventScreenCapture } from 'expo-screen-capture'
import { StripeProvider } from '@stripe/stripe-react-native'
import { View, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Text } from './src/components/Text'
import AppNavigation from './src/navigation/AppNavigation'
import { ThemeProvider } from './src/utils/ThemeProvider'
import { store, persistor } from './src/container/stores/Store'
import { theme } from './src/utils/Theme'

export default function App() {
  const [modalVisible, setModalVisible] = useState(true)
  usePreventScreenCapture()
  const [loaded] = useFonts({
    InterBlack: require('./src/assets/fonts/Inter-Black.ttf'),
    InterBold: require('./src/assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('./src/assets/fonts/Inter-Medium.ttf'),
    InterRegular: require('./src/assets/fonts/Inter-Regular.ttf'),
    InterSemiBold: require('./src/assets/fonts/Inter-SemiBold.ttf'),
  })

  const msgModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false)
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modelHeader}>
            <Text style={styles.txtUserInfo} color="danger" variant="body2SemiBold14">
              Few important things to remember
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ alignSelf: 'flex-end' }}>
              <AntDesign name="closecircleo" size={24} color="red" />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'flex-start', width: '100%' }}>
            <Text style={styles.txtUserInfo} color="black" variant="body2SemiBold14">
              {'1- We have given one device access only '}
              <Text style={styles.txtUserInfo} color="black" variant="body3Regular12">
                (You can't access course in two devices at the same tile).
              </Text>
            </Text>
            <Text style={styles.txtUserInfo} color="black" variant="body2SemiBold14">
              {'\n2- You can access course in mobile app only '}
              <Text style={styles.txtUserInfo} color="black" variant="body3Regular12">
                (No access on laptop or computer).
              </Text>
            </Text>
            <Text style={styles.txtUserInfo} color="black" variant="body2SemiBold14">
              {'\n3- If you take a screen short. your mobile app will be blocked automatically '}
              <Text style={styles.txtUserInfo} color="black" variant="body3Regular12">
                (So do not take any screen shot).
              </Text>
            </Text>
            <Text style={styles.txtUserInfo} color="black" variant="body2SemiBold14">
              {"\n4- You have to do a self-assignment of your homework. You don't need to send it to us  "}
            </Text>
            <Text style={styles.txtUserInfo} color="black" variant="body2SemiBold14">
              {'\n5- For any mobile related issue, kindly mail us at '}
              <Text style={styles.txtUserInfo} color="blue" variant="body2SemiBold14">
                email@gmail.com.
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  )

  if (!loaded) {
    return null
  }
  return (
    <StripeProvider
      publishableKey={
        'pk_test_51Guxg5BaNTEFLLCrWQ5faCZbYmwQpxx1bcjvvjsjnSBEMQ6Dn4LpS3uNO590iBn4LBt7Ag2yTEOyxnC5WUB0hPiS00FfAF70SW'
      }>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <SafeAreaProvider>
              <StatusBar backgroundColor="#fff" barStyle={'dark-content'} />
              <SafeAreaView style={styles.safeArea} edges={['top']}>
                <AppNavigation />
                {msgModal()}
              </SafeAreaView>
            </SafeAreaProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </StripeProvider>
  )
}
const styles = StyleSheet.create({
  safeArea: { flex: 1 },
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

  modelHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
})
