import {Block, Gradient, Text} from 'components';
import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import database, {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {colors, sizes} from 'styles/theme';
import {emailValidation, minLength} from 'utils';
import {ModalPopup} from './Modal';
import {Context} from 'redux/context';
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
  red,
} = colors;

export const Loader = () => {
  const {isLoading} = useContext(Context);
  return (
    <ModalPopup visible={isLoading}>
      <Block middle center color={'#ffffff99'}>
        <ActivityIndicator size="large" color={secondry} />
      </Block>
    </ModalPopup>
  );
};
