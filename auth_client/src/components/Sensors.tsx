import dateFormat from 'dateformat'
import { History } from 'history'
import update from 'immutability-helper'
import * as React from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader
} from 'semantic-ui-react'

import { createSensor, deleteSensor, getSensors, patchSensor } from '../api/sensors-api'
import Auth from '../auth/Auth'
import { Sensor } from '../types/Sensor'

interface SensorProps {
  auth: Auth
  history: History
}

interface SensorsState {
  sensors: Sensor[]
  newSensorName: string
  loadingSensors: boolean
}

export class Sensors extends React.PureComponent<SensorProps, SensorsState> {
  state: SensorsState = {
    sensors: [],
    newSensorName: '',
    loadingSensors: true
  }

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newSensorName: event.target.value })
  }

  onEditButtonClick = (todoId: string) => {
    this.props.history.push(`/sensors/${todoId}/edit`)
  }

  onSensorCreate = async (event: React.ChangeEvent<HTMLButtonElement>) => {
    try {
      const description = this.calculateDueDate()
      const newSensor = await createSensor(this.props.auth.getIdToken(), {
        name: this.state.newSensorName,
        description
      })
      this.setState({
        sensors: [...this.state.sensors, newSensor],
        newSensorName: ''
      })
    } catch {
      alert('Sensor creation failed')
    }
  }

  onSensorDelete = async (todoId: string) => {
    try {
      await deleteSensor(this.props.auth.getIdToken(), todoId)
      this.setState({
        sensors: this.state.sensors.filter(todo => todo.sensorId != todoId)
      })
    } catch {
      alert('Sensor deletion failed')
    }
  }

  onSensorCheck = async (pos: number) => {
    try {
      const todo = this.state.sensors[pos]
      await patchSensor(this.props.auth.getIdToken(), todo.sensorId, {
        name: todo.name,
        description: todo.description,
        done: !todo.done
      })
      this.setState({
        sensors: update(this.state.sensors, {
          [pos]: { done: { $set: !todo.done } }
        })
      })
    } catch {
      alert('Sensor deletion failed')
    }
  }

  async componentDidMount() {
    try {
      const sensors = await getSensors(this.props.auth.getIdToken())
      this.setState({
        sensors,
        loadingSensors: false
      })
    } catch (e) {
      alert(`Failed to fetch sensors: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">Sensors</Header>

        {this.renderCreateSensorInput()}

        {this.renderSensors()}
      </div>
    )
  }

  renderCreateSensorInput() {
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <Input
            action={{
              color: 'teal',
              labelPosition: 'left',
              icon: 'add',
              content: 'New sensor Location',
              onClick: this.onSensorCreate
            }}
            fluid
            actionPosition="left"
            placeholder="kidsroom..."
            onChange={this.handleNameChange}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Divider />
        </Grid.Column>
      </Grid.Row>
    )
  }

  renderSensors() {
    if (this.state.loadingSensors) {
      return this.renderLoading()
    }

    return this.renderSensorsList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading Sensors
        </Loader>
      </Grid.Row>
    )
  }

  renderSensorsList() {
    return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={3} verticalAlign="middle">
            <Header as="h4">Activated</Header>
          </Grid.Column>
          <Grid.Column width={8} verticalAlign="middle">
            <Header as="h4">Location</Header>            
            </Grid.Column>
        </Grid.Row>        
        <Grid.Column width={16}>
                <Divider />
        </Grid.Column>
        {this.state.sensors.map((sensor, pos) => {
          return (
            <Grid.Row key={sensor.sensorId}>
              <Grid.Column width={3} verticalAlign="middle">
                <Checkbox
                  onChange={() => this.onSensorCheck(pos)}
                  checked={sensor.done}
                />
              </Grid.Column>
              <Grid.Column width={8} verticalAlign="middle">
                {sensor.name}
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                {sensor.description}
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="blue"
                  onClick={() => this.onEditButtonClick(sensor.sensorId)}
                >
                  <Icon name="pencil" />
                </Button>
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="red"
                  onClick={() => this.onSensorDelete(sensor.sensorId)}
                >
                  <Icon name="delete" />
                </Button>
              </Grid.Column>
              {sensor.attachmentUrl && (
                <Image src={sensor.attachmentUrl} size="small" wrapped />
              )}
              <Grid.Column width={16}>
                <Divider />
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    )
  }

  calculateDueDate(): string {
    const date = new Date()
    date.setDate(date.getDate() + 7)

    return dateFormat(date, 'yyyy-mm-dd') as string
  }
}
