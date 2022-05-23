import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { MainButton, Logo } from '../../components';
import { useNativeModule } from '../../hooks';

import { colors, fontSize } from '../../theme';

const Home = () => {
  const {
    checkConnection,
    checkConnectionWithCallback,
    createWallet,
    nativeLog,
    isConnected,
    isLoading,
    error,
    wallet,
  } = useNativeModule();

  return (
    <View>
      <Logo />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Native Modules</Text>
        <Text style={styles.subtitle}>on React Native</Text>
      </View>
      <View style={styles.buttonContainer}>
        <MainButton text="Module without Params" onPress={checkConnection} />
        <MainButton
          text="Module with Params"
          onPress={() =>
            nativeLog(
              'Iconic Talk',
              'This is a native print with Native Modules',
            )
          }
        />
        <MainButton
          variant="secondary"
          text="Module Callback"
          onPress={checkConnectionWithCallback}
        />
        <MainButton
          variant="secondary"
          text="Module Promise"
          onPress={() => createWallet('password1!')}
        />

        {isConnected ? (
          <Text>We have internet connection</Text>
        ) : (
          <Text>We don't have internet connection</Text>
        )}

        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text>We couldn't create the wallet :c </Text>
        ) : (
          <Text>{JSON.stringify(wallet)}</Text>
        )}
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
