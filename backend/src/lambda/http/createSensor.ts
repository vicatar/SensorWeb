import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateSensorRequest } from '../../requests/CreateSensorRequest'

import { createSensorItem } from '../../businessLogic/sensors';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newSensor: CreateSensorRequest = JSON.parse(event.body)

  // Implement creating a new sensor item
  console.log('Create sensor: ', newSensor)

  const sensors = await createSensorItem(newSensor)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items: sensors
    })
  }
}
