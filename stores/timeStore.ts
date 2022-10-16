import AsyncStorage from '@react-native-async-storage/async-storage';

export default class TimeStore {
  constructor() {}

  public async storeTime(time: number) {
    // Store the time in the async storage
    await AsyncStorage.setItem('time', time.toString());
  }

  public async getCurrentTime(): Promise<number> {
    // Get the time from the async storage
    const time = await AsyncStorage.getItem('time');
    if (time) {
      return parseInt(time);
    } else {
      return -1;
    }
  }

  public async deleteTime() {
    // Delete the time from the async storage
    await AsyncStorage.removeItem('time');
  }
}
