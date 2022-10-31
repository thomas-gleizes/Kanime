import { v4 as uuidv4 } from 'uuid'

export default function domUuid() {
  return uuidv4().split('-').join('')
}
