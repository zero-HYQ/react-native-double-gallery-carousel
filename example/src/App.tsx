import * as React from 'react';

import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  CarouselList,
  type BaseCarouselRef,
} from 'react-native-double-gallery-carousel';

const icon = [
  require('../assets/1.png'),
  require('../assets/2.png'),
  require('../assets/3.png'),
  require('../assets/4.png'),
  require('../assets/5.png'),
  require('../assets/6.png'),
  require('../assets/7.png'),
  require('../assets/8.png'),
  require('../assets/9.png'),
  require('../assets/10.png'),
];

export default function App() {
  const { width, height } = useWindowDimensions();
  const ref = React.useRef<BaseCarouselRef>(null);

  return (
    <View style={styles.container}>
      <CarouselList
        data={icon}
        style={styles.carouselList}
        width={width}
        height={height}
        ref={ref}
      />
      <TouchableOpacity
        onPress={() => console.log('current index:', ref.current!.currentIndex)}
        style={styles.button}
      >
        <Text>get index</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselList: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  button: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: '#fff',
    top: 0,
  },
});
