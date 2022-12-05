import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { connect } from 'react-redux'
import { WebView } from 'react-native-webview'
import { DrawerToolbar } from '../../components/DrawerToolbar'
import { InputField } from '../../components/InputField'
import { theme } from '../../utils/Theme'
import LoadingBar from '../../components/LoadingBar'
const Tab = createMaterialTopTabNavigator()
class HelpScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      email: null,
      mobile: null,
      message: null,
      loading: false,
      heading: '',
      description: '',
    }
  }

  async submit() {
    if (!this.state.name) {
      alert('Please enter a name')
    } else if (!this.state.email) {
      alert('Please enter a valid email address')
    } else if (!this.state.mobile) {
      alert('Please enter a mobile number')
    } else if (!this.state.message) {
      alert('Please enter a message')
    } else {
      this.setState({ loading: true })
      try {
        const formData = new FormData()
        formData.append('name', this.state.name)
        formData.append('email', this.state.email)
        formData.append('mobile', this.state.mobile)
        formData.append('message', this.state.message)

        const resopone = await fetch('https://duaacollection.com/lms_app/api/user/contactUs', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${this.props.auth.token}`,
          },

          body: formData,
        })
        const resoponeJason = await resopone.json()
        this.setState({ loading: false })
        console.log(resoponeJason)
        if (resoponeJason.success == true) {
          Alert.alert(resoponeJason.message)
        } else {
          if (resoponeJason.message) {
            Alert.alert(resoponeJason.message)
          } else {
            Alert.alert(resoponeJason.errors)
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  contactUs = () => {
    return (
      <View>
        <View>
          <Text style={{ justifyContent: 'center', textAlign: 'center', margin: 10, fontSize: 18 }}>Contact Us</Text>
          <Text style={{ justifyContent: 'center', textAlign: 'center', margin: 10 }}>
            Please fill out the form below to reach us anytime
          </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.inputSpacer} />
          <InputField
            placeholder="Enter Your Name"
            keyboardType="text"
            value={this.state.name}
            onChangeText={(text) => this.setState({ name: text })}
          />
          <View style={styles.inputSpacer} />
          <InputField
            placeholder="Enter Your Email"
            keyboardType="text"
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text })}
          />

          <View style={styles.inputSpacer} />
          <InputField
            placeholder="Enter Your Mobile"
            keyboardType="number"
            value={this.state.mobile}
            onChangeText={(text) => this.setState({ mobile: text })}
          />
          <View style={styles.inputSpacer} />
          <InputField
            placeholder="Enter Your Message"
            value={this.state.message}
            onChangeText={(text) => this.setState({ message: text })}
          />
          <TouchableOpacity
            style={styles.userbtn}
            onPress={() => {
              this.submit()
            }}>
            <Text style={styles.btnTxt}>Submit</Text>
          </TouchableOpacity>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }} />
        </View>
      </View>
    )
  }

  faq() {
    const [heading, setHeading] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      try {
        fetch('https://duaacollection.com/lms_app/api/faqs', {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((responseJson) => {
            setLoading(false)
            console.log(responseJson)
            setHeading(responseJson.data.heading)
            setDescription(responseJson.data.description)
            // alert('FAQs Content Updated Sucessfully')
          })
      } catch (e) {
        console.log(e)
      }
    }, [])

    return (
      <View style={{ margin: 5, fontSize: 15, backgroundColor: theme.colors.white }}>
        <View>
          <Text style={{ margin: 5, fontSize: 18 }}>{heading}</Text>
          {/* <Text style={{ margin: 5, fontSize: 18 }}>{description}</Text> */}
          <View style={{ height: '100%' }}>
            <WebView scalesPageToFit={false} source={{ html: description }} />
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <DrawerToolbar navigation={this.props.navigation} title="Help & Support" />
        <Tab.Navigator>
          <Tab.Screen name="FAQs" component={this.faq} options={{ tabBarLabel: 'FAQs' }} />
          <Tab.Screen name="ContactUS" component={this.contactUs} options={{ tabBarLabel: 'Contact Us' }} />
        </Tab.Navigator>
        {this.state.loading && <LoadingBar />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  body: {
    marginHorizontal: theme.spacing.appPadding,
  },
  inputSpacer: { height: 24 },
  userbtn: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  btnTxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
})

const mapStateToProps = (state) => {
  const { auth } = state.login
  return { auth }
}

export default connect(mapStateToProps)(HelpScreen)
