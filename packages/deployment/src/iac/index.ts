#!/usr/bin/env node
import {App} from 'aws-cdk-lib';
import {RestApiStack} from 'rest-api';
import {domainName, env, appName, apiSubDomain, frontendSubDomain} from 'config';
import {FrontendStack} from 'frontend';

const app = new App();

new FrontendStack(app, `${appName}-frontend-stack`, {
    env,
    domainName,
    subdomain: frontendSubDomain,
});

new RestApiStack(app, `${appName}-rest-api-stack`, {
    env,
    domainName,
    subdomain: apiSubDomain,
});
