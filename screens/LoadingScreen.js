import React, {useEffect} from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, Image } from 'react-native';
import LottieView from "lottie-react-native"
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const LoadingScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
      // Simula una carga (puedes ajustar el tiempo)
      setTimeout(() => {
        navigation.replace('Home'); // Reemplaza la pantalla de carga con ScreenB
      }, 3000); // 3000 milisegundos (3 segundos) en este ejemplo
    }, []);

  return (
    <View className="flex-1 relative" style={styles.container}>
      <Image
        source={require('../assets/images/beansBackground1.png')}
        style={{ height: height * 1 }}
        className="w-full absolute opacity-10"
      />
      <LottieView source={require('../assets/lottiefiles/loadingcoffee2.json')}
      autoPlay
      style={styles.lottie}
      />   
      </View>
  );
};

export default LoadingScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center',
    },
    lottie: {
      width: 400, 
      height: 400, 
    },
  });