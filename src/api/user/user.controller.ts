import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorators';
import { User } from '@prisma/client';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
@ApiOkResponse({
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              email: {
                type: 'string',
              },
              createdAt: {
                type: 'string',
              },
              updatedAt: {
                type: 'string',
              },
            },
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
          statusCode: {
            type: 'number',
          },
        },
      },
    },
  },
})
@UseGuards(JwtGuard)
export class UserController {
  @Get('me')
  @ApiSecurity('bearer')
  getMe(@GetUser() user: User) {
    return {
      data: user,
    };
  }
}
