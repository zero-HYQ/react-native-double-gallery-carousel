import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  TouchableOpacity,
  View,
  type ImageSourcePropType,
  type ImageStyle,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  runOnUI,
  scrollTo,
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import { AutoImage } from './AutoImage';
import { useWebScrollEvents } from './useWebScrollEvents';

export interface BaseCarouselList {
  data: ImageSourcePropType[];
  width: number;
  height: number;
  style?: StyleProp<ViewStyle>;
  isShowMinorList?: boolean;
}

export interface BaseCarouselRef {
  currentIndex: number;
}

export const CarouselList = forwardRef<BaseCarouselRef, BaseCarouselList>(
  (props, ref) => {
    const { data, style, width, height, isShowMinorList = true } = props;
    const [currentIndex, setCurrentIndex] = useState(0);
    const mainRef = useAnimatedRef<Animated.ScrollView>();
    const minorRef = useAnimatedRef<Animated.ScrollView>();
    const mainScroll = useSharedValue(0);
    const minorScroll = useSharedValue(0);

    useImperativeHandle(ref, () => ({
      currentIndex,
    }));

    const MAIN_SIZE = width;
    const MINOR_SIZE = width / 5;
    const MINOR_ICON_SIZE = MINOR_SIZE / 2;

    const $defaultContainer: ViewStyle = {
      backgroundColor: '#000000',
      width: '100%',
      height: '100%',
    };

    const $containers: StyleProp<ViewStyle> = [$defaultContainer, style];

    const $imageStyle: ImageStyle = { width: MAIN_SIZE, height };

    const $minorContainer: ViewStyle = {
      width,
      height: MINOR_SIZE,
      position: 'absolute',
      bottom: 25,
    };

    const $minorImage: ImageStyle = {
      width: MINOR_SIZE,
      height: MINOR_SIZE,
      borderRadius: 15,
      marginHorizontal: 7,
      borderWidth: 2,
      borderColor: 'transparent',
    };

    const $selectImageStyle: ImageStyle = {
      borderColor: '#ffffff',
    };

    useDerivedValue(() => {
      scrollTo(mainRef, mainScroll.value * MAIN_SIZE, 0, true);
      scrollTo(
        minorRef,
        minorScroll.value * MINOR_SIZE - MINOR_SIZE * 1.5,
        0,
        true
      );
    });

    const handleIndexChange = (index: number) => {
      mainScroll.value = index;
      minorScroll.value = index;
      setCurrentIndex(index);
    };

    const webProps = useWebScrollEvents({
      onMomentumScrollEnd: (e) => {
        const index = e.nativeEvent.contentOffset.x / MAIN_SIZE;
        setCurrentIndex(index);
        runOnUI(() => {
          'worklet';
          scrollTo(minorRef, index * MINOR_SIZE - MINOR_SIZE * 1.5, 0, true);
        })();
      },
    });

    return (
      <View style={$containers}>
        <Animated.ScrollView
          {...webProps}
          ref={mainRef}
          style={$containers}
          horizontal={true}
          disableIntervalMomentum={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
        >
          {data.map((item, index) => {
            return (
              <AutoImage
                key={index}
                source={item}
                style={$imageStyle}
                maxHeight={height}
                maxWidth={width}
                resizeMode="stretch"
              />
            );
          })}
        </Animated.ScrollView>
        {isShowMinorList && (
          <Animated.ScrollView
            ref={minorRef}
            style={$minorContainer}
            horizontal={true}
            disableIntervalMomentum={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
          >
            {data.map((item, index) => {
              const minorStatus = index === currentIndex;

              const $minorImageStyle: StyleProp<ImageStyle> = [
                $minorImage,
                minorStatus && $selectImageStyle,
              ];

              return (
                <TouchableOpacity
                  onPress={() => handleIndexChange(index)}
                  key={index}
                  disabled={minorStatus}
                >
                  <AutoImage
                    source={item}
                    style={$minorImageStyle}
                    maxHeight={MINOR_ICON_SIZE}
                    maxWidth={MINOR_ICON_SIZE}
                  />
                </TouchableOpacity>
              );
            })}
          </Animated.ScrollView>
        )}
      </View>
    );
  }
);
