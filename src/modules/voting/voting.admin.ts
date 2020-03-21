import { AdminEntity, PasswordWidget } from 'nestjs-admin'
import { Users } from './voting.entity'

export class UserAdmin extends AdminEntity {
  entity = Users
  listDisplay = [ 'waxUsername', 'paypalEmail']
  searchFields = ['waxUsername']

  widgets = {
    password: PasswordWidget
  }
}
