/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { ICONIC_BG } from './src/assets';

import Home from './src/screens/home/Home';
import { colors } from './src/theme';

const App = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={[styles.iconicBg, styles.iconicTop]} source={ICONIC_BG} />
      <Home />
      <Image
        style={[styles.iconicBg, styles.iconicBottom]}
        source={ICONIC_BG}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  iconicBg: {
    position: 'absolute',
    width: 200,
    height: 250,
    zIndex: -5,
  },
  iconicTop: {
    top: 0,
    left: -80,
  },
  iconicBottom: {
    bottom: 0,
    right: -80,
  },
});

export default App;
