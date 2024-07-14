import {
  Stack,
  StackProps,
  aws_iam as iam,
  aws_cloudwatch as cloudwatch,
  aws_sns as sns,
  aws_cloudwatch_actions as actions,
  Duration,
  CfnOutput,
  SecretValue
} from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { ComparisonOperator } from 'aws-cdk-lib/aws-cloudwatch'
import { Topic } from 'aws-cdk-lib/aws-sns'
import { SnsAction } from 'aws-cdk-lib/aws-cloudwatch-actions'
import { LambdaStack } from '../lib/lambda_stack'

export class IacStack extends Stack {
  constructor(scope: Construct, constructId: string, props?: StackProps) {
    super(scope, constructId, props)
    const githubRef = process.env.GITHUB_REF || 'dev'
    const stackName = process.env.STACK_NAME || 'Ac2StackBackdev'
    const projectName = process.env.PROJECT_NAME || 'Ac2Back'

    const lambdaStack = new LambdaStack(this, stackName, props?.env || {})
  }
}
