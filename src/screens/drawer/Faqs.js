import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { DrawerToolbar } from '../../components/DrawerToolbar'

export class faqs extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <DrawerToolbar navigation={this.props.navigation} title="About Us" />
        <View>
          <Text style={{ margin: 5, fontSize: 18 }}>Who we are ?</Text>
          <Text style={{ margin: 5, fontSize: 15 }}>
            Who we areWho we areWho we areWho we areWho we areWho we areWho we areWho we areWho we areWho we areWho we
            areWho we areWho we areWho we areWho we areWho we areWho we areWho we areWho we areWho we areWho we are
          </Text>
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
})
