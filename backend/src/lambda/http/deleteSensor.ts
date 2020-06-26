import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

import { deleteSensorItem } from '../../businessLogic/sensors';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const sensorId = event.pathParameters.sensorId

  // Remove a TODO item by id
  console.log('Delete sensor: ', sensorId)

  const sensors = await deleteSensorItem(event)

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
