import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerService } from './common/swagger'; // Bu yolun doğru olduğundan emin olun
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  // **************** Nest App Create ****************
  const app = await NestFactory.create(AppModule);

  // **************** Config ****************
  const config: ConfigService = app.get(
    ConfigService,
  );

  // **************** Port *****************
  const port: number = config.get<number>('PORT');

  // **************** Validation ****************
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // **************** Swagger UI ****************
  const swaggerService = app.get(SwaggerService);
  const swaggerConfig =
    swaggerService.getSwaggerConfig();

  const options = new DocumentBuilder()
    .setTitle(swaggerConfig.info.title)
    .setDescription(
      swaggerConfig.info.description,
    )
    .setVersion(swaggerConfig.info.version)
    .addServer(config.get<string>('BASE_URL'))
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(
    app,
    options,
  );

  SwaggerModule.setup('api', app, document);

  // **************** Listen ****************
  await app.listen(port, () => {
    console.log(
      'Application is running on:',
      config.get<string>('BASE_URL'),
    );
  });
}
bootstrap();
