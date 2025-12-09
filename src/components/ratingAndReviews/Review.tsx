import React, { memo, useMemo } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ListRenderItemInfo,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';

import VerticalRating from '../../hooks/Stars';
import { reviewData } from '../../utils/dummyData';
import { formatBanglaDate } from '../../hooks/banglaDate';
import { RootState } from '../../store/store';

interface ReviewItem {
  id: string;
  rating: number;
  created_at: string;
  comment: string;
  tags?: string[];
}

const ReviewCard = memo(({ item }: { item: ReviewItem }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <VerticalRating rating={item.rating} />
        <Text style={styles.date}>{formatBanglaDate(item.created_at)}</Text>
      </View>

      {!!item.comment && <Text style={styles.des}>{item.comment}</Text>}

      {item.tags?.length ? (
        <View style={styles.tagContainer}>
          {item.tags.map(tag => (
            <View key={tag} style={styles.round}>
              <Text style={styles.tag}>{tag}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
});

const Review: React.FC = () => {
  const currentNav = useSelector((state: RootState) => state.main.currentNav);
  const isLatestFirst = useSelector(
    (state: RootState) => state.main.sortingOrderFromLatest,
  );

  const filteredReviews = useMemo(() => {
    const source = reviewData?.data ?? [];

    // Filter by rating
    const filtered =
      currentNav === 'সব'
        ? source
        : source.filter(item => item.rating === Number(currentNav));

    // Sort by date
    return [...filtered].sort((a, b) => {
      const aTime = new Date(a.created_at).getTime();
      const bTime = new Date(b.created_at).getTime();
      return isLatestFirst ? bTime - aTime : aTime - bTime;
    });
  }, [currentNav, isLatestFirst]);

  const renderItem = ({ item }: ListRenderItemInfo<ReviewItem>) => (
    <ReviewCard item={item} />
  );

  return (
    <FlatList
      data={filteredReviews}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      ListEmptyComponent={<EmptyState />}
    />
  );
};

export default Review;

const EmptyState = () => (
  <View style={styles.emptyBox}>
    <Image
      source={require('../../assets/icons/empty.png')}
      style={styles.icon}
    />
    <Text style={styles.emptyText}>কোনো রিভিউ নেই</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    marginHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 10,
    fontWeight: '400',
    color: '#000000',
    marginLeft: 10,
  },
  des: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    paddingTop: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  round: {
    backgroundColor: '#F5F5F5',
    borderRadius: 60,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginRight: 5,
    marginTop: 5,
  },
  tag: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
  },
  emptyBox: {
    alignItems: 'center',
    marginTop: 50,
  },
  icon: {
    height: 80,
    width: 80,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginTop: 10,
  },
});
