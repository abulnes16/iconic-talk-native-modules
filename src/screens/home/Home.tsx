import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { MainButton, Logo } from '../../components';

import { colors, fontSize } from '../../theme';

const Home = () => {
  return (
    <View>
      <Logo />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Native Modules</Text>
        <Text style={styles.subtitle}>on React Native</Text>
      </View>
      <View style={styles.buttonContainer}>
        <MainButton text="Module without Params" />
        <MainButton text="Module with Params" />
        <MainButton variant="secondary" text="Module Callback" />
        <MainButton variant="secondary" text="Module Promise" />
        <MainButton variant="secondary" text="Module Event" />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  titleContainer: {
    marginVertical: 10,
  },
  title: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: fontSize.extraLarge,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.secondary,
    fontSize: fontSize.huge,
    textAlign: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
