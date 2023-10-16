import {
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IAuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: IAuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);

    try {
      // save the new user in the database
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Given credentials are already in use.',
          );
        }
      }
      throw error;
    }
  }

  async login(dto: IAuthDto) {
    // find the user in the database
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

    // if user does not exist, throw an error
    if (!user)
      throw new ForbiddenException(
        'Invalid credentials.',
      );

    // compare the password hash
    const passwordMatch = await argon.verify(
      user.hash,
      dto.password,
    );
    // if the password does not match, throw an error
    if (!passwordMatch)
      throw new ForbiddenException(
        'Invalid credentials.',
      );

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '15m',
        secret: process.env.JWT_SECRET_KEY,
      },
    );

    return {
      token: token,
    };
  }
}
