//
//  IconicModule.swift
//  talk_native_modules
//
//  Created by Hello Iconic on 5/23/22.
//

import Foundation
import Network
import web3swift

@objc(IconicModule)
class IconicModule: NSObject{
  
  @available(iOS 12.0, *)
  @objc
  func checkInternetConnection() -> Void {
    let monitor = NWPathMonitor()
    monitor.pathUpdateHandler = {
      pathUpdateHandler in if pathUpdateHandler.status == .satisfied {
        print("Internet connection is on")
      }else {
        print("There is no internet connection")
      }
    }
  }
  
  @available(iOS 12.0, *)
  @objc
  func checkInternetConnectionWithCallback(_ callback: RCTResponseSenderBlock) -> Void {
    let monitor = NWPathMonitor()
    var isConnected = false
    monitor.pathUpdateHandler = {
      pathUpdateHandler in if pathUpdateHandler.status == .satisfied {
        isConnected = true
      }else {
        isConnected = false
      }
    }
    
    callback([isConnected])
  }
  
  @objc
  func nativePrint(_ title: NSString, _ message: NSString) -> Void {
    print("[NATIVE PRINT]:\(title) \n \(message)")
  }
  
  @objc
    func createNativeWallet(_ password: NSString, resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
     
      do {
        // The wallet is created with the user password
        let userPassword = password as String
        // We generate the random mnemonics
        let mnemonics = try BIP39.generateMnemonics(bitsOfEntropy: self.bitsOfEntropy)
        // Then we create the wallet in the keystore
        let keystore = try BIP32Keystore(mnemonics: mnemonics! ,password: userPassword)
        // We obtain the wallet address
        let address = keystore?.addresses?.first?.address
        let etherAddress = EthereumAddress(address!)
        // Finally we obtain the private key and we send it to React Native
        let pkData = try keystore?.UNSAFE_getPrivateKeyData(password: userPassword, account: etherAddress!).toHexString();
        
        let createdWallet = ["privateKey": pkData, "address": address, "phrase": mnemonics ]
        
        resolve(createdWallet)
        
      } catch let error  {
        print("[Native Wallet]: Error in creating wallet")
        reject("CREATION_ERROR","We couldn't create the wallet", error)
      }
      
    }
  
  @objc
    static func requiresMainQueueSetup() -> Bool {
      return true
    }
  
}
