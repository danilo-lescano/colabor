#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ColaborStack } from '../lib/colabor-stack';

const app = new cdk.App();
new ColaborStack(app, 'ColaborStack', {
    env: {
      account: '723542210814', // Replace with your account id
      region: 'sa-east-1',
    },
});