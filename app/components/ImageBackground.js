import React from 'react';
import {Image, ImageBackground, SafeAreaView, StatusBar} from 'react-native';
import {colors} from 'styles/theme';
// import PImage from 'react-native-image-progress';

const BackgrounImage = ({blur, image}) => {
  return (
    <>
      <Image
        blurRadius={blur}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          opacity: 0.9,
          backgroundColor: colors.secondry,
        }}
        source={
          image
            ? {
                uri:
                  'https://i.pinimg.com/564x/83/1e/80/831e80884bd22d280b264fbdf712913b.jpg',
              }
            : null
        }
      />
    </>
  );
};

export default BackgrounImage;
