import { AdminEntity, PasswordWidget } from 'nestjs-admin'
import { Users } from './payment.entity'

export class UserAdmin extends AdminEntity {
  entity = Users
  listDisplay = [ 'waxUsername', 'paypalEmail']
  searchFields = ['waxUsername']

  widgets = {
    password: PasswordWidget
  }
}