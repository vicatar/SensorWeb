/**
 * Fields in a request to update a single TODO item.
 */
export interface UpdateSensorRequest {
  name: string
  description: string
  activated: boolean
}