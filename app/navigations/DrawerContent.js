import React, {useState, useEffect} from 'react';
import {colors, sizes, scaleFont, smallDevice} from 'styles/theme';
import * as icons from 'assets/icons';
import {Image, Linking, StyleSheet} from 'react-native';
import {Block, Button, Text} from 'components';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';
//
const {getHeight, getWidth, screenSize} = sizes;
const {gray2, primary} = colors;

export const CustomDrawerContent = ({props, context}) => {
  const {navigation} = props;
  const [phone, setPhone] = useState(null);
  useEffect(() => {
    initialSettings();
  }, ['']);

  const initialSettings = async () => {
    try {
      let _phone = await AsyncStorage.getItem('phone');
      setPhone(_phone);
    } catch (e) {
      console.log(e);
    }
  };

  let user = context?.user;
  const {
    boundAction: {loading, saveUserInfo, forLogin, onSelection},
  } = context;
  const logout = async () => {
    try {
      let email = user?.email;
      let key = null;
      if (email) {
        await database()
          .ref('users')
          .orderByChild('email')
          .equalTo(email)
          .once('value')
          .then(async (data) => {
            data.forEach((el) => ((key = el.key), (data = el.val())));
            let updateData = {...data, isActive: false};
            console.log(updateData);
            database().ref(`users/${key}`).set(updateData);
            await auth().signOut();
            saveUserInfo(false);
            loading(false);
            navigation.goBack();
          })
          .catch((e) => {
            loading(false);
            alert(e);
          });
      } else {
        alert('no user found. please login again');
      }
    } catch (e) {
      loading(false);
      alert(e);
    }
  };
  const onNavigate = (e) => {
    forLogin(e);
    navigation.navigate('auth');
  };
  return (
    <Block>
      <Block
        middle
        crossRight
        flex={false}
        padding={[getHeight(3), getWidth(5), 0, 0]}
        height={getHeight(28)}>
        <Button style={styles.userImage}>
          <Image
            source={icons.profile}
            style={{
              resizeMode: 'contain',
              flex: 1,
            }}
          />
        </Button>
        <Text center numberOfLines={2} color={primary} header weight={'500'}>
          {user?.displayName || '--'}
        </Text>
      </Block>
      <Block color={primary}>
        <Button
          style={{...styles.btn, marginTop: getHeight(3)}}
          onPress={
            user
              ? () => navigation.navigate('settings')
              : () => onNavigate(true)
          }>
          <Text
            height={40}
            style={{fontSize: sizes.customFont(14)}}
            color={gray2}>
            {/* {user ? 'Settings' : 'Login'} */}
            {user ? 'إعدادات' : 'تسجيل الدخول'}
          </Text>
          <Image
            source={user ? icons.settings : icons.login}
            style={styles.infoIcon}
          />
        </Button>
        {!user && (
          <Button style={styles.btn} onPress={() => onNavigate(false)}>
            <Text
              height={32}
              style={{fontSize: sizes.customFont(14)}}
              color={gray2}>
              انشاء حساب جديد
            </Text>
            <Image
              source={user ? icons.settings : icons.register}
              style={styles.infoIcon}
            />
          </Button>
        )}

        <Button
          style={styles.btn}
          onPress={() => {
            onSelection(null), navigation.navigate('restaurants');
          }}>
          <Text
            height={32}
            style={{fontSize: sizes.customFont(14)}}
            color={gray2}>
            كل المطاعم
          </Text>
          <Image source={icons.cafe} style={styles.infoIcon} />
        </Button>
        {/*  */}
        <Button
          style={styles.btn}
          onPress={() => Linking.openURL(`tel:+96567673355`)}>
          <Block crossRight>
            <Text
              height={25}
              style={{fontSize: sizes.customFont(10)}}
              color={gray2}>
              اتصل بنا
            </Text>
            <Text
              height={12}
              style={{fontSize: sizes.customFont(9)}}
              align="right"
              color={gray2}>
              {phone || 'لم يتم العثور على جهة اتصال.'}
            </Text>
          </Block>
          <Image source={icons.whatsapp} style={styles.infoIcon} />
        </Button>

        {user && (
          <Button onPress={logout} style={styles.btn}>
            <Text
              height={32}
              style={{fontSize: sizes.customFont(14)}}
              color={gray2}>
              {/* Logout */}
              تسجيل خروج
            </Text>
            <Image source={icons.logout} style={styles.infoIcon} />
          </Button>
        )}
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  userImage: {
    borderWidth: 3,
    borderColor: primary,
    width: screenSize * 0.09,
    height: screenSize * 0.09,
    borderRadius: screenSize * 3,
    overflow: 'hidden',
    marginBottom: getHeight(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    borderWidth: 0.3,
    height: getHeight(smallDevice ? 8 : 6),
    marginHorizontal: getWidth(3),
    borderRadius: screenSize * 0.007,
    backgroundColor: primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: getWidth(4),
  },
  infoIcon: {
    resizeMode: 'contain',
    width: getWidth(8),
    marginHorizontal: getWidth(2),
    // tintColor: colors.secondry,
  },
});
