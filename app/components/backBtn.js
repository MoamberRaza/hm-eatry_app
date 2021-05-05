import {Button} from 'components';
import React from 'react';
import {View, Text, Image} from 'react-native';
import {colors, sizes} from 'styles/theme';
import * as icons from 'assets/icons';
import {goBack} from 'navigations';
//
const {h1, h2, h3, h4, getHeight, getWidth, screenSize} = sizes;
const {
  lightGray,
  lightgray2,
  gray,
  gray2,
  gray4,
  gray5,
  blue,
  purple,
  primary,
  secondry,
  black,
  gray1,
  mixer,
} = colors;
const BackBtn = (props) => {
  const {color} = props;
  // console.log('BACK BTN');
  // console.log(color);
  return (
    <Button
      onPress={() => goBack()}
      style={{
        position: 'absolute',
        right: getWidth(3),
        zIndex: 1000,
        width: getWidth(10),
        height: getHeight(8),
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
      }}>
      <Image
        source={icons.back}
        style={{
          resizeMode: 'contain',
          // flex: 1,
          // height: getHeight(4),
          flex: 1,
          width: getWidth(5),
          tintColor: primary,
          transform: [{rotate: '180 deg'}],
          // shadowColor: primary,
          // shadowOpacity: 1,
          // shadowRadius: 1,
          // shadowOffset: {width: 0, height: 1},
        }}
      />
    </Button>
  );
};

export default BackBtn;
