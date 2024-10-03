import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.9; // Use 90% of the screen width for each item

const Carousel = ({ items }) => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  let scrollInterval;

  // Update the current index based on the scroll position
  const onScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / ITEM_WIDTH);
    setCurrentIndex(index);
  };

  useEffect(() => {
    // Auto slide every 3 seconds
    scrollInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      scrollViewRef.current.scrollTo({ x: ((currentIndex + 1) % items.length) * ITEM_WIDTH, animated: true });
    }, 3000);

    return () => {
      clearInterval(scrollInterval);
    };
  }, [currentIndex, items.length]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {items.map((item, index) => (
          <View key={index} style={styles.item}>
            <Image source={item} style={styles.image} resizeMode="cover" />
          </View>
        ))}
      </ScrollView>

      {/* Removed Pagination Dots */}
      {/* <View style={styles.pagination}>
        {items.map((_, index) => (
          <TouchableOpacity key={index} onPress={() => {
            setCurrentIndex(index);
            scrollViewRef.current.scrollTo({ x: index * ITEM_WIDTH, animated: true });
          }}>
            <View style={[styles.dot, { backgroundColor: currentIndex === index ? '#000' : '#ccc' }]} />
          </TouchableOpacity>
        ))}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    marginTop: 6, // Increased margin from the top
    marginHorizontal: 0, // Removed horizontal margin
  },
  scrollView: {
    width: '100%',
  },
  scrollViewContent: {
    alignItems: 'center', // Center items horizontally
  },
  item: {
    width: ITEM_WIDTH,
    height: '100%',
    overflow: 'hidden', // Prevent overflow
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
  },
});

export default Carousel;
