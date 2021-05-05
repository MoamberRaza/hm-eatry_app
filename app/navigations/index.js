import React, {useContext} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {
  Home,
  Reviews,
  Login,
  Restaurants,
  ViewRestaurant,
  Settings,
} from 'screens';
import {colors, sizes} from 'styles/theme';
import {CustomDrawerContent} from './DrawerContent';
import {Context} from 'redux/context';

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
} = colors;
const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="login"
        options={{title: 'Login', headerStyle: {backgroundColor: secondry}}}
        component={Login}
      />
    </Stack.Navigator>
  );
};

const DrawerStack = createDrawerNavigator();
const Drawer = () => {
  const context = useContext(Context);
  return (
    <DrawerStack.Navigator
      drawerContent={(props) => <CustomDrawerContent {...{props, context}} />}
      drawerStyle={{width: '75%', backgroundColor: colors.secondry}}
      drawerPosition="right"
      drawerType={'back'}>
      <DrawerStack.Screen name="home" component={Home} />
      <DrawerStack.Screen name="reviews" component={Reviews} />
      <DrawerStack.Screen name="restaurants" component={Restaurants} />
      <DrawerStack.Screen name="viewRestaurant" component={ViewRestaurant} />
      <DrawerStack.Screen name="settings" component={Settings} />
    </DrawerStack.Navigator>
  );
};

const navigationRef = React.createRef();
export const MainNavigation = () => {
  const {forLogin, user} = useContext(Context);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="drawer" component={Drawer} />
        <Stack.Screen name="auth" component={Auth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export function Navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export const goBack = () => {
  navigationRef.current?.goBack();
};
export const reseetRoute = (route, params) => {
  navigationRef.current?.dispatch(StackActions.replace(route, params));
};
