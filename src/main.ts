import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { table } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Israeli Hostages API')
    .setDescription(
      'Free & OpenSource API for getting info and live news about the 120 Israeli Hostages From 07.10.23',
    )
    .setVersion('1.0')
    .addTag('persons')
    .build();
  const options: SwaggerDocumentOptions = {};
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app
    .useGlobalFilters(new HttpExceptionFilter())
    .listen(process.env['PORT'] || 3000, () =>
      table(
        `NestJS server app with swagger is up and running on http://localhost:3000/api`,
      ),
    );
}

bootstrap();
