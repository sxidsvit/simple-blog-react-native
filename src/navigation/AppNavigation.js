import * as React from 'react'
import { Platform, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'
import { MainScreen } from '../screens/MainScreen'
import { PostScreen } from '../screens/PostScreen'
import { AboutScreen } from '../screens/AboutScreen'
import { CreateScreen } from '../screens/CreateScreen'
import { BookedScreen } from '../screens/BookedScreen'
import { THEME } from '../theme'


const navigatorTopBarOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
  },
  headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR
}

//  ----------------------------------

const AllPosts = createStackNavigator()

const AllPostsNavigator = () => (
  <AllPosts.Navigator
    initialRouteName='MainScreen'
    screenOptions={navigatorTopBarOptions}
  >
    <AllPosts.Screen
      name="MainScreen"
      component={MainScreen}
      options={{
        title: 'Мой блог',
      }} />
    <AllPosts.Screen
      name="PostScreen"
      component={PostScreen}
      options={({ route }) => ({
        title: 'Пост от ' + new Date(route.params.date).toLocaleDateString(),
        headerStyle: { backgroundColor: THEME.MAIN_COLOR },
        headerTintColor: '#fff'
      })}
    />
  </AllPosts.Navigator>
)

//  ----------------------------------

const BookedPosts = createStackNavigator()

const BookedPostsNavigator = () => (
  <BookedPosts.Navigator
    initialRouteName='BookedScreen'
    screenOptions={navigatorTopBarOptions}
  >
    <BookedPosts.Screen
      name="BookedScreen" component={BookedScreen}
      options={{
        title: 'Избранное',
      }} />
    <BookedPosts.Screen
      name="PostScreen" component={PostScreen}
      options={({ route }) => ({
        title: 'Пост от ' + new Date(route.params.date).toLocaleDateString(),
        headerStyle: { backgroundColor: 'red' },
        headerTintColor: '#fff'
      })}
    />
  </BookedPosts.Navigator>
)

const Tab = Platform.OS === 'android'
  ? createMaterialBottomTabNavigator() : createBottomTabNavigator()

const tabBarNavigatorOptions = Platform.OS === 'android'
  ? ({
    activeTintColor: '#fff', shifting: true,
    barStyle: {
      backgroundColor: THEME.MAIN_COLOR
    }
  }) : ({ activeTintColor: THEME.MAIN_COLOR })

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={tabBarNavigatorOptions}
      barStyle={{ backgroundColor: THEME.MAIN_COLOR }}>
      <Tab.Screen name="AllPostsNavigator" component={AllPostsNavigator}
        options={{
          tabBarLabel: 'Все',
          tabBarIcon: ({ color }) => (
            <Ionicons name='ios-albums' size={20} color={color} />
          )
        }}
      />
      <Tab.Screen name="BookedPostsNavigator" component={BookedPostsNavigator}
        options={{
          tabBarLabel: 'Избранное',
          tabBarIcon: ({ color }) => (
            <Ionicons name='ios-star' size={20} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

//  ----------------------------------

const About = createStackNavigator()

const AboutNavigator = () => (
  <About.Navigator
    initialRouteName='AboutScreen'
    screenOptions={navigatorTopBarOptions}
  >
    <About.Screen name="AboutScreen" component={AboutScreen} />
  </About.Navigator>
)

const Create = createStackNavigator()

const CreateNavigator = () => (
  <Create.Navigator
    initialRouteName='CreateScreen'
    screenOptions={navigatorTopBarOptions}
  >
    <Create.Screen name="CreateScreen" component={CreateScreen} />
  </Create.Navigator>
)

const Drawer = createDrawerNavigator()

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: THEME.MAIN_COLOR,
          labelStyle: { fontFamily: 'vollkorn-bold' }
        }}
        drawerType='back'
        drawerStyle={{ width: '50%' }}>
        <Drawer.Screen name='Posts' component={BottomNavigator}
          options={{ title: 'Главная' }} />
        <Drawer.Screen name='About' component={AboutNavigator}
          options={{ title: 'О приложении' }}
        />
        <Drawer.Screen name='Create' component={CreateNavigator}
          options={{ title: 'Новый пост' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
