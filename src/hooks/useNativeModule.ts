import { useState } from 'react';
import { IconicNativeModule } from '../modules';
import { Wallet } from '../modules/IconicModule';

const useNativeModule = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [wallet, setWallet] = useState<Wallet>();

  const checkConnection = () => {
    IconicNativeModule.checkInternetConnection();
  };

  const checkConnectionWithCallback = () => {
    IconicNativeModule.checkInternetConnectionWithCallback(connected => {
      setIsConnected(connected);
    });
  };

  const nativeLog = (title: string, message: string) => {
    IconicNativeModule.nativePrint(title, message);
  };

  const createWallet = async (password: string) => {
    try {
      setIsLoading(true);
      const nativeWallet = await IconicNativeModule.createNativeWallet(
        password,
      );
      setWallet(nativeWallet);
    } catch (e) {
      console.log(e);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    checkConnection,
    checkConnectionWithCallback,
    nativeLog,
    createWallet,
    isConnected,
    isLoading,
    error,
    wallet,
  };
};

export default useNativeModule;
