import { Module } from '@nestjs/common'
import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'
import { DefaultAdminSite, DefaultAdminModule } from 'nestjs-admin'
import { UserAdmin} from './payment.admin'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users} from './payment.entity'
import { UserRepository } from './payment.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      Users,
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
  }
}
