import * as uuid from 'uuid';

import { SensorItem } from '../models/SensorItem'
import { SensorItemAccess } from '../dataLayer/sensorsAccess'
import { APIGatewayProxyEvent } from 'aws-lambda';
import { createLogger } from '../utils/logger'

import { CreateSensorRequest } from '../requests/CreateSensorRequest'
import { UpdateSensorRequest } from '../requests/UpdateSensorRequest';
import { getUserId } from '../lambda/utils';

const sensorItemAccess = new SensorItemAccess()
const logger = createLogger('businessLogic');

export async function getAllSensorItems(event: APIGatewayProxyEvent): Promise<SensorItem[]> {
  const userId = getUserId(event);
  logger.info('Get sensor items for ', userId);  
  
  return sensorItemAccess.getAllSensorItems(userId)
}

export async function createSensorItem(event: APIGatewayProxyEvent,
          createSensorRequest: CreateSensorRequest): Promise<SensorItem> {

  const createdAt = new Date(Date.now()).toISOString();
  const userId = getUserId(event);
  const sensorId = uuid.v4();  
  
  const newSensor = {
    userId,
    sensorId,
    createdAt,
    done: false,
    ...createSensorRequest
  };

  logger.info('Creating new sensor item');
  await sensorItemAccess.createSensorItem(newSensor);

  return newSensor
}

export async function deleteSensorItem(event: APIGatewayProxyEvent) {
  const sensorId = event.pathParameters.sensorId;
  const userId = getUserId(event);

  if (!(await sensorItemAccess.getSensor(userId, sensorId))) {
    return false;
  }
  await sensorItemAccess.deleteSensorItem(userId, sensorId);

  return 
}

export async function updateSensorItem(event: APIGatewayProxyEvent,
  updateSensorRequest: UpdateSensorRequest) {

  const sensorId = event.pathParameters.todoId;
  const userId = getUserId(event);

  if (!(await sensorItemAccess.getSensor(userId, sensorId))) {
  return false;
  }
  await sensorItemAccess.updateSensorItem(userId, sensorId, updateSensorRequest);
  logger.info('Update sensor item');

return 
}
