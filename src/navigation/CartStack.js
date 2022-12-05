import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CartScreen from '../screens/cart/CartScreen'
import PaymentMethodScreen from '../screens/cart/PaymentMethodScreen'
import OrderConfirmationScreen from '../screens/cart/OrderConfirmationScreen'
import { ECartScreens } from './AppRouts'
const Stack = createNativeStackNavigator()

const CartStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ECartScreens.CART_SCREEN} component={CartScreen} />
      <Stack.Screen name={ECartScreens.PAYMENT_METHOD_SCREEN} component={PaymentMethodScreen} />
      <Stack.Screen name={ECartScreens.ORDER_CONFIRMATION_SCREEN} component={OrderConfirmationScreen} />
    </Stack.Navigator>
  )
}

export default CartStack
