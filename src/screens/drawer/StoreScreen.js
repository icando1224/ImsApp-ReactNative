import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Pressable, Modal, Alert } from 'react-native'
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { DrawerToolbar } from '../../components/DrawerToolbar'
import { Text } from '../../components/Text'
import { theme } from '../../utils/Theme'
import { NavService } from '../../utils/NavService'
import { EStacks, EDrawer, ECourseScreens } from '../../navigation/AppRouts'
import { SERVER_URL } from '../../utils/Utils'
import LoadingBar from '../../components/LoadingBar'
import { MainButton } from '../../components/MainButton'
import { addToCart } from '../../container/actions/CartActions'
const StoreScreen = (props) => {
  const [courseList, setCourseList] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  useEffect(() => {
    // console.log('auth', props.auth)
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${SERVER_URL}courses`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${props.auth.token}`, // notice the Bearer before your token
        },
      })
      const responseJson = await response.json()
      setCourseList(responseJson.courses)
      setLoading(false)
      // console.log(responseJson)
    } catch (e) {
      Alert.alert('Invalid response from server.')
    }
  }

  const onPressCourseDetail = (course) => {
    NavService.navigate(EStacks.COURSE_STACK, { course: course })
  }

  const handleAddToCart = (item) => {
    props.addToCart(item)
    setSelectedItem(item)
    setModalVisible(true)
  }

  const renderListItem = ({ item }) => (
    <Pressable onPress={() => onPressCourseDetail(item)} style={styles.listContainer}>
      <Image style={styles.image} source={require('../../assets/images/academy.png')} />
      <View style={styles.courseDetail}>
        <Text style={styles.txtUserInfo} color="black" variant="body2Regular14">
          {item.name}
        </Text>
        <Text style={styles.txtUserInfo} color="gray500" variant="body2Regular14">
          {item.author}
        </Text>
        <View style={styles.priceContainer}>
          <TouchableOpacity onPress={() => handleAddToCart(item)}>
            <Text style={styles.txtPrice} color="primary" variant="body1Regular16">
              Buy ${item.price}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  )
  const renderActions = () => (
    <View style={styles.actions}>
      <TouchableOpacity onPress={() => NavService.reset(EDrawer.MY_COURSES)}>
        <Ionicons name="library" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather name="bell" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => NavService.navigate(EStacks.CART_STACK)}>
        <Ionicons name="ios-cart-outline" size={24} color="white" />
        <View style={styles.tabContainer}>
          <View style={styles.tabBadge}>
            <Text style={styles.tabBadgeText}>{props.totalItems}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => NavService.navigate(ECourseScreens.SEARCH_SCREEN)}>
        <Ionicons name="search-sharp" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )

  const addToCartModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false)
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modelHeader}>
            <Ionicons name="ios-cart-outline" size={24} color="black" />
            <Text style={styles.txtUserInfo} color="black" variant="body2Regular14">
              Course Added to cart
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ alignSelf: 'flex-end' }}>
              <AntDesign name="closecircleo" size={24} color="red" />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'flex-start' }} />
          <View style={styles.listContainer}>
            <Image style={styles.image} source={require('../../assets/images/academy.png')} />
            <View style={styles.courseDetail}>
              <Text style={styles.txtUserInfo} color="black" variant="body2Regular14">
                {selectedItem && selectedItem.name}
              </Text>
              <Text style={styles.txtUserInfo} color="gray500" variant="body2Regular14">
                {selectedItem && selectedItem.author}
              </Text>
              <Text style={styles.txtUserInfo} color="gray500" variant="body2Regular14">
                {selectedItem && 'Sub Total: ' + selectedItem.price}
              </Text>
            </View>
          </View>
          <View style={{ width: '90%' }}>
            <MainButton
              style={{ backgroundColor: theme.colors.danger }}
              title="Add More"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </View>
    </Modal>
  )

  return (
    <View>
      <DrawerToolbar navigation={props.navigation} title="Store" rest={renderActions()} />
      {addToCartModal()}
      <View style={styles.container}>
        {courseList.length === 0 ? (
          <View style={styles.noData}>
            <Text color="gray500" variant="body2Regular14">
              No Data Found
            </Text>
          </View>
        ) : (
          <FlatList data={courseList} renderItem={renderListItem} />
        )}
      </View>
      {loading && <LoadingBar />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: theme.spacing.appPadding,
    paddingVertical: theme.spacing.appPadding,
    backgroundColor: theme.colors.appBackground,
  },
  listContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    marginBottom: 10,
  },
  image: { width: '40%', height: 100 },
  courseDetail: { marginLeft: 10, flex: 1, height: '100%' },
  priceContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  txtPrice: { marginRight: 10, marginBottom: 5 },
  actions: {
    flex: 1,
    marginLeft: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabContainer: {
    width: 24,
    height: 24,
    position: 'absolute',
  },
  tabBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 16,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tabBadgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },

  modalView: {
    margin: 20,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modelHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  noData: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})

const mapStateToProps = (state) => {
  const { auth } = state.login
  const totalItems = state.cart.totalItems
  return { auth, totalItems }
}

const mapDispatchToProps = {
  addToCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreScreen)
