import * as cdk from '@aws-cdk/core';
import * as sns from '@aws-cdk/aws-sns';

export class ColaborStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new sns.Topic(this, 'MyTopic', {
      displayName: 'MySuperTopic',
    });
  }
}
