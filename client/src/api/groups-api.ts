import { GroupModel } from '../types/GroupModel'
import { apiEndpoint } from '../config'
import { GroupUploadInfo } from '../types/GroupUploadInfo'

export async function getGroups(): Promise<GroupModel[]> {
  console.log('Fetching groups')

  const response = await fetch(`${apiEndpoint}/todos`)
  const result = await response.json()

  return result.items
}

export async function createGroup(newGroup: GroupUploadInfo): Promise<GroupModel> {

  const reply = await fetch(`${apiEndpoint}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newGroup.name,
      createdAt: newGroup.dueDate,
      done: newGroup.done
    })
  })
  const result = await reply.json();
  return result.newItem
}
