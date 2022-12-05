import React from 'react'
import { View, StyleSheet, FlatList, Pressable } from 'react-native'
import { Toolbar } from '../../components/Toolbar'
import { Text } from '../../components/Text'
import { theme } from '../../utils/Theme'
export const PurchaseHistoryScreen = ({ navigation }) => {
  const ListData = [
    { id: 1, title: 'UFWP Program 3.0', instructor: 'Cipher', date: '12-10-2020', price: '150' },
    { id: 2, title: 'Software Development', instructor: 'Dominic Toretto', date: '20-2-2021', price: '120' },
  ]

  const renderListItem = ({ item }) => (
    <Pressable style={styles.listContainer}>
      <View style={styles.courseDetail}>
        <Text style={styles.txtUserInfo} color="black" variant="body2Regular14">
          {item.title}
        </Text>
        <Text style={styles.txtUserInfo} color="gray500" variant="body2Regular14">
          {item.date}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.txtPrice} color="primary" variant="body1Regular16">
            ${item.price}
          </Text>
        </View>
      </View>
    </Pressable>
  )
  return (
    <View>
      <Toolbar navigation={navigation} title="Purchase History" />
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
  courseDetail: { marginLeft: 10, flex: 1, height: '100%' },
  priceContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  txtPrice: { marginRight: 10, marginBottom: 5 },
})
