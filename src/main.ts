import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(
    ConfigService,
  );
  const port: number = config.get<number>('PORT');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  ); // 👈
  await app.listen(port, () => {
    console.log(
      'Application is running on:',
      config.get<string>('BASE_URL'),
    );
  });
}
bootstrap();
