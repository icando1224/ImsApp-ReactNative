import React from 'react'
import { View, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { DrawerToolbar } from '../../components/DrawerToolbar'
import { Text } from '../../components/Text'
import LoadingBar from '../../components/LoadingBar'

export class AboutUsScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      heading: '',
      description: '',
      loading: false,
    }
  }

  componentDidMount = () => {
    try {
      fetch('https://duaacollection.com/lms_app/api/aboutUs', {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ loading: false })
          console.log(responseJson)
          this.setState({ heading: responseJson.data.heading })
          this.setState({ description: responseJson.data.description })
        })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <DrawerToolbar navigation={this.props.navigation} title="About Us" />
        <View style={styles.title}>
          <Text color="black" variant="h1SemiBold24">
            {this.state.heading}
          </Text>
          <View style={{ height: '100%' }}>
            <WebView scalesPageToFit={false} source={{ html: this.state.description }} />
          </View>
          {this.state.loading && <LoadingBar />}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  title: { marginTop: 20 },
})
