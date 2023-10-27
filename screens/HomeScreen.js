import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme';
import { StatusBar } from 'expo-status-bar';
import { categories, coffeeItems } from '../constants';
import Carousel from 'react-native-snap-carousel';
import CoffeeCard from '../components/coffeeCard';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { MapPinIcon } from 'react-native-heroicons/solid'
import LottieView from "lottie-react-native"

const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(1);
  const [activeCardIndex, setActiveCardIndex] = useState(0); // Nuevo estado para el índice de la tarjeta activa

  return (
    <View className="flex-1 relative bg-white">
      <StatusBar />

      <Image
        source={require('../assets/images/beansBackground1.png')}
        style={{ height: height * 0.2 }}
        className="w-full absolute -top-5 opacity-10"
      />
      <SafeAreaView className={ios ? '-mb-8' : ''}>
        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center">
          <Image source={require('../assets/images/avatar.png')}
            className="h-9 w-9 rounded-full" />

          <View className="flex-row items-center space-x-2">
          <LottieView source={require('../assets/lottiefiles/welcometitle.json')}
          autoPlay
          style={styles.lottie}
          />
          </View>
          <BellIcon size="27" color="black" />
        </View>
        {/* search bar */}
        <View className="mx-5 shadow" style={{ marginTop: height * 0.06 }}>
          <View className="flex-row items-center rounded-full p-1 bg-[#e6e6e6]">
            <TextInput placeholder='Search' className="p-4 flex-1 font-semibold text-gray-700" />
            <TouchableOpacity
              className="rounded-full p-2"
              style={{ backgroundColor: themeColors.bgLight }}>
              <MagnifyingGlassIcon size="25" strokeWidth={2} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* categories */}
        <View className="px-5 mt-6">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={item => item.id}
            className="overflow-visible"
            renderItem={({ item }) => {
              const isActive = item.id === activeCategory;
              let activeTextClass = isActive ? 'text-white' : 'text-gray-700';
              return (
                <TouchableOpacity
                  onPress={() => {
                    setActiveCategory(item.id);
                    const cardIndex = coffeeItems.findIndex(card => card.id === item.id);
                    if (cardIndex !== -1) {
                      setActiveCardIndex(cardIndex);
                    }
                  }}
                  style={{ backgroundColor: isActive ? themeColors.bgLight : 'rgba(0,0,0,0.07)' }}
                  className="p-4 px-5 mr-2 rounded-full shadow"
                >
                  <Text className={"font-semibold " + activeTextClass}>{item.title}</Text>
                </TouchableOpacity>
              )
            }}
          />
        </View>

      </SafeAreaView>

      {/* coffee cards */}
      <View className={`overflow-visible flex justify-center flex-1 ${ios ? 'mt-10' : ''}`}>
        <View>
          <Carousel
            containerCustomStyle={{ overflow: 'visible' }}
            data={coffeeItems}
            renderItem={({ item }) => <CoffeeCard item={item} />}
            firstItem={activeCardIndex} 
            loop={true}
            inactiveSlideScale={0.75}
            inactiveSlideOpacity={0.75}
            sliderWidth={width}
            itemWidth={width * 0.63}
            slideStyle={{ display: 'flex', alignItems: 'center' }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  lottie: {
    width: 70, 
    height: 35, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
});