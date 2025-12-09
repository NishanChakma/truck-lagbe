import React, { useEffect, useState, useCallback, memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { toBengaliDigits } from '../../hooks/toBengaliDigit';
import { driversProfileData } from '../../utils/dummyData';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setCurrentDriverInfo } from '../../store/slices/rootSlice';

// Memoized Item Component
interface DriverItemProps {
  item: (typeof driversProfileData)[0];
  drag: () => void;
  isActive: boolean;
  handlePresentModalPress: () => void;
}

const DriverItem = memo(
  ({ item, drag, isActive, handlePresentModalPress }: DriverItemProps) => {
    const dispatch = useDispatch();
    const cardStyle = [styles.card, isActive && styles.cardActive];

    return (
      <TouchableOpacity
        onLongPress={drag}
        disabled={isActive}
        style={cardStyle}
        onPress={() => {
          handlePresentModalPress();
          dispatch(setCurrentDriverInfo(item));
        }}
      >
        <Image source={item.image} style={styles.img} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={[styles.text, styles.sizeText]}>{item.size}</Text>

          <View style={styles.rating}>
            <Image
              source={require('../../assets/icons/rating.png')}
              style={styles.ratingIcon}
            />
            <Text style={styles.text}>
              রেটিং {toBengaliDigits(item.rating.toString())}
            </Text>
            <Image
              source={require('../../assets/icons/rightArr.png')}
              style={styles.rightArr}
            />
            {item.tracking && (
              <>
                <Image
                  source={require('../../assets/icons/gps.png')}
                  style={styles.gps}
                />
                <Text style={styles.text}>জিপিএস</Text>
              </>
            )}
          </View>

          {item.favorite && (
            <View style={[styles.rating, styles.favorite]}>
              <Image
                source={require('../../assets/icons/heart.png')}
                style={styles.heart}
              />
              <Text style={styles.text}>আপনার পছন্দের ড্রাইভার</Text>
            </View>
          )}
        </View>

        <View style={styles.rightContainer}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/icons/checkbox.png')}
              style={styles.checkbox}
            />
          </TouchableOpacity>
          <Text style={styles.price}>
            ৳{toBengaliDigits(item.price.toString())}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },
);

interface DriverCardProps {
  handlePresentModalPress: () => void;
}

const DriverCard: React.FC<DriverCardProps> = ({ handlePresentModalPress }) => {
  const resetSignal = useSelector((state: RootState) => state.main.resetSignal);
  const [data, setData] = useState(driversProfileData);

  // Reset data when signal changes
  useEffect(() => {
    setData(driversProfileData);
  }, [resetSignal]);

  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<(typeof data)[0]>) => {
      return (
        <DriverItem
          item={item}
          drag={drag}
          isActive={isActive}
          handlePresentModalPress={handlePresentModalPress}
        />
      );
    },
    [handlePresentModalPress],
  );

  const handleDragEnd = useCallback(
    ({ data }: { data: typeof driversProfileData }) => setData(data),
    [],
  );

  return (
    <DraggableFlatList
      data={data}
      onDragEnd={handleDragEnd}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      bounces={false}
    />
  );
};

export default DriverCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  cardActive: {
    backgroundColor: '#f0f0f0',
  },
  img: {
    width: 51,
    height: 51,
    borderRadius: 25,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  favorite: {
    backgroundColor: '#FFEAEA',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  name: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
  text: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000',
  },
  sizeText: {
    paddingTop: 3,
    paddingBottom: 5,
  },
  ratingIcon: { height: 14, width: 14 },
  rightArr: { height: 8.33, width: 5.05, marginRight: 5 },
  gps: { height: 18, width: 18 },
  heart: { height: 8, width: 10 },
  rightContainer: { marginLeft: 'auto', alignItems: 'flex-end' },
  checkbox: { height: 24, width: 24 },
  price: { fontSize: 18, fontWeight: '700', color: '#000' },
});
