import {Block, Loader, Text} from 'components';
import {MainNavigation} from 'navigations';
import React, {useEffect} from 'react';
import {View, SafeAreaView, Modal, StatusBar} from 'react-native';
import {Provider} from 'redux/context';
import {colors, ios} from 'styles/theme';

const App = () => {
  useEffect(() => {}, ['']);
  return (
    <>
      {ios && StatusBar.setBarStyle('light-content')}
      <SafeAreaView style={{flex: 0, backgroundColor: colors.secondry}} />
      <Provider>
        <MainNavigation />
        <Loader />
      </Provider>
    </>
  );
};

export default App;
