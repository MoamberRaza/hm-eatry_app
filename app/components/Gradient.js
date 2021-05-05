import React from 'react';
import {Block, Button, Text} from 'components';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, sizes} from 'styles/theme';

const {h1, h2, h3, h4, h5, screenSize, getWidth, getHeight} = sizes;
const {
  purple,
  blue,
  primary,
  red,
  gray,
  gray1,
  gray2,
  gray3,
  gray4,
  gray5,
  mixer,
  secondry,
} = colors;
const Gradient = ({
  text,
  onPress,
  blockStyle,
  colors,
  textStyle,
  width,
  height,
  btnStyle
}) => {
  return (
    <Button opacity={0.9} style={{marginVertical: 0,...btnStyle}} {...{onPress}}>
      <LinearGradient
        start={{x: 0.5, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={colors || [secondry, mixer]}
        style={{
          ...styles.linearGradient,
          width: width || getWidth(50),
          height: height || getHeight(5.5),
          ...blockStyle,
        }}>
        <Text h2 cap color={primary} style={{...textStyle}}>
          {text || 'N/A'}
        </Text>
      </LinearGradient>
    </Button>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: screenSize * 0.03,
  },
});

export default Gradient;
