import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './api/user/user.controller';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: [`/.env`],
      isGlobal: true,
    }),
  ],
  controllers: [UserController],
})
export class AppModule {}
