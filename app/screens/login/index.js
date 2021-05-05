import {Block, Button, Gradient, ImageBackground, Text} from 'components';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import Storage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import {colors, sizes} from 'styles/theme';
import * as icons from 'assets/icons';
import {createUser, emailValidation, getData} from 'utils';
import {Context} from 'redux/context';
import {useNavigation, useRoute} from '@react-navigation/native';
import database from '@react-native-firebase/database';

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
const Login = () => {
  let emailRef = useRef();
  const navigation = useNavigation();
  const route = useRoute();
  const {
    forLogin,
    boundAction: {loading, saveUserInfo, authentication},
  } = useContext(Context);
  useEffect(() => {
    emailRef.current.focus();
  }, ['']);

  const [state, setState] = useState({email: '', pass: ''});
  const _onChangeText = (e, n) => {
    if (n === 'name') {
      setState((p) => ({...p, email: e}));
    } else {
      setState((p) => ({...p, pass: e}));
    }
  };

  const onSubmit = async () => {
    let key = null;
    let data = null;
    if (
      state.email &&
      emailValidation(state.email) &&
      state.pass?.length >= 6
    ) {
      try {
        loading(true);
        const {user} = await auth().signInWithEmailAndPassword(
          state.email,
          state.pass,
        );
        const isExistInDb = await database()
          .ref('users')
          .orderByChild('email')
          .equalTo(user.email)
          .once('value');
        if (isExistInDb.val()) {
          isExistInDb.forEach((el) => {
            key = el.key;
            data = el.val();
          });
          const updatedData = {...data, isActive: true};
          await database()
            .ref(`users/${key}`)
            .set(updatedData)
            .then(() => {
              saveUserInfo(user);
              loading(false);
              navigation.navigate('drawer');
            })
            .catch((e) => {
              loading(false);
              alert(e);
            });
        } else {
          createUser(user).then((data) => {
            saveUserInfo(user);
            loading(false);
            navigation.navigate('drawer');
          });
        }
      } catch (e) {
        loading(false);
        alert(e.message);
      }
    } else {
      loading(false);
      Alert.alert('لتعلم', 'الرجاء إدخال بيانات الاعتماد الصحيحة والصحيحة', [
        {text: 'على ما يرام'},
      ]);
    }
  };

  const onSignUp = async () => {
    loading(true);
    if (emailValidation(state.email) && state.pass && state.pass.length >= 8) {
      await auth()
        .createUserWithEmailAndPassword(state.email, state.pass)
        .then((data) => {
          createUser(data.user)
            .then((data) => {
              auth()
                .signInWithEmailAndPassword(state.email, state.pass)
                .then((d) => {
                  saveUserInfo(d.user);
                  loading(false);
                  navigation.navigate('drawer');
                })
                .catch((e) => {
                  loading(false);
                  alert(e);
                });
            })
            .catch((e) => {
              loading(false);
              alert(e);
            });
        })
        .catch((e) => {
          loading(false);
          alert(e);
          console.log(e);
        });
    } else {
      loading(false);
      // alert('Email must be valid and password should be equal to 8 characters');
      Alert.alert(
        'لتعلم',
        'يجب أن يكون البريد الإلكتروني صالحًا ويجب أن تكون كلمة المرور مساوية لثمانية أحرف',
        [{text: 'على ما يرام'}],
      );
    }
  };

  // console.log(route);

  return (
    <>
      <ImageBackground image />
      <Block flex={false} height={getHeight(30)}>
        <Image
          source={icons.logo}
          style={{
            resizeMode: 'contain',
            flex: 1,
            alignSelf: 'center',
          }}
        />
      </Block>
      <Block style={{borderWidth: 0}} padding={[0, getWidth(5)]}>
        <TextInput
          textAlign="right"
          ref={emailRef}
          value={state.email}
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor={colors.primary}
          onChangeText={(e) => _onChangeText(e, 'name')}
          keyboardType="email-address"
          // placeholder=" Enter Email"
          placeholder=" أدخل البريد الإلكتروني"
          style={styles.inputStyle}
        />
        <TextInput
          textAlign="right"
          value={state.pass}
          placeholderTextColor={colors.primary}
          onChangeText={(e) => _onChangeText(e, 'pass')}
          secureTextEntry
          // placeholder="Enter Password"
          placeholder="أدخل البريد الإلكتروني"
          style={styles.inputStyle}
        />
        {forLogin ? (
          <Gradient
            colors={[secondry, mixer]}
            onPress={onSubmit}
            // text="login"
            text="تسجيل الدخول"
            width={getWidth(90)}
            textStyle={{lineHeight: 42}}
          />
        ) : (
          <Gradient
            btnStyle={{marginVertical: getHeight(1)}}
            textStyle={{lineHeight: 35}}
            colors={[mixer, mixer]}
            onPress={onSignUp}
            // text="SignUp"
            text="اشتراك"
            width={getWidth(90)}
          />
        )}
      </Block>
    </>
  );
};

const styles = StyleSheet.create({
  directly: {
    borderBottomWidth: 2,
    borderBottomColor: primary,
    width: getWidth(50),
    justifyContent: 'flex-end',
    paddingBottom: getHeight(0.5),
    alignItems: 'center',
    paddingHorizontal: getWidth(3),
    borderRadius: screenSize * 0.003,
  },
  inputStyle: {
    borderBottomWidth: 2,
    borderBottomColor: secondry,
    paddingBottom: getHeight(1),
    fontSize: h1,
    fontWeight: '700',
    color: colors.gray1,
    marginVertical: getHeight(2),
  },
});

export default Login;
