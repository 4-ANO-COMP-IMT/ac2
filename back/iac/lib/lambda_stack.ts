import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { CfnOutput, Duration } from 'aws-cdk-lib'
import * as path from 'path'

export class LambdaStack extends Construct {
  public readonly lambdaFunction: lambda.Function

  constructor(scope: Construct, stackName: string, env: Record<string, any>) {
    super(scope, `${stackName}`)

    const projectName = env.PROJECT_NAME
    const githubRef = env.GITHUB_REF || ''

    let stage
    if (githubRef.includes('prod')) {
      stage = 'PROD'
    } else if (githubRef.includes('homolog')) {
      stage = 'HOMOLOG'
    } else if (githubRef.includes('dev')) {
      stage = 'DEV'
    } else {
      stage = 'TEST'
    }

    this.lambdaFunction = new lambda.Function(
      this,
      `${env.STACK_NAME}-${stage}`,
      {
        functionName: `${env.PROJECT_NAME}-${stage}`,
        code: lambda.Code.fromAsset(path.join(__dirname, `../../back/dist/`)),
        handler: `index.handler`,
        runtime: lambda.Runtime.NODEJS_20_X,
        environment: {

        },
        timeout: Duration.seconds(15),
        memorySize: 512
      }
    )

    const lambdaUrl = this.lambdaFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE
    })

    new CfnOutput(this, `${env.STACK_NAME}UrlValue`, {
      value: lambdaUrl.url,
      exportName: projectName + 'UrlValue'
    })
  }
}
