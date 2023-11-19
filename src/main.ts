import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { config as dotenv } from 'dotenv';
import { table } from 'console';

async function bootstrap() {
  dotenv();
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Israeli Hostages API')
    .setBasePath('/persons')
    .setDescription(process.env.desc)
    .setVersion('1.0')
    .addTag('persons')
    .build();
  const options: SwaggerDocumentOptions = {} 
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app
    .useGlobalFilters(new HttpExceptionFilter())
    .listen(process.env['PORT'] || 3000, () => table(`NestJS server app with swagger is up and running on http://localhost:3000/api`));
}

bootstrap();
