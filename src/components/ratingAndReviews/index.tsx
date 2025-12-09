import React, { useMemo, useState, useCallback } from 'react';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetFlatList,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

import RatingHeader from './RatingHeader';
import RatingView from './RatingView';
import ReviewHeader from './ReviewHeader';
import Review from './Review';

type MainData = { id: string; type: 'main' };
type ChildData = { id: string; type: 'child' };

interface RatingAndReviewModalProps {
  bottomSheetModalRef: React.Ref<any>;
  closeModal: () => void;
}

const RatingAndReviewModal = ({
  bottomSheetModalRef,
  closeModal,
}: RatingAndReviewModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const snapPoints = useMemo(() => ['50%', '60%', '70%', '80%', '100%'], []);

  const mainItems: MainData[] = [{ id: 'review-1', type: 'main' }];

  const data: (ChildData | MainData)[] = [
    { id: 'review-header', type: 'child' },
    ...mainItems,
  ];

  /** ✅ Backdrop renderer */
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0} // show backdrop when modal opens
        disappearsOnIndex={-1}
        opacity={0.5} // dim level
        pressBehavior="close" // tap backdrop to close modal
      />
    ),
    [],
  );

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        index={1}
        onChange={setCurrentIndex}
        backdropComponent={renderBackdrop}
        handleComponent={
          currentIndex === snapPoints.length - 1 ? () => null : undefined
        }
      >
        <RatingHeader closeModal={closeModal} />

        <BottomSheetFlatList
          data={data}
          keyExtractor={(it: ChildData | MainData) => it.id}
          ListHeaderComponent={<RatingView />}
          renderItem={({ item }: { item: ChildData | MainData }) =>
            item.type === 'child' ? <ReviewHeader /> : <Review />
          }
          stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
        />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default RatingAndReviewModal;
