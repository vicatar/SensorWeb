import * as React from 'react'
import { GroupModel } from '../types/GroupModel'
import { Group } from './Group'
import { getGroups, deleteSensor } from '../api/groups-api'
import { Card, Button, Divider, Icon } from 'semantic-ui-react'
import { History } from 'history'

interface GroupsListProps {
  history: History
}

interface GroupsListState {
  groups: GroupModel[]
}

export class GroupsList extends React.PureComponent<GroupsListProps, GroupsListState> {
  state: GroupsListState = {
    groups: []
  }

  handleCreateGroup = () => {
    this.props.history.push(`/groups/create`)
  }

  async componentDidMount() {
    try {
      const groups = await getGroups()
      this.setState({
        groups
      })
    } catch (e) {
      alert(`Failed to fetch groups: ${e.message}`)
    }
  }

  onSensorDelete = async (sensorId: string) => {
    try {
      await deleteSensor(sensorId)
      this.setState({
        groups: this.state.groups.filter(group => group.sensorId != sensorId)
      })
    } catch {
      alert('Todo deletion failed')
    }
  }

  render() {
    return (
      <div>
        <h1>Sensors</h1>

        <Button
          primary
          size="huge"
          className="add-button"
          onClick={this.handleCreateGroup}
        >
          Create new sensor
        </Button>

        <Button
          icon
          color="red"
          onClick={() => this.onSensorDelete('13')}
        >
          <Icon name="delete" />
        </Button>

        <Divider clearing />

        <Card.Group>
          {this.state.groups.map(group => {
            return <Group key={group.sensorId} group={group} />
          })}
        </Card.Group>
      </div>
    )
  }
}
