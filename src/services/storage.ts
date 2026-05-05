import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY = 'RISE_DATA'

export const saveData = async (data: any) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(data))
  } catch (e) {
    console.log('Save error', e)
  }
}

export const loadData = async () => {
  try {
    const json = await AsyncStorage.getItem(KEY)
    return json != null ? JSON.parse(json) : null
  } catch (e) {
    console.log('Load error', e)
    return null
  }
}