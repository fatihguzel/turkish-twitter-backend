import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuthDto } from './dto';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
@ApiOkResponse({
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          token: {
            type: 'string',
          },
        },
      },
    },
  },
})
@ApiBadRequestResponse({
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
          error: {
            type: 'string',
          },
          statusCode: {
            type: 'number',
          },
        },
      },
    },
  },
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: IAuthDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: IAuthDto) {
    return this.authService.login(dto);
  }
}
