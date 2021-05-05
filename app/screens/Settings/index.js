import {
  BackBtn,
  Block,
  Button,
  Gradient,
  ImageBackground,
  Text,
} from 'components';
import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import {colors, sizes, smallDevice} from 'styles/theme';
import {createUser, emailValidation, getData} from 'utils';
import {Context} from 'redux/context';
import * as icons from 'assets/icons';
import {useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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

const InfoBlock = ({title, secure, message, input, disable, onChange}) => {
  return (
    <Block
      flex={false}
      crossRight
      margin={[getHeight(1), 0]}
      width={getWidth(80)}
      style={{position: 'relative'}}>
      <Text style={styles.title}>{title || 'N/A'}</Text>
      <TextInput
        textAlign="right"
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry={secure}
        editable={!disable}
        onChangeText={(e) => onChange(e, title)}
        placeholderTextColor={gray1}
        style={styles.infoInput}
        placeholder={message || 'N/A'}
      />
    </Block>
  );
};
const Login = () => {
  const navigation = useNavigation();
  const {
    user,
    boundAction: {saveUserInfo, loading},
  } = useContext(Context);
  useEffect(() => {
    initialSettings();
    return () => null;
  }, ['']);

  const initialSettings = async () => {
    if (!user) {
      saveUserInfo(null);
      navigation.popToTop();
    }
    console.log(user);
  };
  const [state, setState] = useState({displayName: '', password: null});
  const _onChangeText = (text, title) => {
    title === 'Display Name' && setState((p) => ({...p, displayName: text}));
    title === 'New Password' && setState((p) => ({...p, password: text}));
  };

  const onSubmit = async () => {
    loading(true);
    let displayNameChange =
      state.displayName !== '' && user.displayName !== state.displayName;
    let passwordChanged = state.password && state.password.length >= 6;
    if (displayNameChange) {
      user
        .updateProfile({
          displayName: state.displayName,
        })
        .then(async () => {
          loading(false);
          // alert('successful');
          Alert.alert('Successfull', 'Display Name Updated Now', [
            {
              text: 'Ok',
              onPress: () => navigation.goBack(),
            },
          ]);
          try {
            const updatedUser = await auth()?.currentUser;
            saveUserInfo(updatedUser);
            loading(false);
          } catch (e) {
            loading(false);
            alert(e);
          }
        })
        .catch((e) => {
          loading(false);
          alert(e);
        });
      return;
    }

    if (passwordChanged) {
      loading(true);
      await user
        .updatePassword(state.password)
        .then(() => {
          console.log('successfull');
          loading(false);
          navigation.popToTop();
        })
        .catch((e) => {
          loading(false);
          alert(e);
        });
    }
  };
  return (
    <>
      <ImageBackground blur={4} />
      <KeyboardAwareScrollView>
        <BackBtn />
        <Image
          source={icons.logo}
          style={{
            resizeMode: 'contain',
            width: getWidth(100),
            height: getHeight(50),
            position: 'absolute',
            top: -getHeight(10),
            alignSelf: 'center',
          }}
        />
        <Block
          margin={[getHeight(3), 0, 0, 0]}
          center
          padding={[getHeight(20), 0, 0, 0]}>
          <InfoBlock
            onChange={_onChangeText}
            // title="Display Name"
            title="اسم العرض"
            message={user?.displayName}
          />
          <InfoBlock
            disable
            // title="Email"
            title="بريد الالكتروني"
            message={user?.email}
          />
          <InfoBlock
            secure
            onChange={_onChangeText}
            // title="New Password"
            title="كلمة السر الجديدة"
            // message="Change Password"
            message="تغيير كلمة المرور
            "
          />
        </Block>
        <Button onPress={onSubmit} middle center style={styles.submit}>
          {/* <Text color={primary}>Done</Text> */}
          <Text color={primary} height={35}>
            منتهي
          </Text>
        </Button>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  infoInput: {
    // borderWidth: 1,
    height: getHeight(5),
    fontSize: h3,
    width: '100%',
    // backgroundColor: primary,
    borderBottomWidth: 2,
    borderBottomColor: gray5,
    borderRadius: screenSize * 0.003,
    paddingHorizontal: getWidth(2),
  },
  title: {
    // borderWidth: 1,
    paddingHorizontal: getWidth(2),
    backgroundColor: 'transparent',
    // backgroundColor: primary,
    borderRadius: screenSize * 0.003,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: getHeight(smallDevice ? 6 : 4),
    lineHeight: smallDevice ? 20 : 30,
    overflow: 'hidden',
    textAlign: 'right',
    width: getWidth(40),
    fontSize: sizes.h3,
    color: gray5,
    marginBottom: -getHeight(0.2),
  },
  submit: {
    // borderWidth: 1,
    width: getWidth(80),
    height: getHeight(6),
    alignSelf: 'center',
    backgroundColor: secondry,
    borderRadius: screenSize * 0.007,
    shadowColor: primary,
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    marginTop: getHeight(4),
  },
});

export default Login;
