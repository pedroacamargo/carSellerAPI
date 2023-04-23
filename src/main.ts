import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['hello baby']
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true   // If we type an additional parameters in request POST, the parameters will be stripped 
    })
  );
  await app.listen(3000);
}
bootstrap();
