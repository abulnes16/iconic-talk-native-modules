/* Iconic Native Module */

import { NativeModules } from 'react-native';

export interface Wallet {
  address: string;
  phrase: string;
  privateKey: string;
}

interface IconicModule {
  /**
   * Check internet connection on the native side
   */
  checkInternetConnection: () => void;
  /**
   * Check the internet connection on the native side and returns the state
   * @param callback
   */
  checkInternetConnectionWithCallback(
    callback: (isConnected: boolean) => void,
  ): () => void;
  /**
   * Prints a message on the native side
   */
  nativePrint: (title: string, message: string) => void;
  /**
   * Create a native wallet
   */
  createNativeWallet: (password: String) => Promise<Wallet>;
}

const { IconicModule } = NativeModules;

export default IconicModule as IconicModule;
