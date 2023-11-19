import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { config as dotenv } from 'dotenv';

async function bootstrap() {
  dotenv();
  const config = new DocumentBuilder()
    .setTitle('Israeli Hostages API')
    .setBasePath('https://api.bthh.org')
    .setDescription(process.env.desc)
    .setVersion('1.0.0')
    .build();

  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.useGlobalFilters(new HttpExceptionFilter()).listen(3000);
}

bootstrap();
