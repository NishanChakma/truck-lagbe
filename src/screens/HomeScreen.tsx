import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useRef } from 'react';
import Header from '../components/header';
import DriverCard from '../components/driverCards';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const FullScreenBottomSheet = React.lazy(
  () => import('../components/ratingAndReviews'),
);

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  return (
    <View style={styles.content}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.headerText}>বিডিং চলছে</Text>
        <DriverCard handlePresentModalPress={handlePresentModalPress} />
      </View>
      <View style={styles.bottomContainer}>
        <Image
          source={require('../assets/banner.png')}
          style={{ height: 100, width: width }}
        />
      </View>
      <FullScreenBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        closeModal={closeModal}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 20,
  },
  bottomContainer: { position: 'absolute', bottom: 0, width: '100%' },
});
