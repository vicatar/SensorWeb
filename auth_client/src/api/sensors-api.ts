import { apiEndpoint } from '../config'
import { Sensor } from '../types/Sensor';
import { CreateSensorRequest } from '../types/CreateSensorRequest';
import Axios from 'axios'
import { UpdateSensorRequest } from '../types/UpdateSensorRequest';

export async function getSensors(idToken: string): Promise<Sensor[]> {
  console.log('Fetching sensors')

  const response = await Axios.get(`${apiEndpoint}/sensors`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Sensors:', response.data)
  return response.data.items
}

export async function createSensor(
  idToken: string,
  newSensor: CreateSensorRequest
): Promise<Sensor> {
  const response = await Axios.post(`${apiEndpoint}/sensors`,  JSON.stringify(newSensor), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  console.log('Sensors:', response.data)
  return response.data.item
}

export async function patchSensor(
  idToken: string,
  sensorId: string,
  updatedSensor: UpdateSensorRequest
): Promise<void> {
  await Axios.patch(`${apiEndpoint}/sensors/${sensorId}`, JSON.stringify(updatedSensor), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function deleteSensor(
  idToken: string,
  sensorId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/sensors/${sensorId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(
  idToken: string,
  sensorId: string
): Promise<string> {
  const response = await Axios.post(`${apiEndpoint}/sensors/${sensorId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await Axios.put(uploadUrl, file)
}
