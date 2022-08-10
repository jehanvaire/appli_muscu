import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';

// Import des composants
import Test from './test/index';

export default function App() {
  return (
    <View style={styles.container}>
      <Test />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
