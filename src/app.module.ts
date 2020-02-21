
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { contextMiddleware } from './middlewares'
import { ConfigService } from './shared/services/config.service'
import { SharedModule } from './shared/shared.module'
import { DefaultAdminModule } from 'nestjs-admin'
import { PaymentModule } from './modules/payment/payment.module'
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
        PaymentModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(contextMiddleware).forRoutes('*')
    }
}
