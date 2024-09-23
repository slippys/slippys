import { Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { CachePolicy, Distribution } from 'aws-cdk-lib/aws-cloudfront';
import { S3StaticWebsiteOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import {Certificate, CertificateValidation} from 'aws-cdk-lib/aws-certificatemanager';
import * as path from 'node:path';

export type AppConfig = {
  domainName: string,
  subdomain: string,
} & StackProps;

const __dirname = new URL('.', import.meta.url).pathname;

export class FrontendStack extends Stack {
  constructor(scope: Construct, id: string, props: AppConfig) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'bucket', {
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      autoDeleteObjects: true,
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }
    });

    new BucketDeployment(this, "deployment", {
      sources: [
        Source.asset(path.join(__dirname, '../../../build'))
      ],
      destinationBucket: bucket
    });

    const fullyQualifiedDomainName = `${props.subdomain}.${props.domainName}`;

    const hostedZone = HostedZone.fromLookup(this, 'hosted-zone', { domainName: props.domainName });

    const certificate = new Certificate(this, 'certificate', {
      domainName: fullyQualifiedDomainName,
      validation: CertificateValidation.fromDns(hostedZone)
    });

    const distribution = new Distribution(this, 'distribution', {
      defaultRootObject: 'index.html',
      domainNames: [fullyQualifiedDomainName],
      certificate,
      defaultBehavior: {
        cachePolicy: new CachePolicy(this, 'caching', {
          defaultTtl: Duration.minutes(1)
        }),
        origin: new S3StaticWebsiteOrigin(bucket),
      },
    });

    new ARecord(this, 'a-record', {
      recordName: fullyQualifiedDomainName,
      zone: hostedZone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      ttl: Duration.minutes(1),
    });

  }
}
