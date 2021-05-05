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
  Image,
  Alert,
  Text as RNText,
} from 'react-native';
import * as icons from 'assets/icons';
import {colors, sizes, smallDevice} from 'styles/theme';
import {createUser, emailValidation, getData} from 'utils';
import {Context} from 'redux/context';
import {useNavigation, useRoute} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import PImage from 'react-native-image-progress';
import {Rating, AirbnbRating} from 'react-native-ratings';

//
const {h1, h2, h3, h4, getHeight, getWidth, screenSize, customFont} = sizes;
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
const AvailableAtRestaurant = (props) => {
  const {navigate, goBack} = useNavigation();
  const navigation = useNavigation();
  const [allRes, setAllRes] = useState([]);

  const {
    foodList,
    isSelected,
    restaurantSelected,
    restName,
    boundAction: {onSelectRestuarant, loading, onSelection},
  } = useContext(Context);
  const name = isSelected?.name;
  const item = isSelected?.item;

  useEffect(() => {
    !restaurantSelected && fetchItem();
  }, []);

  const fetchItem = () => {
    let _data = [];
    loading(true);
    database()
      .ref('restaurant')
      .once('value')
      .then((data) => {
        // console.log(data.val());
        if (data.val()) {
          Object.values(data.val()).forEach((el) => {
            _data.push(el);
          });
          setAllRes(_data);
        }
        loading(false);
      })
      .catch((e) => {
        loading(false);
        alert(e);
      });
  };

  const onSelect = (item) => {
    // console.log(item);
    if (item?.available) {
      onSelectRestuarant(item, item.name);
      navigate('viewRestaurant');
    } else {
      Alert.alert('انذار', 'آسف لا تقدم أي عنصر حتى الآن', [{text: 'فهمتك'}]);
    }
  };

  const viewReviews = (item, star) => {
    if (item?.reviews) {
      // console.log(item.reviews);
      navigation.navigate('reviews', {item, star});
    }
  };

  // console.log('---------------->>');
  // console.log(item);

  return (
    <>
      <>
        <Block
          middle
          center
          style={{
            flex: 0,
            marginBottom: -getHeight(4),
            borderBottomLeftRadius: screenSize * 0.2,
            borderBottomRightRadius: screenSize * 0.2,
            transform: [{scaleY: 1.7}, {scaleX: 1.3}],
            backgroundColor: secondry,
            height: getHeight(smallDevice ? 35 : 25),
          }}
        />
        <Block
          style={{
            position: 'absolute',
            width: '100%',
            height: getHeight(smallDevice ? 30 : 20),
          }}>
          {/* =====================HEADING PART 1 */}
          <Block center row space={'between'} padding={[0, getWidth(5)]}>
            <Button
              middle
              center
              onPress={() => goBack()}
              style={{
                // borderWidth: 1,
                width: getWidth(10),
                marginRight: getWidth(5),
              }}>
              <Image
                source={icons.backy}
                style={{
                  resizeMode: 'contain',
                  position: 'absolute',
                  width: getWidth(8),
                  left: -getWidth(1),
                  top: 0,
                  height: getHeight(4),
                  flex: 1,
                  tintColor: primary,
                }}
              />
            </Button>
            <Block middle center style={{borderWidth: 0, height: getHeight(0)}}>
              <Image
                source={icons.logo}
                style={{
                  resizeMode: 'contain',
                  position: 'absolute',
                  width: getWidth(70),
                  height: getHeight(25),
                  flex: 1,
                }}
              />
            </Block>
            <Button
              onPress={() => navigation.openDrawer()}
              middle
              center
              style={{
                // borderWidth: 3,
                width: getWidth(8),
                height: getHeight(3),
                backgroundColor: secondry,
                // marginRight: getWidth(2),
              }}>
              <Image
                source={icons.hamburger}
                style={{
                  resizeMode: 'contain',
                  width: getWidth(10),
                  tintColor: primary,
                }}
              />
            </Button>
          </Block>
          {/* =====================HEADING PART 2 */}
          <Block
            center
            row
            color={secondry}
            bottom
            padding={[0, getWidth(5), 0, 0]}
            style={{
              borderWidth: 0,
              flex: 0,
              height: getHeight(smallDevice ? 14 : 9),
            }}>
            <Block flex={false} middle crossRight style={{borderWidth: 0}}>
              {item && (
                <Block row center middle style={{borderWidth: 0}}>
                  <RNText numberOfLines={1} style={{color: primary}}>
                    أنت تبحث عن
                    {` ${name}`}
                  </RNText>
                </Block>
              )}
              <Block middle center>
                <RNText numberOfLines={1} style={{color: primary}} F>
                  قائمة بجميع المطاعم المتاحة
                </RNText>
              </Block>
            </Block>
          </Block>
        </Block>
      </>
      <Block color={'transparent'} style={{borderWidth: 0}}>
        <FlatList
          data={item || allRes}
          // style={{backgroundColor: secondry}}
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Block
              middle
              center
              // style={{borderWidth: 1}}
              height={getHeight(80)}>
              <Text
                style={{lineHeight: 45, fontSize: sizes.customFont(18)}}
                weight={'500'}
                cap
                color={secondry}>
                لم يتم العثور على عنصر
              </Text>
              <Button
                onPress={() => fetchItem()}
                middle
                center
                style={{
                  borderWidth: 0.3,
                  borderRadius: screenSize * 0.004,
                  borderColor: secondry,
                  paddingHorizontal: getWidth(3),
                }}>
                <Text
                  style={{lineHeight: 32, fontSize: sizes.customFont(14)}}
                  color={secondry}>
                  حاول ثانية
                </Text>
              </Button>
            </Block>
          }
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({item, index}) => {
            let resCover = item?.resCover;
            let reviews = item?.reviews;
            let sumOfPoints = 0;
            let star = 0;
            let count = 0;
            if (reviews) {
              let review = Object.values(reviews);
              count = review?.length;
              review.forEach((el) => {
                sumOfPoints += el?.point;
              });
              star = Math.ceil(sumOfPoints / count);
            }

            return (
              <Button
                opacity={1}
                onPress={() => onSelect(item)}
                style={styles.restaurantDetails}>
                <Block style={styles.infoCon}>
                  {/* <Block
                    flex={false}
                    style={{borderWidth: 0}}
                    padding={[0, getWidth(3), 0, 0]}> */}
                  {/* <Text>{index}</Text> */}
                  <Block
                    flex={false}
                    row
                    center
                    style={{
                      overflow: 'hidden',
                      height: getHeight(7),
                      // borderWidth: 0.3,
                    }}>
                    <Block
                      style={{
                        // borderWidth: 1,
                        // selfAlign: 'right',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        height: '100%',
                      }}
                      middle>
                      <RNText
                        // header
                        numberOfLines={2}
                        style={{
                          color: secondry,
                          fontWeight: 'bold',
                          // fontSize: 16,
                          lineHeight: 20,
                          textAlign: 'right',
                        }}
                        // ellipsizeMode="tail"
                        // color={secondry}
                      >
                        {item.name}
                        {/* نرحب ببعض النص الدمية نرحب ببعض النص الدمية */}
                      </RNText>
                    </Block>
                  </Block>
                  {/* </Block> */}
                  {/* PPPPP */}
                  <Block
                    style={{borderWidth: 0}}
                    crossRight
                    padding={[0, getWidth(0), 0, 0]}>
                    <Block
                      // middle
                      // center
                      flex={false}
                      style={{
                        // height: getHeight(13),
                        maxHeight: getHeight(13),
                        // borderWidth: 0.3,
                        width: '100%',
                        overflow: 'hidden',
                      }}>
                      {/* <Text
                        numberOfLines={4}
                        ellipsizeMode="tail"
                        color={secondry}
                        style={{
                          textAlign: 'right',
                        }}>
                        {item.note}
                        hjhkjhkjhkjhkjhkjhkjhkjhkhkjhhjhkjhkjhkjhkjhkjhkjhkjhkhkjhhjhkjhkjhkjhkjhkjhkjhkjhkhkjhhjhkjhkjhkjhkjhkjhkjhkjhkhkjh
                      </Text> */}
                      <RNText
                        style={{
                          // lineHeight: 35,
                          // fontSize: 20,
                          textAlign: 'right',
                          color: secondry,
                        }}
                        ellipsizeMode="tail"
                        numberOfLines={4}>
                        {item.note}
                        {/* نرحب ببعض النص الدمية نرحب ببعض النص الدمية */}
                      </RNText>
                    </Block>

                    {item?.contact && (
                      <Block
                        row
                        center
                        middle
                        style={{
                          // borderWidth: 1,
                          flex: 0,
                          height: getHeight(3),
                        }}>
                        <RNText
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            marginRight: getWidth(2),
                            // fontSize: sizes.customFont(12),
                            color: secondry,
                          }}
                          // weight={'400'}
                          // color={secondry}
                        >
                          {item?.contact[0]}
                        </RNText>
                        <Image
                          source={icons.phone}
                          style={{
                            resizeMode: 'contain',
                            width: getWidth(4),
                            marginRight: getWidth(1),
                            tintColor: secondry,
                            height: getHeight(3),
                          }}
                        />
                      </Block>
                    )}

                    <Block
                      row
                      center
                      top
                      flex={false}
                      style={{borderWidth: 0, height: getHeight(3)}}>
                      <Text color={gray} style={{fontSize: customFont(10)}}>
                        ({count})
                      </Text>
                      <Button
                        onPress={() => viewReviews(item, star)}
                        middle
                        center
                        style={{
                          // borderWidth: 1,
                          height: getHeight(4),
                        }}>
                        <AirbnbRating
                          count={5}
                          isDisabled
                          showRating={false}
                          defaultRating={star}
                          size={17}
                        />
                      </Button>
                    </Block>
                  </Block>
                  {/* PPPPPP */}
                </Block>
                <Block style={styles.imgCon}>
                  <Block
                    style={{
                      flex: 0,
                      height: screenSize * 0.1,
                      width: screenSize * 0.1,
                      borderRadius: screenSize * 3,
                      backgroundColor: resCover ? primary : 'transparent',
                      // backgroundColor: primary,
                      shadowColor: gray5,
                      shadowOffset: {width: 0, height: 5},
                      shadowOpacity: 0.4,
                      shadowRadius: 1,
                      position: 'absolute',
                      justifyContent: 'center',
                      alignItems: 'center',
                      top: screenSize * 0.03,
                      right: -screenSize * 0.015,
                      // padding: screenSize * 0.01,
                      // borderWidth: 1,
                      // overflow: 'hidden',
                    }}>
                    {item?.resCover ? (
                      <Block
                        style={{
                          flex: 0,
                          height: screenSize * 0.1,
                          width: screenSize * 0.1,
                          borderRadius: screenSize * 3,
                          overflow: 'hidden',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <PImage
                          indicatorProps={{color: colors.secondry}}
                          source={{uri: item.resCover}}
                          style={{
                            resizeMode: 'cover',
                            height: '100%',
                            width: '100%',
                          }}
                        />
                      </Block>
                    ) : (
                      <Block
                        style={{
                          flex: 0,
                          height: screenSize * 0.1,
                          width: screenSize * 0.1,
                          borderRadius: screenSize * 3,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={icons.cook}
                          style={{
                            resizeMode: 'contain',
                            height: screenSize * 0.12,
                            width: screenSize * 0.12,
                          }}
                        />
                      </Block>
                    )}
                  </Block>
                </Block>
              </Button>
            );
          }}
        />
      </Block>
    </>
  );
};

const styles = StyleSheet.create({
  restaurantDetails: {
    // borderWidth: 1,
    height: getHeight(smallDevice ? 28.5 : 25),
    // height: sizes.withHeight(0.21),
    // height: sizes.screenSize * 0.17,
    flexDirection: 'row',
    backgroundColor: primary,
    marginHorizontal: getWidth(2.5),
    marginVertical: getHeight(1),
    width: getWidth(85),
    alignSelf: 'center',
    borderRadius: screenSize * 0.015,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 5},
    backgroundColor: '#F4F0F0',
  },
  imgCon: {
    // borderTopRightRadius: screenSize * 0.007,
    // borderBottomRightRadius: screenSize * 0.007,
    // overflow: 'hidden',
    // borderWidth: 1,
    position: 'relative',
    flex: 0,
    width: getWidth(30),
  },
  resImg: {
    resizeMode: 'contain',
    flex: 1,
    width: '100%',
    borderRadius: screenSize * 0.007,
  },
  infoCon: {
    flex: 1.4,
    paddingLeft: getWidth(2),
    // paddingTop: getHeight(0.5),
    // justifyContent: 'space-between',
  },
});

export default AvailableAtRestaurant;
