import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { SensorItem } from '../models/SensorItem'

export class SensorItemAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
//    private readonly indexName = process.env.TODO_ID_INDEX,
    private readonly sensorsTable = process.env.SENSOR_TABLE
    ) { }

  async getAllSensorItems(): Promise<SensorItem[]> {
    console.log('Getting all Sensors')

    const result = await this.docClient.scan({
      TableName: this.sensorsTable
//      IndexName: this.indexName,
    }).promise()

    return result.Items as SensorItem[]
  }

  async createSensorItem(sensorItem: SensorItem) {
    await this.docClient.put({
      TableName: this.sensorsTable,
      Item: sensorItem
    }).promise()
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

  return new AWS.DynamoDB.DocumentClient()
}
