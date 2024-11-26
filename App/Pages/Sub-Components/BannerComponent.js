import React, { useRef, useState } from 'react';
import { 
  View, 
  Image, 
  StyleSheet, 
  Dimensions, 
  FlatList,
  Animated 
} from 'react-native';

const { width } = Dimensions.get('window');

const BannerCarousel = () => {
  const bannerImages = [
    require('../../Assets/Images/banner-homepage.png'),
    require('../../Assets/Images/banner-homepage2.png'),
    require('../../Assets/Images/banner-homepage3.png'),
  ];

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    const autoScroll = setInterval(() => {
      const nextIndex = (currentIndex + 1) % bannerImages.length;
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: nextIndex,
          animated: true
        });
        setCurrentIndex(nextIndex);
      }
    }, 3000);

    return () => clearInterval(autoScroll);
  }, [currentIndex, bannerImages.length]);

  const renderBannerItem = ({ item }) => (
    <View style={styles.bannerContainer}>
      <Image
        source={item}
        style={styles.bannerImage}
        resizeMode="cover"
      />
    </View>
  );


  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {bannerImages.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width
          ];
          
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
          });

          return (
            <Animated.View
              key={index}
              style={[styles.paginationDot, { 
                opacity,
                backgroundColor: index === currentIndex ? '#007bff' : '#333'
              }]}
            />
          );
        })}
      </View>
    );
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={bannerImages}
        renderItem={renderBannerItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50
        }}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      {renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  bannerContainer: {
    width: width,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: 200,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  }
});

export default BannerCarousel;