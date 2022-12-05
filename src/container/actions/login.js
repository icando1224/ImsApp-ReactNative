import { LOADING } from '../reducers/login'
// import FCM from 'react-native-fcm';
import { SERVER_URL } from '../../utils/Utils'
export const updateAuth = (auth) => {
  return async (dispatch) => {
    // const fcmToken = await FCM.getFCMToken();
    // console.log(' fcmToken ', fcmToken, ' auth ', auth);
    const formdata = new FormData()
    formdata.append('domainId', auth.domainId)
    // formdata.append('fcm_token', fcmToken);
    const response = await fetch(SERVER_URL + 'fcm_token_update', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    })
    const responseJson = await response.json()
    console.log(responseJson)

    dispatch({
      type: 'LOGIN',
      payload: {
        loading: false,
        auth: auth,
        loginSuccess: true,
      },
    })
  }
}

export const updateAuthUser = (auth) => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGIN',
      payload: {
        loading: false,
        auth: auth,
        loginSuccess: true,
      },
    })
  }
}

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING,
      payload: { loading: true },
    })

    const formdata = new FormData()
    formdata.append('email', email)
    formdata.append('password', password)
    formdata.append('device_id', '1122')
    const response = await fetch(`${SERVER_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    })
    const responseJson = await response.json()
    console.log(responseJson)

    // const fcmToken = await FCM.getFCMToken();
    // formdata.append('fcm_token', fcmToken);
    // formdata.append('domainId', responseJson.domainId);
    // response = await fetch('https://salonist.io/webapi/fcm_token_update', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   body: formdata,
    // });
    // const tokenJson = await response.json();
    // console.log(formdata, tokenJson);

    if (responseJson.success === false) {
      dispatch({
        type: LOADING,
        payload: { loading: false },
      })
      return Promise.reject(responseJson)
    } else {
      dispatch({
        type: 'LOGIN',
        payload: {
          loading: false,
          auth: responseJson,
          loginSuccess: true,
        },
      })
      return Promise.resolve(responseJson)
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    // let formdata = new FormData();
    // formdata.append('domainId', domainId);
    // // formdata.append('fcm_token', '');
    // const response = await fetch(
    //   'https://salonist.io/webapi/fcm_token_update',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //     body: formdata,
    //   },
    // );
    // const responseJson = await response.json();
    // console.log(responseJson);
    dispatch({
      type: 'LOGOUT',
    })
    // dispatch({
    //   type: PURGE,
    //   key: 'root',
    // })
    const responseJson = null
    return Promise.resolve(responseJson)
  }
}
