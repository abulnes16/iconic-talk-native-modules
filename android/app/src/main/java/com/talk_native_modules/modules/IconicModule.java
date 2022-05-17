package com.talk_native_modules.modules;

import android.content.Context;
import android.net.ConnectivityManager;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import org.web3j.crypto.Bip39Wallet;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.ECKeyPair;
import org.web3j.crypto.WalletUtils;

import java.io.File;


public class IconicModule extends ReactContextBaseJavaModule {
    private final String MODULE_NAME = "IconicModule";

    IconicModule(ReactApplicationContext context) {
        super(context);
    }


    @NonNull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void checkInternetConnection() {
        ConnectivityManager manager = (ConnectivityManager) getReactApplicationContext().getSystemService(Context.CONNECTIVITY_SERVICE);

        boolean isConnected = manager.getActiveNetwork() != null && manager.getActiveNetworkInfo().isConnected();

        Log.d("[INTERNET CONNECTION]", Boolean.toString(isConnected));
    }

    @ReactMethod
    public void checkInternetConnectionWithCallback(Callback callback) {
        ConnectivityManager manager = (ConnectivityManager) getReactApplicationContext().getSystemService(Context.CONNECTIVITY_SERVICE);

        boolean isConnected = manager.getActiveNetwork() != null && manager.getActiveNetworkInfo().isConnected();

        Log.d("[INTERNET CONNECTION]", Boolean.toString(isConnected));

        callback.invoke(isConnected);
    }

    @ReactMethod
    public void nativePrint(String title, String message) {
        Log.d("[NATIVE PRINT]", title + "\n" + message);
    }


    @ReactMethod
    public void createNativeWallet(String password, Promise promise) {
        try {
            File folder = this.getReactApplicationContext().getExternalFilesDir("wallets");
            if (!folder.exists()) {
                folder.mkdir();
            }

            Bip39Wallet wallet = WalletUtils.generateBip39Wallet(password, folder);
            Credentials credentials = WalletUtils.loadBip39Credentials(password, wallet.getMnemonic());
            ECKeyPair keys = credentials.getEcKeyPair();
            // Mnemonic
            String phrase = wallet.getMnemonic();

            // Address
            String address = credentials.getAddress();

            // Private key
            String privateKey = keys.getPrivateKey().toString(16);


            WritableMap createdWallet = generateWallet(address, phrase, privateKey);

            folder.delete();
            promise.resolve(createdWallet);
        } catch (Exception e) {
            promise.reject("Wallet creation error", e);
        }
    }

    private WritableMap generateWallet(String address, String phrase, String privateKey) {
        WritableMap createdWallet = new WritableNativeMap();
        createdWallet.putString("address", address);
        createdWallet.putString("phrase", phrase);
        createdWallet.putString("privateKey", privateKey);

        return createdWallet;
    }
}
