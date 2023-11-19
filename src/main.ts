import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  require('dotenv').config()
  
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Israeli Hostages API')
  .setBasePath('https://api.bthh.org')
  .setDescription(process.env.desc)
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}

bootstrap();
