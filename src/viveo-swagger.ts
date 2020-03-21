import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'
import { VotingModule } from './modules/voting/voting.module'

export function setupSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
        .setTitle('API')
        .setDescription('Voting API Description')
        .setVersion('0.0.1')
        .addBearerAuth()
        .build()

    const document = SwaggerModule.createDocument(app, options,
        { include: [VotingModule] })
    SwaggerModule.setup('documentation', app, document)
}
