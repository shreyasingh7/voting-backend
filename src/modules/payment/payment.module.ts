import { Module } from '@nestjs/common'
import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'
import { DefaultAdminSite, DefaultAdminModule } from 'nestjs-admin'
import { UserAdmin, TransactionAdmin, WithdrawalAdmin } from './payment.admin'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users, Transactions, Withdrawals } from './payment.entity'
import { WithdrawalRepository, TransactionRepository, UserRepository } from './payment.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      WithdrawalRepository,
      TransactionRepository,
      Users,
      Transactions,
      Withdrawals,
    ]),
    DefaultAdminModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService]
})

export class PaymentModule {
  constructor(private readonly adminSite: DefaultAdminSite) {
    adminSite.register('Users', UserAdmin)
    adminSite.register('Transactions', TransactionAdmin)
    adminSite.register('Withdrawals', WithdrawalAdmin)
  }
}
