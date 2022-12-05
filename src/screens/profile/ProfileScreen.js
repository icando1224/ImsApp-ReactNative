import React, { useEffect } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { Text } from '../../components/Text'
import { Toolbar } from '../../components/Toolbar'
import { NavService } from '../../utils/NavService'
import { theme } from '../../utils/Theme'
import { EProfileScreens } from '../../navigation/AppRouts'
const ProfileScreen = (props) => {
  const navigation = NavService.getNavRef()

  const renderMenuRow = (title, icon, route) => (
    <TouchableOpacity onPress={() => NavService.push(route)} style={styles.menuContainer}>
      <FontAwesome name={icon} size={24} color={theme.colors.primary} />
      <Text style={styles.txtUserInfo} color="black" variant="body2Regular14">
        {title}
      </Text>
    </TouchableOpacity>
  )

  return (
    <View>
      <Toolbar navigation={navigation.current} title="My Profile" />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => NavService.push(EProfileScreens.EDIT_PROFILE)} style={styles.userContainer}>
          <Image style={styles.image} source={require('../../assets/images/user.png')} />
          <View style={styles.txtUserInfo}>
            <Text color="black" variant="body2Medium14">
              {props.auth.user.name}
            </Text>
            <Text color="gray500" variant="body3Medium12">
              {props.auth.user.email}
            </Text>
            <Text color="gray500" variant="body3Medium12">
              {props.auth.user.phone}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.separator} />
        {renderMenuRow('My Subscription', 'bell-o')}
        <View style={styles.separator} />
        {renderMenuRow('My Wishlist', 'heart-o', EProfileScreens.WISHLIST_SCREEN)}
        <View style={styles.separator} />
        {renderMenuRow('Change Password', 'key', EProfileScreens.CHANGE_PASSWORD)}
        {/* <View style={styles.separator} />
        {renderMenuRow('Redeem Access Code', 'gift')} */}
        <View style={styles.separator} />
        {renderMenuRow('Purchase History', 'history', EProfileScreens.PURCHASE_HISTORY_SCREEN)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: theme.spacing.appPadding,
    backgroundColor: theme.colors.appBackground,
  },
  separator: {
    backgroundColor: theme.colors.gray300,
    height: 1,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
    height: 75,
  },
  image: { width: 60, height: 60, resizeMode: 'contain' },
  txtUserInfo: { marginLeft: 30 },
  menuContainer: { height: 60, marginHorizontal: 20, flexDirection: 'row', alignItems: 'center' },
})
const mapStateToProps = (state) => {
  const { auth } = state.login
  return { auth }
}

export default connect(mapStateToProps)(ProfileScreen)
