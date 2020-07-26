
import * as Font from 'expo-font'
import { DB } from './db'

export async function bootstrap() {
  try {
    await Font.loadAsync({
      'vollkorn-bold': require('../assets/fonts/Vollkorn-Bold.ttf'),
      'vollkorn-regular': require('../assets/fonts/Vollkorn-Regular.ttf'),
    })
    await DB.init()
    console.log('Database started ...')
  } catch (e) {
    console.log('DB error: ', e);
  }
}