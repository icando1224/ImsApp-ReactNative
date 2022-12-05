import React from 'react'
import { SafeAreaView, StyleSheet, Image, Text, Alert, View, Pressable } from 'react-native'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { theme } from '../utils/Theme'
import { NavService } from '../utils/NavService'
import { EAuthScreens, EStacks } from './AppRouts'
import { logout } from './../container/actions/login'
const CustomSidebarMenu = (props) => {
  const { descriptors, navigation, state } = props
  const lastGroupName = ''
  const newGroup = true
  const logout = () => {
    Alert.alert('Logout', 'Do you want to Logout?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          // this.setState({loading: true});
          props.logout().then((data) => {
            // this.setState({loading: false});
            NavService.reset(EStacks.AUTh_STACK)
          })
        },
      },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => NavService.navigate(EStacks.PROFILE_STACK)}>
          <Image source={require('../assets/images/user.png')} style={styles.sideMenuProfileIcon} />
          <Text style={styles.txtHeader}>{props.auth.user.name}</Text>
          <Text style={styles.txtHeader}>{props.auth.user.email}</Text>
        </Pressable>
      </View>
      <DrawerContentScrollView {...props}>
        {/* {state.routes.map((route) => {
          const { activeTintColor, drawerLabel, groupName } = descriptors[route.key].options
          if (groupName !== '1' && lastGroupName !== groupName) {
            newGroup = true
            lastGroupName = groupName
          } else newGroup = false
          return (
            <>
              {newGroup ? (
                <View style={styles.sectionContainer}>
                  <Text key={groupName} style={{ marginLeft: 16 }}>
                    {groupName}
                  </Text>
                  <View style={styles.sectionLine} />
                </View>
              ) : null}
              <DrawerItem
                key={route.key}
                label={({ color }) => <Text style={{ color }}>{drawerLabel}</Text>}
                focused={state.routes.findIndex((e) => e.name === route.name) === state.index}
                activeTintColor={activeTintColor}
                onPress={() => navigation.navigate(route.name)}
              />
            </>
          )
        })} */}
        <DrawerItemList {...props} />
        <DrawerItem
          label={() => <Text style={{ color: theme.colors.primary }}>Logout</Text>}
          // label="Logout"
          onPress={() => {
            props.navigation.closeDrawer()
            logout()
          }}
          icon={() => <Ionicons name="log-out-outline" size={24} color={theme.colors.primary} />}
        />
      </DrawerContentScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: { backgroundColor: theme.colors.primary, paddingVertical: 20 },
  sideMenuProfileIcon: {
    resizeMode: 'contain',
    width: 50,
    alignSelf: 'center',
    height: 50,
  },
  txtHeader: { alignSelf: 'center', fontSize: 18, color: 'white' },
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  sectionLine: {
    backgroundColor: 'gray',
    flex: 1,
    height: 1,
    marginLeft: 10,
    marginRight: 20,
  },
})

const mapStateToProps = (state) => {
  const { auth, loading } = state.login
  return { loading, auth }
}

const mapDispatchToProps = {
  logout,
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomSidebarMenu)
