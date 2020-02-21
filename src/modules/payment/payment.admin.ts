import { AdminEntity, PasswordWidget } from 'nestjs-admin'
import { Users, Transactions, Withdrawals } from './payment.entity'

export class UserAdmin extends AdminEntity {
  entity = Users
  listDisplay = [ 'waxUsername', 'paypalEmail']
  searchFields = ['waxUsername']

  widgets = {
    password: PasswordWidget
  }
}

export class TransactionAdmin extends AdminEntity {
  entity = Transactions
  listDisplay = ['id', 'waxUsername', 'paypalEmail', 'currentTime', 'dueTime', 'transactionAmount']
  searchFields = ['waxUsername']

  widgets = {
    password: PasswordWidget
  }
}

export class WithdrawalAdmin extends AdminEntity {
  entity = Withdrawals
  listDisplay = ['id', 'waxUsername', 'paypalEmail', 'currentTime', 'dueTime', 'withdrawalAmount']
  searchFields = ['waxUsername']

  widgets = {
    password: PasswordWidget
  }
}
