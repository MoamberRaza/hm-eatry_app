import React, {
  useEffect,
  useRef,
  useReducer,
  useState,
  useContext,
} from 'react';
import {StyleSheet, FlatList, Image, ScrollView, Modal} from 'react-native';
import {Text, Block, Button, TextField} from 'components';
import * as icons from 'assets/icons';
import {colors, sizes} from 'styles/theme';
import {Context} from 'redux/context';
// import {Context} from 'redux/Context';

const ModalPopup = (props) => {
  const {visible, children, animation} = props;
  const {
    showModal,
    modalAnimation,
    // boundActions: {setShowModal},
  } = useContext(Context);
  return (
    <Modal
      // onRequestClose={() => setShowModal(false)}
      transparent={true}
      animationType={modalAnimation}
      visible={visible || showModal}
      {...props}>
      {children}
    </Modal>
  );
};

export {ModalPopup};

const styles = StyleSheet.create({
  closeBtn: {
    position: 'absolute',
    // borderWidth:1,
    bottom: sizes.getHeight(4),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeImg: {
    resizeMode: 'contain',
    width: sizes.getWidth(15),
    height: sizes.getHeight(15),
  },
});
