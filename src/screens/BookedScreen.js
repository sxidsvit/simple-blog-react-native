import React from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { PostList } from '../components/PostList'

export const BookedScreen = ({ navigation }) => {

  const openPostHandler = post => {
    navigation.navigate('PostScreen',
      { postId: post.id, date: post.date, booked: post.booked })
  }

  navigation.setOptions({
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title='Toggle Drawer'
          iconName='ios-menu'
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  })

  const bookedPosts = useSelector(state => state.post.bookedPosts)

  return <PostList data={bookedPosts} onOpen={openPostHandler} />
}
