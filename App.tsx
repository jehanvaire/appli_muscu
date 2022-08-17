import { View, StyleSheet, ImageBackground } from 'react-native';

// Import des composants
import Menu from './pages/index';

export default function App() {
  return (
    <View style={styles.global}>
      <ImageBackground
        source={require('./assets/main_bg.jpg')}
        resizeMode="cover"
        style={{
          height: '100%',
          width: '100%',
          flex: 1,
          justifyContent: 'center'
        }}>
        <Menu />
      </ImageBackground>
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
