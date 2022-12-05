import { createDrawerNavigator } from '@react-navigation/drawer'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import MyCoursesScreen from '../screens/drawer/MyCoursesScreen'
import StoreScreen from '../screens/drawer/StoreScreen'
import { AboutUsScreen } from '../screens/drawer/AboutUsScreen'
import { BookmarksScreen } from '../screens/drawer/BookmarksScreen'
import HelpScreen from '../screens/drawer/HelpScreen'
import { theme } from '../utils/Theme'
import { EDrawer } from './AppRouts'
import CustomSidebarMenu from './CustomSidebarMenu'
const Drawer = createDrawerNavigator()

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName={EDrawer.MY_COURSES}
      backBehavior="none"
      screenOptions={{
        backBehavior: 'none',
        drawerActiveTintColor: theme.colors.black,
        drawerActiveBackgroundColor: theme.colors.green_300,
        drawerInactiveTintColor: theme.colors.primary,
        headerShown: false,
      }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name={EDrawer.STORE}
        component={StoreScreen}
        options={{
          groupName: '1',
          drawerLabel: 'Store',
          drawerIcon: ({ color, size }) => <MaterialIcons name="cases" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name={EDrawer.MY_COURSES}
        component={MyCoursesScreen}
        options={{
          groupName: 'My Library',
          drawerLabel: 'My Courses',
          drawerIcon: ({ color, size }) => <Ionicons name="documents-sharp" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name={EDrawer.BOOKMARKS}
        component={BookmarksScreen}
        options={{
          groupName: 'My Library',
          drawerLabel: 'My Bookmarks',
          drawerIcon: ({ color, size }) => <Ionicons name="bookmarks-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name={EDrawer.HELP}
        component={HelpScreen}
        options={{
          groupName: 'My Library',
          drawerLabel: 'Help & Support',
          drawerIcon: ({ color, size }) => <Ionicons name="help-circle-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name={EDrawer.ABOUT_US}
        component={AboutUsScreen}
        options={{
          groupName: 'My Library',
          drawerLabel: 'About Us',
          drawerIcon: ({ color, size }) => <MaterialIcons name="group" size={size} color={color} />,
        }}
      />
    </Drawer.Navigator>
  )
}
