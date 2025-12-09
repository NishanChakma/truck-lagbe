import React, { FC, memo, useCallback } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageSourcePropType,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setCurrentNav } from '../../store/slices/rootSlice';
import { toBengaliDigits } from '../../hooks/toBengaliDigit';

type TabItem = 'সব' | '5' | '4' | '3' | '2' | '1';

const TAB_LIST: TabItem[] = ['সব', '5', '4', '3', '2', '1'];

const STAR_WHITE: ImageSourcePropType = require('../../assets/icons/StarWhite.png');
const STAR_ASH: ImageSourcePropType = require('../../assets/icons/starAsh.png');

const TabView: FC = () => {
  const dispatch = useDispatch();
  const currentNav = useSelector((state: RootState) => state.main.currentNav);

  const handlePress = useCallback(
    (item: TabItem) => {
      dispatch(setCurrentNav(item));
    },
    [dispatch],
  );

  return (
    <View style={styles.container}>
      {TAB_LIST.map((item, index) => {
        const isActive = item === currentNav;

        return (
          <TouchableOpacity
            key={item}
            activeOpacity={0.8}
            onPress={() => handlePress(item)}
          >
            <View style={[styles.tabItem, isActive && styles.tabItemActive]}>
              <Text style={[styles.text, isActive && styles.textActive]}>
                {toBengaliDigits(item)}
              </Text>

              {index !== 0 && (
                <Image
                  source={isActive ? STAR_WHITE : STAR_ASH}
                  style={styles.icon}
                />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default memo(TabView);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    backgroundColor: '#fff',
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    overflow: 'hidden',
    flexWrap: 'wrap',
  },

  tabItem: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minHeight: 24,
    minWidth: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },

  tabItemActive: {
    backgroundColor: '#B00000',
    borderColor: '#B00000',
  },

  text: {
    color: '#000',
    fontWeight: '600',
    fontSize: 12,
  },

  textActive: {
    color: '#fff',
  },

  icon: {
    height: 12,
    width: 12,
    marginLeft: 4,
  },
});
