import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, Platform, ScrollView, Button, Modal, Pressable, Alert } from 'react-native';


import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftCircleIcon, MinusIcon, PlusIcon } from 'react-native-heroicons/outline';
import { HeartIcon, StarIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { ShoppingBag } from 'react-native-feather';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';

export default function ProductScreen(props) {
  const item = props.route.params;
  const [size, setSize] = useState('small');
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const calculateTotal = () => {
    return (parseFloat(item.price) * quantity).toFixed(2);
  };

  const addToCart = () => {
    // Simulación de agregar el producto al carrito
    const productData = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: quantity,
      size: size,
      image: item.image,
    };
  
    // Muestra un mensaje de éxito en un alert
    Alert.alert('Éxito', 'Producto Agregado al Carrito', [
      { text: 'OK', onPress: () => {
        setShowSuccessMessage(true);
        navigation.navigate('CarritoScreen', { productData });
      }}
    ]);
  };
  
  const navigateToCartScreen = (productData) => {
    const navigation = useNavigation();
    navigation.navigate('CarritoScreen', { productData });
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Image
        source={require('../assets/images/beansBackground2.png')}
        style={{ height: 300, borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}
        className="w-full absolute"
      />
      <SafeAreaView className="space-y-4 flex-1">
        <View className="mx-4 flex-row justify-between items-center">
          <TouchableOpacity className="rounded-full " onPress={() => navigation.goBack()}>
            <ArrowLeftCircleIcon size={50} strokeWidth={1.2} color="white" />
          </TouchableOpacity>

          <TouchableOpacity className="rounded-full border-2 border-white p-2">
            <HeartIcon size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            shadowColor: themeColors.bgDark,
            shadowRadius: 30,
            shadowOffset: { width: 0, height: 30 },
            shadowOpacity: 0.9,
          }}
          className="flex-row justify-center">
          <Image source={item.image} className="h-60 w-60" style={{ marginTop: ios ? 0 : 40 }} />
        </View>

        <View
          style={{ backgroundColor: themeColors.bgLight }}
          className="flex-row justify-center items-center mx-4 rounded-3xl p-1 px-2 space-x-1 opacity-90 w-16">
          <StarIcon size={15} color="white" />
          <Text className="text-base font-semibold text-white">{item.stars}</Text>
        </View>

        <View className="px-4 flex-row justify-between items-center">
          <Text style={{ color: themeColors.text }} className="text-3xl font-semibold">
            {item.name}
          </Text>
          <Text style={{ color: themeColors.text }} className="text-lg font-semibold">
            $ {item.price}
          </Text>
        </View>

        <View className="px-4 space-y-2">
          <Text style={{ color: themeColors.text }} className="text-lg font-bold">
            Tamaños
          </Text>
          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={() => setSize('small')}
              style={{ backgroundColor: size === 'small' ? themeColors.bgLight : 'rgba(0,0,0,0.07)' }}
              className="p-3 px-8 rounded-full">
              <Text className={size === 'small' ? 'text-white' : 'text-gray-700'}>Small</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSize('medium')}
              style={{ backgroundColor: size === 'medium' ? themeColors.bgLight : 'rgba(0,0,0,0.07)' }}
              className="p-3 px-8 rounded-full">
              <Text className={size === 'medium' ? 'text-white' : 'text-gray-700'}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSize('large')}
              style={{ backgroundColor: size === 'large' ? themeColors.bgLight : 'rgba(0,0,0,0.07)' }}
              className="p-3 px-8 rounded-full">
              <Text className={size === 'large' ? 'text-white' : 'text-gray-700'}>Large</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-4 space-y-2">
          <Text style={{ color: themeColors.text }} className="text-lg font-bold">
            Acerca de nuestro producto
          </Text>
          <Text className="text-gray-600">{item.desc}</Text>
        </View>

        <View className="px-4 space-y-2">
          <Text style={{ color: themeColors.text }} className="text-lg font-bold">
            Precio Total
          </Text>
          <Text className="text-black">$ {calculateTotal()}</Text>
        </View>
      </SafeAreaView>

      <View className={`space-y-3 ${ios ? 'mb-6' : 'mb-3'}`}>
        <View className="flex-row justify-between items-center px-4 mb-2">
          <View className="flex-row items-center space-x-1">
            <Text className="text-base text-gray-700 font-semibold opacity-60">Volume</Text>
            <Text className="text-base text-black font-semibold"> {item.volume}</Text>
          </View>
          <View className="flex-row items-center space-x-4 border-gray-500 border rounded-full p-1 px-4">
            <TouchableOpacity onPress={decreaseQuantity}>
              <MinusIcon size={20} strokeWidth={3} color={themeColors.text} />
            </TouchableOpacity>
            <Text style={{ color: themeColors.text }} className="font-extrabold text-lg">
              {quantity}
            </Text>
            <TouchableOpacity onPress={increaseQuantity}>
              <PlusIcon size={20} strokeWidth={3} color={themeColors.text} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row justify-between px-4">
          <Text style={{ color: themeColors.text }} className="text-base font-semibold">
            Total:
          </Text>
          <Text style={{ color: themeColors.text }} className="text-base font-semibold">
            $ {calculateTotal()}
          </Text>
        </View>

        <Button
          title="Agregar al carrito"
          color={themeColors.bgDark}
          onPress={addToCart} // Cambia showSuccessAlert a addToCart
        />
        {/* Muestra el mensaje de éxito si showSuccessMessage es true */}
        {showSuccessMessage && (
          <Text style={{ color: 'green', fontSize: 20, textAlign: 'center', marginTop: 10 }}>
            Producto Agregado al Carrito
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
