import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Button, Image, Alert, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native'
import LoadingBar from '../../components/LoadingBar'
import { Toolbar } from '../../components/Toolbar'
import { NavService } from '../../utils/NavService'
import { SERVER_URL } from '../../utils/Utils'
import { emptyCart } from '../../container/actions/CartActions'
import { InputField } from '../../components/InputField'
import { theme } from '../../utils/Theme'
import { Text } from '../../components/Text'
import { ECartScreens } from '../../navigation/AppRouts'
const PaymentMethodScreen = (props) => {
  const navigation = NavService.getNavRef()
  const [loadingData, setLoadingData] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState(null)
  const [cardDetails, setCardDetails] = useState()
  const { confirmPayment, loading } = useConfirmPayment()
  const [orderCompleted, setOrderCompleted] = useState(false)

  const orderConfirmation = () => {
    Alert.alert('Place Order', 'Do you want to Place order?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          handlePlaceOrder()
        },
      },
    ])
  }
  const handlePlaceOrder = async () => {
    const cart = props.cart.cart
    const orderList = []
    for (const item of cart) {
      orderList.push({ course_id: item.id, price: item.price })
    }
    try {
      const formData = new FormData()
      // const paymentDetail = { payment_status: 'paid', cardDetail: JSON.stringify(cardDetails) }
      formData.append('courses', JSON.stringify(orderList))
      formData.append('user_id', props.auth.user.id)
      formData.append('payment_method', JSON.stringify(cardDetails))
      setLoadingData(true)
      const response = await fetch(`${SERVER_URL}course/purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${props.auth.token}` },
        body: formData,
      })
      const responseJson = await response.json()
      console.log(responseJson)
      props.emptyCart()
      setLoadingData(false)
      if (responseJson.success === true) {
        Alert.alert('Success', 'Order placed successfully')
        setOrderCompleted(true)
      } else {
        alert(responseJson.errors)
      }
    } catch (e) {
      console.log('error', e)
      Alert.alert('Error', 'Invalid response from server')
      setLoadingData(false)
    }
  }

  const handleConfirmPayment = async () => {
    if (!name) {
      Alert.alert('Error', 'Enter card holder name')
      return
    }
    if (props.cart.total <= 0) {
      Alert.alert('Error', 'Cart is empty')
      return
    }
    setLoadingData(true)
    try {
      const formData = new FormData()
      formData.append('amount', props.cart.total)
      const response = await fetch(`${SERVER_URL}stripePost`, {
        method: 'POST',
        body: formData,
      })
      const responseJson = await response.json()
      const clientSecret = responseJson.secret_token
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        type: 'Card',
        billingDetails: { name: name },
      })
      setLoadingData(false)
      if (error) {
        Alert.alert(`Error Code: ${error.code}`, error.message)
      } else if (paymentIntent) {
        handlePlaceOrder()
        setMessage(`Your tracking id: ${paymentIntent.id}`)
      }
    } catch (e) {
      setLoadingData(false)
      Alert.alert('Error', 'Invalid Server response')
    }
  }

  return (
    <View style={styles.container}>
      <Toolbar navigation={navigation.current} title="Payment" />
      <ScrollView style={styles.root}>
        <Image style={styles.imgCard} source={require('../../assets/images/credit_card.png')} />
        <Text style={styles.txtTotal} color="black" variant="h1SemiBold24">
          Total Amount:{props.cart.total}{' '}
        </Text>
        <InputField placeholder="Enter Card Holder Name" value={name} onChangeText={setName} />

        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={(cardDetails) => {
            setCardDetails(cardDetails)
          }}
        />

        {message && (
          <Text style={styles.txtMessage} color="black" variant="body2Medium14">
            Payment completed successfully.
          </Text>
        )}
        <Text style={styles.txtMessage} color="danger" variant="body2Medium14">
          {message}
        </Text>
        {message && (
          <Text style={styles.txtMessage} color="black" variant="body2Medium14">
            Finalizing your order.
          </Text>
        )}

        {!orderCompleted && <Button onPress={handleConfirmPayment} title="Pay Now" disabled={loading} />}

        {orderCompleted && (
          <TouchableOpacity
            onPress={() => NavService.navigate(ECartScreens.ORDER_CONFIRMATION_SCREEN)}
            style={styles.checkout}>
            <Text style={styles.txtCheckout}>Continue</Text>
          </TouchableOpacity>
        )}
        {(loadingData || loading) && <LoadingBar />}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.white },
  root: {
    paddingHorizontal: theme.spacing.appPadding,
    flex: 1,
  },
  checkout: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    marginLeft: '15%',
    // position: 'absolute',
    // bottom: 10,
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 20,
  },
  txtCheckout: {
    color: '#fff',
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
  card: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 5,
  },
  txtTotal: { alignSelf: 'center', marginBottom: 20 },
  imgCard: { height: 200, resizeMode: 'contain', width: '100%' },
  txtMessage: { marginBottom: 10 },
})

const mapStateToProps = (state) => {
  const { auth } = state.login
  const cart = state.cart
  return { auth, cart }
}

const mapDispatchToProps = {
  emptyCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodScreen)
