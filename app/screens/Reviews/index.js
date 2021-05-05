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
import auth from '@react-native-firebase/auth';
import {colors, sizes} from 'styles/theme';
import * as icons from 'assets/icons';
import {createUser, emailValidation, getData} from 'utils';
import {Context} from 'redux/context';
import {useNavigation, useRoute} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import {Rating, AirbnbRating} from 'react-native-ratings';
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

export const Reviews = () => {
  const {goBack} = useNavigation();
  const {params} = useRoute();
  const [data, setData] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    let item = params?.item;
    try {
      let a = Object.values(item?.reviews);
      setReviews(a);
    } catch (e) {
      alert(e);
    }
    setData(item);
  }, [params]);

  return (
    <Block>
      <Block row middle center color={secondry}>
        <Button onPress={goBack} middle center style={styles.btn}>
          <Image source={icons.backy} style={styles.backArrow} />
        </Button>
        <Image source={icons.logo} style={styles.logo} />
      </Block>
      <Block style={{flex: 7}}>
        <FlatList
          data={reviews}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <Block style={styles.listStyle}>
                <Text h1 cap weight={'500'}>
                  {item?.email}
                </Text>
                <Text h3>
                  <Text color={gray} h3>
                    Comments:
                  </Text>
                  {item?.comments}
                </Text>
                <AirbnbRating
                  count={5}
                  isDisabled
                  showRating={false}
                  defaultRating={item.point}
                  size={17}
                />
              </Block>
            );
          }}
        />
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    borderWidth: 0.4,
    marginVertical: getHeight(0.4),
    minHeight: getHeight(10),
    justifyContent: 'center',
    marginHorizontal: getWidth(2.5),
    borderRadius: screenSize * 0.003,
    paddingHorizontal: getWidth(2),
  },
  btn: {
    position: 'absolute',
    left: getWidth(4),
  },
  backArrow: {
    resizeMode: 'contain',
    width: getWidth(8),
    tintColor: primary,
  },
  logo: {
    resizeMode: 'contain',
    // flex: 1,
    width: getWidth(50),
    height: getHeight(50),
  },
});
