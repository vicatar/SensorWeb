import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const sensorId = event.pathParameters.sensorId

  // TODO: Remove a TODO item by id
  console.log(sensorId)
  return undefined
}
