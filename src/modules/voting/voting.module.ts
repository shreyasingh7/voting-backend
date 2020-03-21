import { Module } from '@nestjs/common'
import { VotingController } from './voting.controller'
import { VotingService } from './voting.service'
import { DefaultAdminSite, DefaultAdminModule } from 'nestjs-admin'
import { UserAdmin} from './voting.admin'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users} from './voting.entity'
import { UserRepository, CountRepository } from './voting.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      CountRepository,
      Users,
    ]),
    DefaultAdminModule
  ],
  controllers: [VotingController],
  providers: [VotingService],
  exports: [VotingService]
})

export class VotingModule {
  constructor(private readonly adminSite: DefaultAdminSite) {
    adminSite.register('Users', UserAdmin)
  }
}
