import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CartReducer from '../reducers/CartReducer'
import loginReducer from '../reducers/login'

const myReducers = combineReducers({
  cart: CartReducer,
  login: loginReducer,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['login'],
  blacklist: [],
}
const persistedReducer = persistReducer(persistConfig, myReducers)
const store = createStore(persistedReducer, applyMiddleware(thunk))

const persistor = persistStore(store)

export { store, persistor }
