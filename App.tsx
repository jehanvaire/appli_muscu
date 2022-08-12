import { View, StyleSheet } from 'react-native';

// Import des composants
import Menu from './pages/index';

export default function App() {
  return (
    <View style={styles.global}>
      <Menu />
    </View>
  );
}

const styles = StyleSheet.create({
  global : {
    height: '100%',
    backgroundColor: '#181818',
    color: '#FFFFFF'
  }
})
