import { SensorItem } from '../models/SensorItem'
import { SensorItemAccess } from '../dataLayer/sensorsAccess'

import { CreateSensorRequest } from '../requests/CreateSensorRequest'

const sensorItemAccess = new SensorItemAccess()

export async function getAllSensorItems(): Promise<SensorItem[]> {
  return sensorItemAccess.getAllSensorItems()
}

export async function createSensorItem(createSensorRequest: CreateSensorRequest): Promise<SensorItem> {

  const createdAt = new Date(Date.now()).toISOString();
  const userId = 'John'
  const sensorId = '13'
  
  const newSensor = {
    userId,
    sensorId,
    createdAt,
    done: false,
    ...createSensorRequest
  };

  await sensorItemAccess.createSensorItem(newSensor);

  return 
}
