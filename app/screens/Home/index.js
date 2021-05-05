import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  Block,
  Button,
  EmptyListComponent,
  ImageBackground,
  Text,
} from 'components';
import {
  StyleSheet,
  FlatList,
  Image,
  Animated,
  Alert,
  RefreshControl,
  Text as RNText,
} from 'react-native';
import PImage from 'react-native-image-progress';
import {colors, sizes, smallDevice} from 'styles/theme';
import * as icons from 'assets/icons';
import {Context} from 'redux/context';
import database, {firebase} from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
//
const {getHeight, getWidth, screenSize} = sizes;
const {primary, secondry, mixer} = colors;

const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const {
    boundAction: {loading, onSelection},
  } = useContext(Context);
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const initialSettings = async () => {
    let _list = [];
    try {
      loading(true);
      let phoneNumber = await AsyncStorage.getItem('phone');
      if (!phoneNumber) {
        let constants = await database().ref('constants').once('value');
        let phone = constants.val()?.phone || '+96567673355';
        AsyncStorage.setItem('phone', phone);
      }
      await database()
        .ref('food')
        .once('value', (data) => {
          if (data.val()) {
            Object.values(data.val()).forEach((el) => {
              _list.push(el);
            });
            setData(_list);
            // console.log(_list);
          }
        });

      loading(false);
    } catch (e) {
      loading(false);
      alert(e);
    }
  };

  useEffect(() => {
    initialSettings();
  }, ['']);

  const onSelect = async (e) => {
    try {
      loading(true);
      let foodNode = await database().ref('food').once('value');
      let restNode = await database().ref('restaurant').once('value');
      //
      //
      let allRest = Object.entries(restNode.val()).filter(
        (x) => x[1].available,
      );
      let infoOfSelectFood = Object.entries(foodNode.val()).find(
        (x) => x[1].name === e.name && x[1].price === e.price,
      );
      let idOfSelectedItem = infoOfSelectFood[0];

      // console.log('idOfSelectedItem');
      // console.log(idOfSelectedItem);

      let finalList = allRest.filter((d) =>
        Object.values(d[1].available).find((x) => {
          return x.mainCateOf === idOfSelectedItem;
        }),
      );

      let item = [];
      finalList.length &&
        finalList.forEach((e, i) => {
          item.push(finalList[i][1]);
          // console.log(finalList[i][1]);
        });

      // console.log(item);

      item.length
        ? (onSelection(item, e.name),
          navigation.navigate('restaurants'),
          loading(false))
        : (Alert.alert('لتعلم', 'العنصر غير متوفر في أي مطعم حتى الآن.', [
            {
              text: 'أنا أفهم',
              style: 'destructive',
            },
            {
              text: 'عرض كل المطاعم',
              onPress: () => navigation.navigate('restaurants'),
            },
          ]),
          loading(false));
      // loading(false);
    } catch (e) {
      console.log('Error');
      console.log(e);
      loading(false);
    }
  };

  return (
    <>
      <ImageBackground />

      <Block
        flex={4}
        style={{borderWidth: 0}}
        padding={[getHeight(0), getWidth(1), 0, getWidth(1)]}>
        <Animated.FlatList
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => initialSettings()}
            />
          }
          ListHeaderComponent={
            <>
              <Block
                middle
                center
                style={{
                  height: getHeight(20),
                }}>
                <Image
                  source={icons.logo}
                  style={{
                    resizeMode: 'contain',
                    width: getWidth(80),
                    height: getHeight(40),
                  }}
                />
              </Block>
              <Block style={styles.menuTitle}>
                <Text bold h3 height={33} color={secondry}>
                  اختر طلبك من:
                </Text>
              </Block>
            </>
          }
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyListComponent />}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          data={data}
          renderItem={({item, index}) => {
            return (
              <>
                <Block
                  animated
                  margin={[0, getWidth(2)]}
                  // style={{ transform: [{ scale }], opacity }}
                >
                  <Button onPress={() => onSelect(item)} style={styles.listBtn}>
                    {item?.imageUrl ? (
                      <PImage
                        indicatorProps={{color: primary}}
                        source={{uri: item?.imageUrl}}
                        style={{
                          resizeMode: 'cover',
                          flex: 1,
                          // borderWidth: 2,
                          justifyContent: 'center',
                          // height: getHeight(20),
                          borderRadius: screenSize * 0.01,
                        }}
                      />
                    ) : (
                      <>
                        <Image
                          source={icons.noImageFood}
                          style={{resizeMode: 'contain', width: getWidth(20)}}
                        />
                        <Text style={{marginBottom: getHeight(4)}}>
                          لم يتم العثور على صورة
                        </Text>
                      </>
                    )}
                    <Block
                      middle
                      crossRight
                      style={{
                        flex: 0,
                        position: 'absolute',
                        width: '100%',
                        height: getHeight(smallDevice ? 7 : 7),
                        bottom: 0,
                        right: 0,
                        paddingRight: getWidth(4),
                        backgroundColor: '#ffffff99',
                      }}>
                      <Animated.Text style={styles.name}>
                        {item?.name || 'N/A'}
                      </Animated.Text>
                      {/* <RNText
                        style={{
                          // borderWidth: 1,
                          color: colors.secondry,
                          fontSize: 24,
                          lineHeight: 42,
                        }}>
                        {item?.name || 'N/A'}
                      </RNText> */}
                    </Block>
                  </Button>
                </Block>
              </>
            );
          }}
        />
      </Block>

      <Block
        crossRight
        flex={false}
        middle
        height={getHeight(8)}
        style={{
          position: 'absolute',
          top: getHeight(7),
          right: getWidth(7),
        }}
        padding={[0, getWidth(0), getHeight(0), 0]}>
        <Button
          onPress={() => navigation.openDrawer()}
          middle
          center
          style={{
            // borderWidth: 3,
            width: getWidth(8),
            height: getHeight(3),
            backgroundColor: secondry,
            marginRight: getWidth(2),
          }}>
          <Image
            source={icons.hamburger}
            style={{
              resizeMode: 'contain',
              width: getWidth(12),
              tintColor: primary,
            }}
          />
        </Button>
      </Block>
    </>
  );
};

const styles = StyleSheet.create({
  menuTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: getWidth(80),
    alignSelf: 'center',
    height: getHeight(smallDevice ? 8 : 5),
    borderRadius: screenSize * 1,
    backgroundColor: primary,
    marginBottom: getHeight(1.5),
  },
  listBtn: {
    borderWidth: 0.3,
    height: getHeight(smallDevice ? 30 : 20),
    width: getWidth(86),
    alignSelf: 'center',
    marginHorizontal: getWidth(1),
    borderRadius: screenSize * 0.01,
    marginVertical: getHeight(0.7),
    // backgroundColor: colors.secondry,
    shadowColor: colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 3},
    overflow: 'hidden',
  },
  name: {
    fontSize: sizes.customFont(16),
    // fontSize,
    lineHeight: 42,
    // lineHeight: ,
    color: secondry,
    // fontWeight: 'bold',
    // position: 'absolute',
    // bottom: 0,
    // right: getWidth(4),
  },
});

export default Home;
