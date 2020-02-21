import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'
import { PaymentModule } from './modules/payment/payment.module'

export function setupSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
        .setTitle('API')
        .setDescription('Paypal Payment API Description')
        .setVersion('0.0.1')
        .addBearerAuth()
        .build()

    const document = SwaggerModule.createDocument(app, options,
        { include: [PaymentModule] })
    SwaggerModule.setup('documentation', app, document)
}
