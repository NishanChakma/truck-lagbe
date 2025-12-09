import React, { useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import CountDown from '../../hooks/CountDown';
import type { RootState } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { resetAll } from '../../store/slices/rootSlice';

const Header: React.FC = () => {
  const resetSignal = useSelector((state: RootState) => state.main.resetSignal);
  const dispatch = useDispatch();

  const resetCountDown = useCallback(() => {
    dispatch(resetAll());
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={resetCountDown}>
        <Image
          source={require('../../assets/icons/back.png')}
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <CountDown countDown={21} resetSignal={resetSignal} />
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 20,
  },
  icon: {
    width: 40,
    height: 40,
  },
});
