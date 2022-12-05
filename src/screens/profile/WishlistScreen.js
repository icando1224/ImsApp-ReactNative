import React from 'react'
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Toolbar } from '../../components/Toolbar'
import { Text } from '../../components/Text'
import { theme } from '../../utils/Theme'
import { NavService } from '../../utils/NavService'
import { EStacks } from '../../navigation/AppRouts'
export const WishlistScreen = ({ navigation }) => {
  const ListData = [{ id: 1, title: 'UFWP Program 3.0', instructor: 'Cipher', price: '150' }]

  const onPressCourseDetail = (course) => {
    NavService.navigate(EStacks.COURSE_STACK)
  }

  const renderListItem = ({ item }) => (
    <Pressable onPress={() => onPressCourseDetail(item)} style={styles.listContainer}>
      <Image style={styles.image} source={require('../../assets/images/academy.png')} />
      <View style={styles.courseDetail}>
        <Text style={styles.txtUserInfo} color="black" variant="body2Regular14">
          {item.title}
        </Text>
        <View style={styles.instRow}>
          <Text style={styles.txtUserInfo} color="gray500" variant="body2Regular14">
            {item.instructor}
          </Text>
          <TouchableOpacity>
            <MaterialIcons name="delete-forever" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <View style={styles.priceContainer}>
          <TouchableOpacity>
            <Text style={styles.txtPrice} color="primary" variant="body1Regular16">
              Buy ${item.price}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  )

  return (
    <View>
      <Toolbar navigation={navigation} title="Wishlist" />
      <View style={styles.container}>
        <FlatList data={ListData} renderItem={renderListItem} />
      </View>
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
  instRow: { flexDirection: 'row', justifyContent: 'space-between', marginRight: 5 },
})
