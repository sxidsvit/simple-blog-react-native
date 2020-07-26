import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'

export const AboutScreen = ({ navigation }) => {

  navigation.setOptions({
    title: 'О приложении',
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

  return (
    <View style={styles.center}>
      <Text style={styles.text}>Приложение для создания личных заметок.</Text>
      <Text style={styles.text}>
        Текущая версия - <Text style={styles.version}>1.3.7</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '8%',
  },
  version: {
    fontFamily: 'vollkorn-bold'
  },
  text: {
    textAlign: 'center'
  }
})