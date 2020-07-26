import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { AppLoading } from 'expo'
import { Provider } from 'react-redux'
import { bootstrap } from './src/bootstrap'
import { AppNavigation } from './src/navigation/AppNavigation'
import store from './src/store/index'

export default function App() {
  const [isReady, setIsReady] = useState(false)

  if (!isReady) {
    return <AppLoading
      startAsync={bootstrap}
      onFinish={() => setIsReady(true)}
      onError={error => console.log(error)}
    />
  }

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  )
} 
