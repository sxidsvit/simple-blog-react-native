import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Button
} from 'react-native'
import { useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { TextInput } from 'react-native-paper'
import { THEME } from '../theme'
import { addPost } from '../store/actions/post'
import { PhotoPicker } from '../components/PhotoPicker'

export const CreateScreen = ({ navigation }) => {

  navigation.setOptions({
    title: 'Новый пост',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title='Toggle Drawer'
          iconName='ios-menu'
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
  })

  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const saveHandler = () => {
    const post = {
      date: new Date().toJSON(),
      text: text,
      img: imgRef.current,
      booked: false
    }
    dispatch(addPost(post))
    setText('')
    navigation.navigate('MainScreen')
  }

  const imgRef = useRef()

  const photoPickHandler = uri => {
    imgRef.current = uri
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Ваш новый пост</Text>
          <TextInput
            style={styles.textarea}
            placeholder='Введите текст вашего поста'
            value={text}
            onChangeText={text => setText(text)}
            multiline
          />
          <PhotoPicker onPick={photoPickHandler} />
          <Button
            title='Создать пост'
            color={THEME.MAIN_COLOR}
            onPress={saveHandler}
            disabled={!text}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'vollkorn-regular',
    marginVertical: 15
  },
  textarea: {
    padding: 10,
    marginBottom: 10
  }
})