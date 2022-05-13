import React from 'react';
import { Image, StyleSheet } from 'react-native';

import { LOGO } from '../../assets';

const Logo = () => {
  return <Image style={styles.logo} source={LOGO} />;
};

export default Logo;

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
});
