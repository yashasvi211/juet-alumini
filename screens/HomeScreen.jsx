import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import CustomCarousel from '../components/Carousel';


const HomeScreen = () => {
  const carouselItems = [
    require('../assets/carousel_img/1.png'),
    require('../assets/carousel_img/2.png'),
    require('../assets/carousel_img/3.png'),
 
  ];

  return (
    <View style={styles.container}>
       
       
      <CustomCarousel items={carouselItems} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  searchBar: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10, // Adjust margin to reduce space
    marginHorizontal: 10, // Ensure proper side margins
  },
});

export default HomeScreen;
