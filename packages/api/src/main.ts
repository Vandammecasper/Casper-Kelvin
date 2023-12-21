import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  require('dotenv').config();

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:8081',
      process.env.URL_FRONTEND,
    ],
    credentials: true,
  });


  await app.listen(3000);

  console.info(`Server is running on: ${await app.getUrl()}`)
  console.info(`Graphql is running on: ${await app.getUrl()}/graphql`)

}
bootstrap();
