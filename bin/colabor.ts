#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ColaborStack } from '../lib/colabor-stack';

const app = new cdk.App();
new ColaborStack(app, 'ColaborStack');
