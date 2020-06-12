
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from './shared/services/config.service'
import { SharedModule } from './shared/shared.module'
import { DefaultAdminModule } from 'nestjs-admin'
import { VotingModule } from './modules/voting/voting.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: ConfigService) =>
                configService.typeOrmConfig,
            inject: [ConfigService],
        }),
        DefaultAdminModule,
        VotingModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule{
}
