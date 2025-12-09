import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

type VerticalRatingProps = {
  rating: number; // 0 to 5
};

const VerticalRating: React.FC<VerticalRatingProps> = ({ rating }) => {
  // Array of 5 elements to render stars
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      {stars.map(star => (
        <Image
          key={star}
          source={
            star <= rating
              ? require('../assets/icons/star.png') // Filled star image
              : require('../assets/icons/starAsh.png') // Ash star image
          }
          style={styles.star}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    width: 14,
    height: 14,
    marginVertical: 2,
  },
});

export default VerticalRating;
