import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth';
import { PrismaModule } from './prisma';
import { ConfigModule } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import {
  UserController,
  UserModule,
} from './api/user';
import { SwaggerService } from './common/swagger';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: [`/.env`],
      isGlobal: true,
    }),
    SwaggerModule,
  ],
  controllers: [UserController],
  providers: [SwaggerService],
})
export class AppModule {}
