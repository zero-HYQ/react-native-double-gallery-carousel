# react-native-double-gallery-carousel

`react-native-double-gallery-carousel` is available for android and ios as well as the web

## Example
 ![Example](example/assets/demo.gif) 

## Installation

```sh
npm install react-native-double-gallery-carousel

yarn add react-native-double-gallery-carousel
```

## Usage

```tsx
import { CarouselList } from 'react-native-double-gallery-carousel';

<CarouselList
  data={[]}
  style={{}}
  width={Dimensions.get('screen').width}
  height={Dimensions.get('screen').height}
/>;
```

## Properties

| Prop   | required | Type                  | Description                                                                                          |
| ------ | -------- | --------------------- | ---------------------------------------------------------------------------------------------------- |
| data   | yes      | ImageSourcePropType[] | data source                                                                                          |
| style  | no       | ViewStyle             | container style                                                                                      |
| width  | yes      | number                | container image width `It is recommended that the width be the same as the container style width`    |
| height | yes      | number                | container image height `It is recommended that the height be the same as the container style height` |

## Example code

You can see the example code and demo.

Clone the repository

```bash
git clone https://github.com/zero-HYQ/react-native-double-gallery-carousel.git
```

Install libraries

```bash
yarn
```

Execute the example project.

```bash
# Example folder
# iOS
yarn example ios
# Android
yarn example android
# Web
yarn example web
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
