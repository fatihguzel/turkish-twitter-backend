import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
} from 'class-validator';

@ValidatorConstraint({
  name: 'isStrongPassword',
  async: false,
})
export class IsStrongPassword
  implements ValidatorConstraintInterface
{
  validate(
    password: string,
    _args: ValidationArguments,
  ) {
    return (
      password.length >= 6 &&
      /[A-Z]/.test(password)
    );
  }

  defaultMessage(_args: ValidationArguments) {
    return 'Şifre en az 6 karakter uzunluğunda olmalı ve en az bir büyük harf içermelidir.';
  }
}
