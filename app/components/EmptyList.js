import {Block, Text} from 'components';
import React from 'react';
import {colors, sizes} from 'styles/theme';
import {StyleSheet} from 'react-native';

export default () => {
  return (
    <Block
      middle
      center
      style={{
        // borderWidth: 1,
        alignSelf: 'center',
        flex: 1,
        padding: sizes.screenSize * 0.02,
        flexGrow: 1,
      }}>
      <Text
        h1
        style={{
          marginTop: sizes.getHeight(3),
          alignSelf: 'center',
          textAlign: 'center',
        }}
        color={colors.primary}
        bold>
        لم يتم العثور على شيء خاص حتى الآن
      </Text>
    </Block>
  );
};

const styles = StyleSheet.create({
  blockStyle: {
    flexGrow: 1,
  },
});
