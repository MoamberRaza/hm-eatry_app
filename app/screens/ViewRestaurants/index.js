import {
  BackBtn,
  Block,
  Button,
  Gradient,
  ImageBackground,
  Text,
} from 'components';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet, FlatList, Linking, Image, Alert, Modal} from 'react-native';
import auth from '@react-native-firebase/auth';
import {colors, sizes, smallDevice} from 'styles/theme';
import {createUser, emailValidation, getData} from 'utils';
import {Context} from 'redux/context';
import {useNavigation, useRoute} from '@react-navigation/native';
import database, {firebase} from '@react-native-firebase/database';
import PImage from 'react-native-image-progress';
import CheckBox from '@react-native-community/checkbox';
import * as icons from 'assets/icons';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import {Text as RNText} from 'react-native';

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
const ViewRestaurant = () => {
  const {
    foodList,
    restaurantSelected,
    boundAction: {loading, setFoodList},
  } = useContext(Context);
  const item = restaurantSelected?.item;

  const navigation = useNavigation();
  const {goBack, navigate} = useNavigation();
  const [sendable, setSendable] = useState(false);
  const [showModal, setShowModal] = useState({view: null, image: null});
  useEffect(() => {
    initialSetting();
    canUse();
    return () => null;
  }, [restaurantSelected, sendable]);
  const initialSetting = () => {
    let data = [];
    item?.available &&
      Object.values(item?.available).forEach((el) => {
        data.push({isSelected: false, name: el});
      });
    setFoodList(data);
  };

  async function canUse() {
    database()
      .ref('constants/status')
      .on('value', (snapshot) => {
        setSendable(snapshot.val());
      });
  }

  const onSelect = (selected) => {
    let index = foodList.findIndex((e) => e.name === selected.name);
    let newItem = {
      ...selected,
      isSelected: !foodList[index]?.isSelected,
      restaurantDetails: item,
    };
    foodList[index] = newItem;
    setFoodList(foodList);
  };

  const onOrder = async () => {
    let text = '';
    let totalBill = null;
    foodList.forEach((el) => {
      let item = el.name.name;
      let price = el.name.price;
      if (el.isSelected) {
        totalBill += parseInt(price);
        // text += `item : ${item} - price: ${parseFloat(price).toFixed(2)}\n`;
        text += `العنصر : ${item} - السعر: ${parseFloat(price).toFixed(2)}\n`;
      }
    });

    // console.log('totalBill');
    // console.log(totalBill);
    // console.log(totalBill);
    let actualBill = parseFloat(totalBill).toFixed(2);
    let message = `${text}\n إجمالي الفاتورة : ${actualBill}`;

    if (totalBill > 0) {
      if (sendable) {
        Linking.openURL(
          `whatsapp://send?text=${message}&phone=${item.contact[0]}`,
        )
          .then(() => {
            navigation.goBack();
          })
          .catch((e) => {
            Alert.alert('إختر خيارا', 'تريد إجراء مكالمة أو رسالة', [
              {
                text: 'رسالة قصيرة',
                onPress: () => {
                  Linking.openURL(`sms:${item.contact[0]}
          &body=${message}`);
                },
              },
              {
                text: 'جعل الطلب على الهاتف',
                onPress: () => {
                  Linking.openURL(`tel:${item.contact[0]}`);
                },
              },
            ]);
            // Linking.openURL(`sms:&${item.contact[0]}=null&body={message}`);
            // Alert.alert('خطأ', 'الرجاء تثبيت Whatsapp أولاً.', [
            //   {text: 'اني اتفهم'},
            // ]);
          });
      } else {
        loading(true);
        let p = new Promise((resovle) =>
          setTimeout(() => {
            resovle();
          }, 2000),
        );
        p.then(() => {
          loading(false);
          Alert.alert('تهاني', 'تم تقديم الطلب', [
            {
              text: 'موافق',
              onPress: () => navigation.goBack(),
            },
          ]);
        });
      }
    } else {
      Alert.alert('خطأ', 'يرجى تحديد أي عنصر ثم الضغط على الأمر', [
        {text: 'اني اتفهم'},
      ]);
    }
  };

  // console.log('#########################');
  // console.log(foodList);
  let scrollX = useRef(new Animated.Value(0)).current;
  return (
    <>
      <Block color={primary}>
        <>
          <LinearGradient
            // start={(0, 1)}
            // end={(0, 0.5)}
            // colors={[secondry, 'transparent']}
            colors={[secondry, secondry]}
            style={{
              flex: 0,
              height: getHeight(20),
              alignItems: 'center',
              position: 'absolute',
              top: 0,
              width: '100%',
              zIndex: 1,
              justifyContent: 'center',
              // marginBottom: -getHeight(4),
              // borderBottomLeftRadius: screenSize * 0.2,
              // borderBottomRightRadius: screenSize * 0.2,
              // transform: [{scaleY: 1.7}, {scaleX: 1.3}],
              // backgroundColor: secondry,
            }}
          />
          <Block
            style={{
              // borderWidth: 3,
              position: 'absolute',
              width: '100%',
              zIndex: 2,
              height: getHeight(20),
            }}>
            <Block center row space={'between'} padding={[0, getWidth(5)]}>
              <Button
                middle
                center
                onPress={() => goBack()}
                style={{borderWidth: 0, marginRight: getWidth(5)}}>
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
              <Block
                middle
                center
                style={{borderWidth: 0, height: getHeight(0)}}>
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
            <Block
              center
              middle
              style={{borderWidth: 0, flex: 0, height: getHeight(10)}}>
              <RNText
                numberOfLines={1}
                style={{
                  // fontSize: sizes.customFont(22),
                  // lineHeight: 40
                  color: primary,
                  fontWeight: 'bold',
                }}>
                {item?.name}
                {/* MANGO AND APPLE */}
              </RNText>
            </Block>
          </Block>
        </>
        {/* ========== */}
        <FlatList
          // ListHeaderComponent={}
          showsVerticalScrollIndicator={false}
          data={foodList}
          onScroll={({
            nativeEvent: {
              contentSize: {height},
            },
          }) => {
            scrollX = height;
          }}
          // style={{paddingBottom: getHeight(15)}}
          contentContainerStyle={{
            backgroundColor: primary,
            // borderWidth: 5,
            paddingBottom: getHeight(15),
            paddingTop: getHeight(20),
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <>
                <Block
                  animated
                  style={{
                    ...styles.item,
                    marginTop: getHeight(index === 0 ? 0 : 0.8),
                  }}>
                  <Block style={{borderWidth: 0}}>
                    <Block
                      flex={false}
                      // crossRight
                      style={{
                        // borderWidth: 1,
                        height: getHeight(8),
                        // maxHeight: getHeight(8),
                        // overflow: 'hidden',
                        paddingTop: getHeight(0.3),
                      }}>
                      <RNText
                        numberOfLines={3}
                        // ellipsizeMode="tail"
                        style={{
                          textAlign: 'right',
                          color: secondry,
                          // fontSize: 20,
                          // borderWidth: 1,
                          height: '100%',
                        }}>
                        {item?.name?.name}
                        {/* نرحب ببعض النص الدمية */}
                      </RNText>
                    </Block>
                    <Block flex={false} middle style={{borderWidth: 0}}>
                      <Text h5 color={secondry}>
                        {parseFloat(item?.name?.price).toFixed(2)} K.D
                      </Text>
                    </Block>
                    <Block middle center>
                      <Button
                        onPress={() => onSelect(item)}
                        middle
                        center
                        style={{
                          backgroundColor: secondry,
                          marginVertical: 0,
                          height: getHeight(smallDevice ? 5 : 3),
                          paddingHorizontal: getWidth(smallDevice ? 6 : 3),
                          borderRadius: screenSize * 0.007,
                        }}>
                        {/* <Text color={primary}>Add </Text> */}

                        <Text
                          // h5={!smallDevice}
                          // h2={smallDevice}
                          bold
                          style={{
                            lineHeight: smallDevice ? 32 : 23,
                            fontSize: smallDevice ? 18 : 14,
                          }}
                          color={!item.isSelected ? primary : 'orange'}>
                          {item.isSelected ? 'تم اضافه' : 'اضافه'}
                        </Text>
                      </Button>
                    </Block>
                  </Block>

                  {/* =============== */}
                  {item?.name?.imageUrl ? (
                    <>
                      <Button
                        onPress={() =>
                          setShowModal({view: true, image: item.name?.imageUrl})
                        }
                        style={{height: '100%', marginVertical: 0}}>
                        <PImage
                          indicatorProps={{color: secondry}}
                          source={{uri: item.name?.imageUrl}}
                          style={{
                            borderColor: '#f9f9f9',
                            resizeMode: 'contain',
                            width: getWidth(40),
                            height: '100%',
                            marginLeft: getWidth(2),
                            alignSelf: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                          }}
                        />
                      </Button>
                    </>
                  ) : (
                    <Block
                      middle
                      center
                      style={{
                        flex: 0,
                        borderWidth: 0.3,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: getWidth(40),
                        backgroundColor: secondry,
                        marginLeft: getWidth(2),
                      }}>
                      <Image
                        indicatorProps={{color: primary}}
                        source={icons.noImageFood}
                        style={{
                          resizeMode: 'contain',
                          flex: 1,
                        }}
                      />
                    </Block>
                  )}

                  {/* <CheckBox
                    disabled={true}
                    value={item.isSelected}
                    style={{marginLeft: getWidth(3)}}
                    lineWidth={2}
                    tintColor={primary}
                    onTintColor={primary}
                    onCheckColor={primary}
                    boxType="square"
                    onValueChange={() => {}}
                    // onValueChange={(newValue) => setToggleCheckBox(newValue)}
                  /> */}
                </Block>
              </>
            );
          }}
        />
      </Block>

      {/* ==============================>> */}
      <LinearGradient
        style={{
          height: getHeight(15),
          opacity: 1,
          bottom: 0,
          position: 'absolute',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        // colors={['transparent', secondry]}>
        colors={['transparent', 'transparent']}>
        <Button
          onPress={onOrder}
          middle
          center
          row
          opacity={0.9}
          style={{
            // borderWidth: 2,
            marginVertical: 0,
            width: getWidth(smallDevice ? 60 : 50),
            height: getHeight(smallDevice ? 8 : 6),
            // alignSelf: 'center',
            justifyContent: 'center',
            borderRadius: screenSize * 0.03,
            shadowRadius: 10,
            shadowColor: gray5,
            shadowOpacity: 1,
            shadowOffset: {width: 0, height: 3},
          }}
          color={secondry}>
          {sendable ? (
            <Text color={primary}>الطلب عبر الواتساب</Text>
          ) : (
            <Text
              style={{
                lineHeight: 35,
              }}
              color={primary}>
              مكان الامر
            </Text>
          )}
        </Button>
      </LinearGradient>
      {/* ==============================>> */}
      <Modal
        visible={showModal.view}
        transparent
        animationType="fade"
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <Button
          onPress={() => setShowModal({view: false, image: null})}
          opacity={1}
          style={{
            backgroundColor: '#000000',
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: 0,
            marginVertical: 0,
          }}
        />
        <Block
          middle
          center
          flex={false}
          style={{
            // backgroundColor: '#21958C',
            marginTop: getHeight(15),
          }}>
          <PImage
            indicatorProps={{color: colors.primary}}
            source={{uri: showModal.image}}
            style={{
              resizeMode: 'contain',
              width: '100%',
              height: getHeight(70),
            }}
          />
        </Block>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  coverImage: {
    resizeMode: 'cover',
    width: getWidth(100),
    height: getHeight(30),
    // borderWidth: 1,
  },
  item: {
    // borderWidth: 1,
    marginVertical: getHeight(0),
    alignItems: 'center',
    paddingHorizontal: getWidth(3),
    height: getHeight(smallDevice ? 23 : 15),
    // backgroundColor: '#21958C80',
    backgroundColor: '#F4F0F0',
    shadowColor: black,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 0.3,
    shadowOpacity: 0.3,
    flexDirection: 'row',
  },
});

export default ViewRestaurant;
