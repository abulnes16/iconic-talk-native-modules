//
//  IconicModule.m
//  talk_native_modules
//
//  Created by Hello Iconic on 5/23/22.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(IconicModule, NSObject)
  
RCT_EXTERN_METHOD(checkInternetConnection)
RCT_EXTERN_METHOD(checkInternetConnectionWithCallback: (RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(
                  nativePrint: (NSString *)title
                  message:(NSString *)message
                )

RCT_EXTERN_METHOD(
     createNativeWallet: (NSString *)password
     resolve: (RCTPromiseResolveBlock)resolve
     rejecter: (RCTPromiseRejectBlock)reject
   )

@end
