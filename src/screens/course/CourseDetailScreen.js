import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { format } from 'date-fns'
import { connect } from 'react-redux'
import { NavService } from '../../utils/NavService'
import { Toolbar } from '../../components/Toolbar'
import { Text } from '../../components/Text'
import { addToCart } from '../../container/actions/CartActions'
import { theme } from '../../utils/Theme'
import { ECourseScreens } from '../../navigation/AppRouts'
const CourseDetailScreen = (props) => {
  const navigation = NavService.getNavRef()
  const [course, setCourse] = useState(null)
  const [state, updateState] = useState(new Date())
  const params = NavService.getCurrentRouteParams()
  const [purchased, setPurchased] = useState(params?.purchased || false)
  useEffect(() => {
    const tempTopic = params?.course?.topics
    tempTopic?.map((cor) => (cor.expanded = false))
    setCourse(params?.course)
  }, [])

  const handleAddToCart = () => {
    console.log(course)
    props.addToCart(course)
    Alert.alert('Success', 'Item added to cart')
  }

  const renderCourseDetail = () => (
    <View style={styles.courseDetailContainer}>
      <View style={styles.courseDetailRow}>
        <Text color="black" variant="body3Regular12">
          {'Course: '}
          <Text color="blue" variant="body3Regular12">
            {course?.name}
          </Text>
        </Text>
        <Text color="black" variant="body3Regular12">
          {'Instructor: '}
          <Text color="blue" variant="body3Regular12">
            {course?.author}
          </Text>
        </Text>
      </View>
      <View style={styles.courseDetailRow}>
        <Text color="black" variant="body3Regular12">
          {'Language: '}
          <Text color="blue" variant="body3Regular12">
            {course?.language}
          </Text>
        </Text>
        <Text color="black" variant="body3Regular12">
          {'Valid till: '}
          <Text color="blue" variant="body3Regular12">
            {course?.validTill}
          </Text>
        </Text>
      </View>
    </View>
  )

  const handleShowItem = (index, item) => {
    item.expanded = !item.expanded
    const items = course
    items[index] = item
    setCourse(items)
    updateState(new Date())
  }

  const handlePlayVideo = (item) => {
    NavService.navigate(ECourseScreens.PLAY_VIDEO_SCREEN)
  }

  const renderListItem = ({ index, item }) => (
    <View>
      <TouchableOpacity onPress={() => handleShowItem(index, item)} style={styles.rowTop}>
        <MaterialIcons name="topic" size={18} color="black" />
        <Text style={styles.txtTitle} color="black" variant="body2Regular14">
          {item.topic}
        </Text>
        <MaterialIcons name={item.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} color="black" />
      </TouchableOpacity>
      {item.expanded && (
        <View>
          <FlatList
            data={item?.topic_detail}
            renderItem={(child) => (
              <TouchableOpacity onPress={() => handlePlayVideo(item)} style={styles.subListRoot}>
                <MaterialIcons name="video-collection" size={16} color={purchased ? 'black' : 'gray'} />
                <Text style={styles.txtSubtitle} color={purchased ? 'black' : 'gray500'} variant="body2Regular14">
                  {child.item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  )

  return (
    <View>
      <Toolbar navigation={navigation.current} title="Course Detail" />
      <Image style={styles.imgCove} source={require('../../assets/images/academy.png')} />
      <View style={styles.container}>
        {renderCourseDetail()}
        <View style={styles.courseContentContainer}>
          {purchased === false ? (
            <TouchableOpacity onPress={handleAddToCart} style={styles.btnAddToCart}>
              <Text color="black" variant="body3Regular12">
                Add To Cart
              </Text>
            </TouchableOpacity>
          ) : null}
          <Text style={styles.txtCourse} color="black" variant="h3SemiBold18">
            Course Content
          </Text>

          <FlatList data={course?.topics} renderItem={renderListItem} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    height: '100%',
  },
  txtCourse: { alignSelf: 'center', marginVertical: 10 },
  courseDetailContainer: {
    paddingHorizontal: theme.spacing.appPadding,
    backgroundColor: theme.colors.appBackground,
  },
  courseDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  imgCove: { width: '100%', height: 150, resizeMode: 'cover' },
  courseContentContainer: {
    paddingHorizontal: theme.spacing.appPadding,
    backgroundColor: theme.colors.white,
  },
  btnAddToCart: {
    marginTop: 10,
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.yellow,
    width: 120,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTop: { flexDirection: 'row', alignItems: 'center' },
  txtTitle: { flex: 1, marginLeft: 10, paddingVertical: 10 },
  subListRoot: { marginLeft: 30, paddingVertical: 5, flexDirection: 'row', alignItems: 'center' },
  txtSubtitle: { marginLeft: 10 },
})

const mapStateToProps = (state) => {
  const { auth } = state.login
  const totalItems = state.cart.totalItems
  return { auth, totalItems }
}

const mapDispatchToProps = {
  addToCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetailScreen)
