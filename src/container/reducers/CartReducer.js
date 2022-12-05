import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART } from '../actions/Types'

const initialState = {
  cart: [],
  total: 0,
  totalItems: 0,
}
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      var flag = true
      state.cart.map((item) => {
        if (item.id === action.payload.id) {
          flag = false
        }
      })
      if (flag)
        return {
          ...state,
          cart: [action.payload, ...state.cart],
          total: state.total + parseFloat(action.payload.price),
          totalItems: state.totalItems + 1,
        }
      else
        return {
          ...state,
          cart: [...state.cart],
          total: state.total,
          totalItems: state.totalItems,
        }
    case EMPTY_CART:
      return {
        ...state,
        cart: [],
        total: 0,
        totalItems: 0,
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item, i) => item.id !== action.payload.id),
        total: state.total - action.payload.price,
        totalItems: state.totalItems - 1,
      }
    default:
      return state
  }
}
