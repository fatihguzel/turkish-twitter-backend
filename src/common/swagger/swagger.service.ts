import { Injectable } from '@nestjs/common';

@Injectable()
export class SwaggerService {
  getSwaggerConfig() {
    return {
      swagger: '2.0',
      info: {
        title: 'Turkish Twitter API',
        description:
          'Turkish Twitter API description',
        version: '1.0',
      },
      host: 'localhost:3000',
      basePath: '/',
      schemes: ['http'],
    };
  }
}
