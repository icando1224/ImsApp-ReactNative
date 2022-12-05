import React from 'react'
import { View } from 'react-native'
import { NavService } from '../../utils/NavService'
import { Toolbar } from '../../components/Toolbar'

export const SearchScreen = () => {
  const navigation = NavService.getNavRef()

  return (
    <View>
      <Toolbar navigation={navigation.current} title="Search Course" />
    </View>
  )
}
