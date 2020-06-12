import { AdminEntity, PasswordWidget } from 'nestjs-admin'
import { Users } from './voting.entity'

export class UserAdmin extends AdminEntity {
  entity = Users
  listDisplay = ['id', 'name', 'email', 'adharId', 'state', 'gender', 'contactNumber', 'voterId', 'status']
  searchFields = ['id', 'name', 'email', 'adharId', 'state', 'gender', 'contactNumber', 'voterId']
}
