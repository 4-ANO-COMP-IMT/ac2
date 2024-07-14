#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { IacStack } from '../lib/iac_stack'

const app = new cdk.App()

const env = {
  account: process.env.AWS_ACCOUNT_ID,
  region: process.env.AWS_REGION
}

const stackName = process.env.STACK_NAME || 'Ac2StackBackdev'
const projectName = process.env.PROJECT_NAME || 'Ac2Back'

const tags = {
  project: projectName,
  stage: 'DEV',
  stack: 'BACKEND',
  owner: 'AC2'
}

new IacStack(app, stackName, {
  env: env,
  tags: tags
})
