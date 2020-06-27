import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateSensorRequest } from '../../requests/UpdateSensorRequest'

import { updateSensorItem } from '../../businessLogic/sensors';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const sensorId = event.pathParameters.sensorId
  const updatedSensor: UpdateSensorRequest = JSON.parse(event.body)

  // Update a sensor item with the provided id using values in the "updatedSensor" object
  console.log('Update sensor: ', sensorId, updatedSensor)

  const sensor = await updateSensorItem(event, updatedSensor)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      item: sensor
    })
  }
}
