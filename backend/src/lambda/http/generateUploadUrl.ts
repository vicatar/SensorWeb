import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const sensorId = event.pathParameters.sensorId

  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  console.log(sensorId)
  return undefined
}
