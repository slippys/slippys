import {SourceMapMode, BundlingOptions} from 'aws-cdk-lib/aws-lambda-nodejs';
import {Runtime} from 'aws-cdk-lib/aws-lambda';

export const appName = 'storefront';
export const domainName = 'slippys.cool';
export const apiSubDomain = 'api';
export const frontendSubDomain = 'store';

export const bundlingOptions: BundlingOptions = {
  minify: true,
  sourceMap: true,
  sourceMapMode: SourceMapMode.INLINE,
  sourcesContent: false,
  target: 'esNext',
  bundleAwsSDK: true,
  externalModules: ['@aws-sdk/*'],
};

export const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: 'us-east-1',
}

export const nodeRuntime = Runtime.NODEJS_18_X
