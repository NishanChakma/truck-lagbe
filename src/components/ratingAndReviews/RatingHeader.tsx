import React, { useCallback } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageSourcePropType,
} from 'react-native';
import { toBengaliDigits } from '../../hooks/toBengaliDigit';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface RatingHeaderProps {
  closeIcon?: ImageSourcePropType;
  closeModal: () => void;
}

interface DriverInfo {
  name?: string;
  totalTrip?: number;
}

const RatingHeader: React.FC<RatingHeaderProps> = ({
  closeIcon = require('../../assets/icons/close.png'),
  closeModal,
}) => {
  const currentDriverInfo = useSelector(
    (state: RootState) =>
      state.main.currentDriverInfo as DriverInfo | undefined,
  );

  const goBack = useCallback(() => {
    closeModal();
  }, []);

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>ড্রাইভার রেটিং & রিভিউ</Text>
        <Text style={styles.des}>
          {currentDriverInfo?.name} | টোটাল ট্রিপঃ{' '}
          {toBengaliDigits(currentDriverInfo?.totalTrip?.toString() ?? '')}
        </Text>
      </View>
      <TouchableOpacity
        onPress={goBack}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Image source={closeIcon} style={styles.closeIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default RatingHeader;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',

    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    // Android Shadow
    elevation: 3,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  des: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
  },
  closeIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
});
