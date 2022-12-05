import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { emptyCart } from '../../container/actions/CartActions'
import { Toolbar } from '../../components/Toolbar'
import { NavService } from '../../utils/NavService'
import { Text } from '../../components/Text'
import { EStacks } from '../../navigation/AppRouts'

const OrderConfirmationScreen = () => {
  const navigation = NavService.getNavRef()
  return (
    <View style={styles.container}>
      <Toolbar navigation={navigation.current} title="Order completed" />
      <Image style={styles.imgCheck} source={require('../../assets/images/check.png')} />
      <Text style={styles.thanks} color="primary" variant="h1SemiBold24">
        {'Thank you\nfor purchasing with us'}
      </Text>
      <Text style={styles.txtInfo} color="gray500" variant="body2Medium14">
        In case of any query? contact us.
      </Text>
      <TouchableOpacity onPress={() => NavService.reset(EStacks.DRAWER_STACK)} style={styles.checkout}>
        <Text color="white" variant="body2Medium14">
          Goto My Courses
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  thanks: { textAlign: 'center', marginTop: 20 },
  txtInfo: { marginTop: 20 },
  imgCheck: { width: 90, height: 90, resizeMode: 'contain', marginTop: 90 },
  checkout: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    marginTop: 30,
    // position: 'absolute',
    // bottom: 10,
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 20,
  },
})

const mapStateToProps = (state) => {
  const { auth } = state.login
  const cart = state.cart
  return { auth, cart }
}

const mapDispatchToProps = {
  emptyCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmationScreen)
