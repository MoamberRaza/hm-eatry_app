import React, {useRef, useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {Block} from 'components';
import {theme} from 'styles';
import {Image} from 'react-native';
import {colors, sizes} from 'styles/theme';
import LinearGradient from 'react-native-linear-gradient';

const TextField = React.forwardRef(
  (props, ref) => {
    const {
      placeholder,
      placeholderColor,
      icon,
      name,
      onChangeText,
      value,
      secure,
      email,
      phone,
      blockStyle,
      inputStyle,
      imgStyle,
      next,
      send,
      numpad,
      noBlur,
      textArea,
    } = props;
    let currentHeight = useRef();
    const [lines, setLines] = useState();

    return (
      <Block
        ref={currentHeight}
        flex={false}
        center
        middle
        row
        style={{
          ...styles.container,
          ...blockStyle,
        }}>
        {icon && (
          <Image
            source={icon}
            style={{
              ...styles.imageStyle,
              marginHorizontal: theme.sizes.border,
              ...imgStyle,
            }}
          />
        )}
        <TextInput
          returnKeyType={(next && 'next') || (send && 'send') || 'default'}
          secureTextEntry={secure}
          keyboardType={
            (email && 'email-address') ||
            (phone && 'phone-pad') ||
            (numpad && 'number-pad')
          }
          multiline={textArea}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor || theme.colors.gray}
          style={{
            ...styles.textInput,
            width: icon ? '90%' : '100%',
            ...inputStyle,
          }}
          value={value}
          ref={ref}
          blurOnSubmit={noBlur ? false : true}
          autoCapitalize="none"
          {...props}
          // onChangeText={(text) => onChangeText({name, text})}
        />
        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.8, y: 1.0}}
          colors={[colors.blue, colors.purple]}
          style={{
            // borderWidth: 1,
            position: 'absolute',
            zIndex: -1,
            bottom: 0,
            alignSelf: 'center',
            height: sizes.getHeight(0.3),
            width: '100%',
          }}
        />
      </Block>
    );
  },
  [''],
);

export default TextField;

const styles = StyleSheet.create({
  container: {
    // borderBottomWidth: 1,
    height: sizes.getHeight(5),
    // borderColor: 'red',
    // // borderWidth:4,
    // height: theme.sizes.withHeight(0.07),
    // width: '100%',
    // borderRadius: theme.sizes.border,
    // // marginVertical: theme.sizes.padding,
    // padding: 0,
    // paddingVertical: 0,
    // borderBottomWidth: 1,
  },
  imageStyle: {
    resizeMode: 'contain',
    // flex:1,
    width: sizes.getWidth(5),
    height: sizes.getHeight(5),
    // height: sizes.getHeight(10),
  },
  textInput: {
    color: theme.colors.gray,

    height: '100%',
    paddingLeft: sizes.getWidth(1.5),
    // height: theme.sizes.withHeight(0.07),
    // borderBottomWidth: 1,
    // borderWidth:1,
    ...theme.fonts.h1,
  },
});
