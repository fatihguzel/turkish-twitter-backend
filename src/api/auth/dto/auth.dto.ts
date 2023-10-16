import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Validate,
} from 'class-validator';

export class IAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
