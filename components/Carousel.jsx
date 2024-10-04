import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width; // Each item takes full screen width

const Carousel = ({ items = [] }) => { // Add default value for items
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = items.length; // Get the total number of items

  // Update the current index based on the scroll position
  const onScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / ITEM_WIDTH);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (totalItems === 0) return; // Prevent auto-scroll when there are no items

    // Auto slide every 3 seconds
    const scrollInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % totalItems; // Cycle back to 0
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: nextIndex * ITEM_WIDTH, animated: true });
        }
        return nextIndex; // Return the updated index
      });
    }, 3000);

    return () => {
      clearInterval(scrollInterval); // Cleanup on unmount
    };
  }, [totalItems]);

  if (items.length === 0) {
    return null; // Return null if there are no items to display
  }

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
        nestedScrollEnabled={true} // Enable nested scrolling
      >
        {items.map((item, index) => (
          <View key={index} style={styles.item}>
            <Image source={item} style={styles.image} resizeMode="contain" />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    marginTop: -12,
    marginHorizontal: 0,
  },
  scrollView: {
    width: '100%',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  item: {
    width: ITEM_WIDTH,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Carousel;
