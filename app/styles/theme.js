import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Dimensions, PixelRatio, Platform} from 'react-native';

export const scaleFont = (size) => size * PixelRatio.getFontScale();
export const ios = Platform.OS === 'ios';
export const android = Platform.OS === 'android';
const deviceWith = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const ratio = deviceWith / deviceHeight;

// export const smallDevice = deviceWith <= 375;
// export const newDevices = deviceWith >= 1120 && deviceHeight >= 2436;
export const smallDevice = ratio >= 0.55;
export const newDevice = ratio < 0.47;
export const normalDevice = ratio >= 0.47;

// console.log("----------------");
// console.log(ratio);

const colors = {
  red: '#FF0000',
  primary: '#FFFFFF',
  secondry: '#21958C',
  // secondry: '#24A7A0',
  mixer: '#299BB9',
  lightGray: '#EFEFEF',
  lightgray2: '#E5E5E5',
  gray1: '#ECEFF1',
  black: '#000000',
  gray: '#979797',
  gray2: '#707070',
  gray5: '#505050',
  gray3: '#2C262B',
  gray4: '#1A1A1A',
  black2: '#120810',
  blue: '#84d5ff',
  purple: '#e387fc',
};
const screenSize = wp('100%') + hp('100%');
const getDimensions = {
  width: wp('100%'),
  height: hp('100%'),
};

// const font = scaleFont((smallDevice && 16) || (newDevice && 20) || 18);
// const h1 = scaleFont((smallDevice && 18) || (newDevice && 22) || 20);
// const h2 = scaleFont((smallDevice && 16) || (newDevice && 20) || 16);
// const h3 = scaleFont((smallDevice && 12) || (newDevice && 18) || 14);
// const h4 = scaleFont((smallDevice && 11) || (newDevice && 15) || 13);
// const title = scaleFont((smallDevice && 28) || (newDevice && 28) || 24);
// const title2 = scaleFont((smallDevice && 18) || (newDevice && 26) || 22);
// const header = scaleFont((smallDevice && 20) || (newDevice && 30) || 26);

const h5 = scaleFont((smallDevice && 9) || (newDevice && 12) || 12);

let font = scaleFont(18); //18
let h1 = scaleFont(20); //20
let h2 = scaleFont(16); //16
let h3 = scaleFont(14); //14
let h4 = scaleFont(12); //12
let title = scaleFont(24); //24
let title2 = scaleFont(22); //22
let header = scaleFont(26); //26

const sizes = {
  // global sizes
  base: Math.floor(screenSize * 0.0125), //16
  border: Math.floor(screenSize * 0.008), //10
  padding: Math.floor(screenSize * 0.011), //14
  borderRaduis: screenSize * 0.015,

  getWidth: (width) => wp(width),
  getHeight: (height) => hp(height),

  withWidth: (size) => getDimensions.width * size,
  withHeight: (size) => getDimensions.height * size,
  withScreen: (size) => screenSize * size,
  getDimensions: {
    width: wp('100%'),
    height: hp('100%'),
  },
  getDimensions,
  screenSize,
  // font sizes
  // font: scaleFont(18), //18
  font,
  // h1: scaleFont(20), //20
  h1,
  // h2: scaleFont(16), //16
  h2,
  // h3: scaleFont(14), //14
  h3,
  h4,
  h5,
  // title: scaleFont(24), //24
  title,
  // title2: scaleFont(22), //22
  title2,
  // header: scaleFont(26), //26
  header,
  customFont: (size) => scaleFont(size),
};

const fonts = {
  default: {
    //fontFamily: 'Rubik-Light',
    fontSize: sizes.font,
  },
  h1: {
    //fontFamily: 'Rubik-Light',
    fontSize: sizes.h1,
  },
  h2: {
    //fontFamily: 'Rubik-Medium',
    fontSize: sizes.h2,
  },
  h3: {
    //fontFamily: 'Rubik-Regular',
    fontSize: sizes.h3,
  },
  h4: {
    //fontFamily: 'Rubik-Light',
    fontSize: sizes.h4,
  },
  h5: {
    //fontFamily: 'Rubik-Light',
    fontSize: sizes.h5,
  },
  header: {
    //fontFamily: 'Rubik-Bold',
    fontSize: sizes.header,
  },
  title: {
    //fontFamily: 'Rubik-Regular',
    fontSize: sizes.title,
  },
  title2: {
    //fontFamily: 'Rubik-Regular',
    fontSize: sizes.title2,
  },
  header: {
    //fontFamily: 'Rubik-Regular',
    fontSize: sizes.header,
  },
};
function handleMargins(margin) {
  if (typeof margin === 'number') {
    return {
      marginTop: margin,
      marginRight: margin,
      marginBottom: margin,
      marginLeft: margin,
    };
  }

  if (typeof margin === 'object') {
    const marginSize = Object.keys(margin).length;
    switch (marginSize) {
      case 1:
        return {
          marginTop: margin[0],
          marginRight: margin[0],
          marginBottom: margin[0],
          marginLeft: margin[0],
        };
      case 2:
        return {
          marginTop: margin[0],
          marginRight: margin[1],
          marginBottom: margin[0],
          marginLeft: margin[1],
        };
      case 3:
        return {
          marginTop: margin[0],
          marginRight: margin[1],
          marginBottom: margin[2],
          marginLeft: margin[1],
        };
      default:
        return {
          marginTop: margin[0],
          marginRight: margin[1],
          marginBottom: margin[2],
          marginLeft: margin[3],
        };
    }
  }
}

function handlePaddings(padding) {
  if (typeof padding === 'number') {
    return {
      paddingTop: padding,
      paddingRight: padding,
      paddingBottom: padding,
      paddingLeft: padding,
    };
  }

  if (typeof padding === 'object') {
    const paddingSize = Object.keys(padding).length;
    switch (paddingSize) {
      case 1:
        return {
          paddingTop: padding[0],
          paddingRight: padding[0],
          paddingBottom: padding[0],
          paddingLeft: padding[0],
        };
      case 2:
        return {
          paddingTop: padding[0],
          paddingRight: padding[1],
          paddingBottom: padding[0],
          paddingLeft: padding[1],
        };
      case 3:
        return {
          paddingTop: padding[0],
          paddingRight: padding[1],
          paddingBottom: padding[2],
          paddingLeft: padding[1],
        };
      default:
        return {
          paddingTop: padding[0],
          paddingRight: padding[1],
          paddingBottom: padding[2],
          paddingLeft: padding[3],
        };
    }
  }
}
export {colors, sizes, fonts, handleMargins, handlePaddings};
