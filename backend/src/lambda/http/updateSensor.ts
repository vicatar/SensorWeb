import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateSensorRequest } from '../../requests/UpdateSensorRequest'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const sensorId = event.pathParameters.sensorId
  const updatedSensor: UpdateSensorRequest = JSON.parse(event.body)

  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  console.log(sensorId)
  console.log(updatedSensor)
  return undefined
}
