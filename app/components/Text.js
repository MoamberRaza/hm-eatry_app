// just copy this code from the driving repo :)
import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {theme} from 'styles';
import {smallDevice} from 'styles/theme';

export default class Typography extends Component {
  render() {
    const {
      h1,
      h2,
      h3,
      h4,
      h5,
      title,
      title2,
      size,
      header,
      transform,
      align,
      // styling
      regular,
      padding,
      margin,
      bold,
      semibold,
      medium,
      weight,
      light,
      center,
      right,
      spacing, // letter-spacing
      height, // line-height
      // colors
      color,
      accent,
      primary,
      secondary,
      tertiary,
      black,
      white,
      gray,
      gray2,
      style,
      children,
      cap,
      lower,
      upper,
      ...props
    } = this.props;

    const textStyles = [
      styles.text,
      h1 && styles.h1,
      h2 && styles.h2,
      h3 && styles.h3,
      h4 && styles.h4,
      h5 && styles.h5,
      header && styles.header,
      title && styles.title,
      title2 && styles.title2,
      size && {fontSize: size},
      transform && {textTransform: transform},
      margin && {...theme.handleMargins(margin)},
      padding && {...theme.handlePaddings(padding)},
      align && {textAlign: align},
      height && {lineHeight: height},
      spacing && {letterSpacing: spacing},
      weight && {fontWeight: weight},
      regular && styles.regular,
      bold && styles.bold,
      semibold && styles.semibold,
      medium && styles.medium,
      light && styles.light,
      center && styles.center,
      right && styles.right,
      color && styles[color],
      color && !styles[color] && {color},
      // color shortcuts
      accent && styles.accent,
      primary && styles.primary,
      secondary && styles.secondary,
      tertiary && styles.tertiary,
      black && styles.black,
      white && styles.white,
      gray && styles.gray,
      gray2 && styles.gray2,
      cap && styles.capital,
      upper && styles.upper,
      style, // rewrite predefined styles
    ];

    return (
      <Text style={textStyles} {...props}>
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  // default style
  capital: {
    textTransform: 'capitalize',
  },
  upper: {
    textTransform: 'uppercase',
  },
  text: {
    fontSize: theme.sizes.font,
    color: theme.colors.black,

    // fontFamily: 'Helvetica',
  },
  // variations
  regular: {
    fontWeight: 'normal',
  },
  bold: {
    fontWeight: 'bold',
    // fontFamily: 'Helvetica-bold',
  },
  semibold: {
    fontWeight: '500',
  },
  medium: {
    fontWeight: '500',
  },
  light: {
    fontWeight: '200',
  },
  // position
  center: {textAlign: 'center'},
  right: {textAlign: 'right'},
  // colors
  accent: {color: theme.colors.accent},
  primary: {color: theme.colors.primary},
  secondary: {color: theme.colors.secondary},
  tertiary: {color: theme.colors.tertiary},
  black: {color: theme.colors.black},
  white: {color: theme.colors.white},
  gray: {color: theme.colors.gray},
  gray2: {color: theme.colors.gray2},
  // fonts
  h1: theme.fonts.h1,
  h2: theme.fonts.h2,
  h3: theme.fonts.h3,
  h4: theme.fonts.h4,
  h5: theme.fonts.h5,
  title: theme.fonts.title,
  title2: theme.fonts.title2,
  header: theme.fonts.header,
});
