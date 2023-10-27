
import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Dimensions, Image } from 'react-native';
import { themeColors } from '../theme';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { Home } from 'react-native-feather';
import HomeScreen from './HomeScreen';
import LoadingScreen from './LoadingScreen';
import LottieView from "lottie-react-native"
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const goToLoadingScreen = () => {
    navigation.push('Loading');
  };

  return (
    <View className="flex-1 relative" style={styles.container}>
      <Text style={styles.text}>¡Coffee Urban!</Text>
      <Image
        source={require('../assets/images/beansBackground1.png')}
        style={{ height: height * 1 }}
        className="w-full absolute opacity-10"
      />
      <LottieView source={require('../assets/lottiefiles/welcomeCoffeeAnimation.json')}
      autoPlay
      style={styles.lottie}
      />
      <TouchableOpacity onPress={(goToLoadingScreen)}>
        <Text style={styles.textButton}>Go to Shop</Text>
      </TouchableOpacity>    
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  text: {
    color: '#6b4c31',
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: -50,
  },
  lottie: {
    width: 400, 
    height: 400, 
  },
  textButton: {
    marginTop: -50,
    fontSize: 20,
    color: 'white',
    padding: 10,
    backgroundColor: '#6b4c31',
    borderRadius: 5,
  },
});
