# Serverless Sensorweb

# Functionality of the application

This application will allow creating/removing/updating/fetching Sensorweb items. Each Sensorweb item can optionally have an attachment image. Each user only has access to Sensorweb items that he/she has created.

# Sensorweb items

The application should store Sensorweb items, and each Sensorweb item contains the following fields:

* `sensorId` (string) - a unique id for an item
* `createdAt` (string) - date and time when an item was created
* `location` (string) - Location of a Sensorweb item (e.g. "Family Room")
* `activated` (boolean) - true if an sensor is activated, false otherwise
* `count` (string) - number of times a sensor has been activated
* `attachmentUrl` (string) (optional) - a URL pointing to an image attached to a Sensorweb item

We aslo store an id of a user who created a Sensorweb item.

# Functions implemented

* `Auth` - this function implements a custom authorizer for API Gateway that should be added to all other functions.

* `GetSensors` - returns all Sensorwebs for a current user. A user id can be extracted from a JWT token that is sent by the frontend

It returns data that looks like this:

```json
{
  "items": [
    {
      "sensorId": "123",
      "createdAt": "2019-07-27T20:01:45.424Z",
      "location": "Bedroom",
      "count": 0,
      "activated": false,
      "attachmentUrl": "http://example.com/image.png"
    },
    {
      "sensorId": "456",
      "createdAt": "2019-07-27T20:01:45.424Z",
      "name": "Send a letter",
      "dueDate": "2019-07-29T20:01:45.424Z",
      "done": true,
      "attachmentUrl": "http://example.com/image.png"
    },
  ]
}
```

* `CreateSensorweb` - creates a new Sensorweb for a current user. A shape of data send by a client application to this function can be found in the `CreateSensorwebRequest.ts` file

* `UpdateSensorweb` - should update a Sensorweb item created by a current user. A shape of data send by a client application to this function can be found in the `UpdateSensorwebRequest.ts` file

The id of an item that should be updated is passed as a URL parameter.

It returns an empty body.

* `DeleteSensorweb` - should delete a Sensorweb item created by a current user. Expects an id of a Sensorweb item to remove.

It returns an empty body.

* `GenerateUploadUrl` - returns a pre-signed URL that can be used to upload an attachment file for a Sensorweb item.

It should return a JSON object that looks like this:

```json
{
  "uploadUrl": "https://s3-bucket-name.s3.eu-west-2.amazonaws.com/image.png"
}
```

