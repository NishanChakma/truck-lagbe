import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ProgressBar from '../../hooks/ProgressBar';
import { ratingData } from '../../utils/dummyData';
import { toBengaliDigits } from '../../hooks/toBengaliDigit';

type RatingItem = {
  star: number;
  percentage: number;
};

type RatingRowProps = {
  item: RatingItem;
  isLast: boolean;
};

// 🔥 Row Component
const RatingRowComponent: React.FC<RatingRowProps> = ({ item, isLast }) => {
  return (
    <View
      style={[
        styles.row,
        { marginBottom: isLast ? 0 : 2, alignSelf: 'flex-end' },
      ]}
    >
      <Text style={styles.ratingDes}>
        {toBengaliDigits(item.star.toString())}
      </Text>
      <Image
        source={require('../../assets/icons/rating.png')}
        style={styles.ratingIcon}
      />
      <ProgressBar progress={item.percentage} height={4} fillColor="#B00000" />
      <Text
        style={[
          styles.ratingDes,
          { paddingLeft: item.percentage > 9 ? 0 : 4.5 },
        ]}
      >
        {toBengaliDigits(item.percentage.toString())}%
      </Text>
    </View>
  );
};

// Memoized for performance
const RatingRow = React.memo(
  RatingRowComponent,
  (prev, next) =>
    prev.item.star === next.item.star &&
    prev.item.percentage === next.item.percentage &&
    prev.isLast === next.isLast,
);

// 🔥 Main Rating Component
const RatingView: React.FC = () => {
  const { count, data } = ratingData;

  return (
    <View style={styles.container}>
      {/* Left Box */}
      <View style={styles.leftBox}>
        <View style={styles.scoreRow}>
          <Image
            source={require('../../assets/icons/starRound.png')}
            style={styles.starRound}
          />
          <Text style={styles.ratingScore}>৫.০</Text>
        </View>
        <Text style={styles.ratingText}>
          ({toBengaliDigits(count.toString())} রেটিং)
        </Text>
      </View>

      {/* Right Box */}
      <View style={styles.rightBox}>
        {data.map((item, index) => (
          <RatingRow
            key={String(index)}
            item={item}
            isLast={index === data.length - 1}
          />
        ))}
      </View>
    </View>
  );
};

export default RatingView;

// 🔥 Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginBottom: 15,
    marginTop: 5,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fbf2f2',
  },

  leftBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  rightBox: {
    width: '50%',
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  ratingScore: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },

  ratingText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000',
  },

  starRound: {
    height: 20,
    width: 20,
  },

  ratingIcon: {
    height: 20,
    width: 20,
  },

  ratingDes: {
    fontSize: 10,
    fontWeight: '400',
    color: '#000',
  },
});
