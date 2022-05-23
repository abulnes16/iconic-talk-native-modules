//
//  IconicModule.swift
//  talk_native_modules
//
//  Created by Hello Iconic on 5/23/22.
//

import Foundation
import SystemConfiguration
import web3swift

@objc(IconicModule)
class IconicModule: NSObject{
  
  private let bitsOfEntropy = 128
  
  @available(iOS 12.0, *)
  @objc
  func checkInternetConnection() -> Void {
    var zeroAddress = sockaddr_in(sin_len: 0, sin_family: 0, sin_port: 0, sin_addr: in_addr(s_addr: 0), sin_zero: (0, 0, 0, 0, 0, 0, 0, 0))
           zeroAddress.sin_len = UInt8(MemoryLayout.size(ofValue: zeroAddress))
           zeroAddress.sin_family = sa_family_t(AF_INET)

           let defaultRouteReachability = withUnsafePointer(to: &zeroAddress) {
               $0.withMemoryRebound(to: sockaddr.self, capacity: 1) {zeroSockAddress in
                   SCNetworkReachabilityCreateWithAddress(nil, zeroSockAddress)
               }
           }

           var flags: SCNetworkReachabilityFlags = SCNetworkReachabilityFlags(rawValue: 0)
           if SCNetworkReachabilityGetFlags(defaultRouteReachability!, &flags) == false {
               print("[INTERNET CONNECTION]: False")
           }

         

           // Working for Cellular and WIFI
           let isReachable = (flags.rawValue & UInt32(kSCNetworkFlagsReachable)) != 0
           let needsConnection = (flags.rawValue & UInt32(kSCNetworkFlagsConnectionRequired)) != 0
           let ret = (isReachable && !needsConnection)

          print("[INTERNET CONNECTION]: \(ret)")

  }
  
  @available(iOS 12.0, *)
  @objc
  func checkInternetConnectionWithCallback(_ callback: RCTResponseSenderBlock) -> Void {
    var zeroAddress = sockaddr_in(sin_len: 0, sin_family: 0, sin_port: 0, sin_addr: in_addr(s_addr: 0), sin_zero: (0, 0, 0, 0, 0, 0, 0, 0))
           zeroAddress.sin_len = UInt8(MemoryLayout.size(ofValue: zeroAddress))
           zeroAddress.sin_family = sa_family_t(AF_INET)

           let defaultRouteReachability = withUnsafePointer(to: &zeroAddress) {
               $0.withMemoryRebound(to: sockaddr.self, capacity: 1) {zeroSockAddress in
                   SCNetworkReachabilityCreateWithAddress(nil, zeroSockAddress)
               }
           }

           var flags: SCNetworkReachabilityFlags = SCNetworkReachabilityFlags(rawValue: 0)
           if SCNetworkReachabilityGetFlags(defaultRouteReachability!, &flags) == false {
               callback([false])
           }

          

           // Working for Cellular and WIFI
           let isReachable = (flags.rawValue & UInt32(kSCNetworkFlagsReachable)) != 0
           let needsConnection = (flags.rawValue & UInt32(kSCNetworkFlagsConnectionRequired)) != 0
           let ret = (isReachable && !needsConnection)

          callback([ret])
  }
  
  @objc
  func nativePrint(_ title: NSString, message: NSString) -> Void {
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
