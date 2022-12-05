import React, { useState, useEffect } from 'react'
import { View, Image, TouchableOpacity, StyleSheet, Modal, Pressable, FlatList, Alert } from 'react-native'
import { Feather, AntDesign } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { DrawerToolbar } from '../../components/DrawerToolbar'
import { Text } from '../../components/Text'
import { MainButton } from '../../components/MainButton'
import { NavService } from '../../utils/NavService'
import { EDrawer, EStacks } from '../../navigation/AppRouts'
import { theme } from '../../utils/Theme'
import { SERVER_URL } from '../../utils/Utils'
import LoadingBar from '../../components/LoadingBar'
const MyCoursesScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(true)
  const [courseList, setCourseList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // console.log('auth', props.auth)
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('user_id', props.auth.user.id)
      const response = await fetch(`${SERVER_URL}user/subscriptions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${props.auth.token}`, // notice the Bearer before your token
        },
        body: formData,
      })
      const responseJson = await response.json()
      setLoading(false)
      if (responseJson.success === true) setCourseList(responseJson.courses)
    } catch (e) {
      Alert.alert('Invalid response from server.')
      setLoading(false)
    }
  }

  const onPressCourseDetail = (course) => {
    NavService.navigate(EStacks.COURSE_STACK, { course: course, purchased: true })
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
        <Text style={styles.txtUserInfo} color="gray500" variant="body2Regular14">
          Valid Till: {item.validTill}
        </Text>
      </View>
    </Pressable>
  )

  const renderActions = () => (
    <View style={styles.actions}>
      <TouchableOpacity>
        <Feather name="bell" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )

  const renderNoDataFound = () => (
    <View style={styles.noDataContainer}>
      <Image source={require('../../assets/images/nodata_found.png')} />
      <Text style={styles.txtCenter} color="gray500" variant="body2Medium14">
        {"You don't have any course yet. Purchase your first course from store."}
      </Text>
      <View style={styles.btnStore}>
        <MainButton onPress={() => NavService.reset(EDrawer.STORE)} title="Go To Store" />
      </View>
    </View>
  )

  return (
    <View>
      <DrawerToolbar navigation={props.navigation} title="My Courses" rest={renderActions()} />
      {courseList.length > 0 ? (
        <FlatList style={{ margin: 10 }} data={courseList} renderItem={renderListItem} />
      ) : (
        renderNoDataFound()
      )}
      {loading && <LoadingBar />}
    </View>
  )
}
const styles = StyleSheet.create({
  actions: {
    flex: 1,
    marginLeft: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  noDataContainer: { height: '100%', paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' },
  txtCenter: { textAlign: 'center' },
  btnStore: { width: '70%', marginTop: 15 },

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
})

const mapStateToProps = (state) => {
  const { auth } = state.login
  const totalItems = state.cart.totalItems
  return { auth, totalItems }
}

export default connect(mapStateToProps)(MyCoursesScreen)
