import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, StyleSheet, Image, Button, ScrollView, Alert } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { THEME } from '../theme'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { toggleBooked, removePost } from '../store/actions/post'

export const PostScreen = ({ route, navigation }) => {

  const { postId } = route.params
  const post = useSelector(state => state.post.allPosts.find(p => p.id === postId))

  const removeHandler = () => {
    Alert.alert(
      'Удаление поста',
      'Вы уверены, что хотите удалить пост?',
      [
        {
          text: 'Отменить',
          style: 'cancel'
        },
        {
          text: 'Удалить', style: 'destructive',
          onPress: () => {
            dispatch(removePost(postId))
            navigation.navigate('MainScreen')
          }
        }
      ],
      { cancelable: false }
    )
  }

  const dispatch = useDispatch()

  // const toggleHandler = () => { dispatch(toggleBooked(post)) }

  const toggleHandler = useCallback(() => {
    dispatch(toggleBooked(post))
  }, [dispatch, post])

  const booked = useSelector(
    state => state.post.bookedPosts.some(post => post.id === postId)
  )

  useEffect(() => {
    navigation.setParams({ booked })
  }, [booked])

  const iconName = route.params.booked ? 'ios-star' : 'ios-star-outline'

  navigation.setOptions({
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title='Take photo'
          iconName={iconName}
          onPress={toggleHandler}
        />
      </HeaderButtons>
    )
  })

  if (!post) {
    return (
      <View style={styles.textWrap}>
        <Text style={styles.text}>Пост был удалён</Text>
      </View>
    )
  }

  return (
    <ScrollView >
      <Image source={{ uri: post.img }} style={styles.image} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button
        title='Удалить'
        color={THEME.DANGER_COLOR}
        onPress={removeHandler}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  textWrap: {
    padding: 10
  },
  title: {
    fontFamily: 'vollkorn-regular'
  },
  text: {
    fontFamily: 'vollkorn-bold',
    textAlign: 'center',
    paddingTop: 50
  }
})