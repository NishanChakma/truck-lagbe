import React, { useCallback, useState, memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setSortingOrder } from '../../store/slices/rootSlice';
import { reviewData } from '../../utils/dummyData';
import TabView from './TabView';
import { toBengaliDigits } from '../../hooks/toBengaliDigit';

type SortOption = {
  label: string;
  value: boolean;
};

const SORT_OPTIONS: SortOption[] = [
  { label: 'নতুন থেকে পুরানো', value: true },
  { label: 'পুরানো থেকে নতুন', value: false },
];

const ReviewHeader: React.FC = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const currentOrder = useSelector(
    (state: RootState) => state.main.sortingOrderFromLatest,
  );

  const selectedLabel = currentOrder ? 'নতুন থেকে পুরানো' : 'পুরানো থেকে নতুন';

  const toggleDropdown = useCallback(() => setVisible(prev => !prev), []);

  const handleSelect = useCallback(
    (value: boolean) => {
      if (value !== currentOrder) dispatch(setSortingOrder(value));
      setVisible(false);
    },
    [dispatch, currentOrder],
  );

  return (
    <React.Fragment>
      <View style={styles.container}>
        <Text style={styles.title}>
          ড্রাইভার রিভিউ ({toBengaliDigits(reviewData.count.toString())})
        </Text>

        <Pressable onPress={toggleDropdown} style={styles.row}>
          <Text style={styles.selectedText}>{selectedLabel}</Text>
          <Image
            source={require('../../assets/icons/sort.png')}
            style={styles.sortIcon}
          />
        </Pressable>

        {visible && (
          <View style={styles.dropdown}>
            {SORT_OPTIONS.map(option => {
              const isActive = option.value === currentOrder;
              return (
                <DropdownOption
                  key={option.label}
                  option={option}
                  isActive={isActive}
                  onSelect={handleSelect}
                />
              );
            })}
          </View>
        )}
      </View>
      <TabView />
    </React.Fragment>
  );
};

export default memo(ReviewHeader);

type DropdownOptionProps = {
  option: SortOption;
  isActive: boolean;
  onSelect: (value: boolean) => void;
};

const DropdownOption: React.FC<DropdownOptionProps> = memo(
  ({ option, isActive, onSelect }) => (
    <Pressable onPress={() => onSelect(option.value)} style={styles.optionRow}>
      <Text style={styles.optionText}>{option.label}</Text>
      {isActive && (
        <Image
          source={require('../../assets/icons/tick.png')}
          style={styles.tick}
        />
      )}
    </Pressable>
  ),
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingBottom: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  selectedText: {
    fontSize: 14,
  },

  sortIcon: {
    height: 16,
    width: 16,
    tintColor: '#333',
  },

  dropdown: {
    position: 'absolute',
    top: 28,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,

    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,

    zIndex: 50,
  },

  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 5,
  },

  optionText: {
    fontSize: 14,
  },

  tick: {
    height: 10,
    width: 12,
  },
});
