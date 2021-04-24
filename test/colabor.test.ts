import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Colabor from '../lib/colabor-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Colabor.ColaborStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
