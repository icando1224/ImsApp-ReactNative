import React from 'react'
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { Toolbar } from '../../components/Toolbar'
import { NavService } from '../../utils/NavService'
import { removeItem } from '../../container/actions/CartActions'
import { ECartScreens } from '../../navigation/AppRouts'
const CartScreen = (props) => {
  const navigation = NavService.getNavRef()

  const handleCheckout = () => {
    NavService.navigate(ECartScreens.PAYMENT_METHOD_SCREEN)
  }

  const renderCartRow = (item) => (
    <View style={styles.card}>
      <View style={styles.imgView}>
        <Image source={require('../../assets/images/academy.png')} style={styles.image} />
      </View>
      <View style={styles.rowFlex}>
        <View style={styles.textItem}>
          <Text style={styles.textLabel}>Course:</Text>
          <Text style={styles.textValue}>{item.name}</Text>
        </View>
        <View style={styles.textItem}>
          <Text style={styles.textLabel}>Price:</Text>
          <Text style={styles.textValue}>{item.price}</Text>
        </View>
      </View>
      <View style={styles.removeView}>
        <TouchableOpacity
          onPress={() => {
            props.removeItem(item)
          }}>
          <MaterialIcons name="delete-forever" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <Toolbar navigation={navigation.current} title="My Cart" />
      {props.cartItems.length === 0 ? (
        <View style={styles.noDataView}>
          <Text>No Data Found</Text>
        </View>
      ) : (
        <FlatList data={props.cartItems} renderItem={({ index, item }) => renderCartRow(item)} />
      )}
      <TouchableOpacity onPress={handleCheckout} style={styles.checkout}>
        <Text style={styles.txtCheckout}>Checkout ($ {props.total} ) </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  noDataView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    borderRadius: 5,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  textItem: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  textLabel: {
    color: 'green',
    marginRight: 10,
    flex: 1,
    textAlign: 'right',
  },
  textValue: {
    flex: 2,
  },
  checkout: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    marginLeft: '15%',
    position: 'absolute',
    bottom: 10,
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 20,
  },
  imgView: { flex: 1, justifyContent: 'center' },
  image: { height: 70, width: 70, alignSelf: 'center', marginLeft: 30 },
  rowFlex: { flex: 4 },
  removeView: { justifyContent: 'center' },
  txtCheckout: { color: '#fff', fontSize: 16 },
})

const mapStateToProps = (state) => ({
  cartItems: state.cart.cart,
  total: state.cart.total,
  totalItems: state.cart.totalItems,
})

const mapDispatchToProps = {
  removeItem,
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen)
