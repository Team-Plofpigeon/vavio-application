//
//  VAFileUploadUtil.m
//  VavioApplication
//
//  Created by Boris Besemer on 24-04-15.
//  Copyright (c) 2015 Team Plofpigeon. All rights reserved.
//

#import "VAFileUploadUtil.h"


@implementation VAFileUploadUtil

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(writeFile:(NSString *)fileName
                  withContents:(NSString *)contents
                  errorCallback:(RCTResponseSenderBlock)failureCallback
                  callback:(RCTResponseSenderBlock)successCallback) {
  
  NSLog(@"%@ %@", NSStringFromClass([self class]), NSStringFromSelector(_cmd));
  
  successCallback(@[@"Write method called"]);
}

@end
