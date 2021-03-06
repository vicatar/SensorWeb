import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { SensorItem } from '../models/SensorItem'
import { SensorUpdate } from '../models/SensorUpdate'
import { SignedURLRequest} from '../models/SignedUrlRequest'
import * as AWSXRay from 'aws-xray-sdk'
const XAWS = AWSXRay.captureAWS(AWS);

const s3 = new XAWS.S3({
  signatureVersion: 'v4'
})

export class SensorItemAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly indexName = process.env.SENSOR_ID_INDEX,
    private readonly sensorsTable = process.env.SENSOR_TABLE
    ) { }

  async getAllSensorItems(userId: string): Promise<SensorItem[]> {
    console.log('Getting all Sensors')

    const result = await this.docClient.query({
      TableName: this.sensorsTable,
      IndexName: this.indexName,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }).promise()

    return result.Items as SensorItem[]
  }

  async createSensorItem(sensorItem: SensorItem) {
    await this.docClient.put({
      TableName: this.sensorsTable,
      Item: sensorItem
    }).promise()
  }

  async deleteSensorItem(userId: string, sensorId: string) {
    await this.docClient.delete({
      TableName: this.sensorsTable,
      Key: {
        userId,
        sensorId
      }
    }).promise()
  }

  async getSensor(userId: string, sensorId: string) {
    const result = await this.docClient.get({
      TableName: this.sensorsTable,
      Key: {
        userId,
        sensorId,
      }
    }).promise();

    return result.Item as SensorItem;
  }

  async updateSensorItem(userId: string, sensorId: string, updatedSensorItem: SensorUpdate) {
    await this.docClient.update({
      TableName: this.sensorsTable,
      Key: {
        userId,
        sensorId
      },
      UpdateExpression: 'set #name = :n, #activated = :d',
      ExpressionAttributeValues: {
        ':n': updatedSensorItem.name,
        ':d': updatedSensorItem.activated
      },
      ExpressionAttributeNames: {
        '#name': 'name',
        '#activated': 'activated'
      }
    }).promise();
  }
}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE == "true") {
    console.log('Creating a local DynamoDB instance')
    return new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new XAWS.DynamoDB.DocumentClient();
}

export function getPresignedUploadURL(createSignedUrlRequest: SignedURLRequest) {
  return s3.getSignedUrl('putObject', createSignedUrlRequest);
}