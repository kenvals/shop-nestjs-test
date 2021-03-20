import { PipeTransform, ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../user.service';

/**
 * Проверяет уникальность логина пользователя в БД.
 * Если пользователь с введенным логином существует в БД, вызвает ошибку.
 */

@Injectable()
export class UniqueUserPipe implements PipeTransform {
  constructor(private readonly userService: UsersService) {}

  async transform(userObject: CreateUserDto) {
    const isUser = await this.userService.findUserByEmail(userObject.email);
    if (isUser) {
      throw new ConflictException(
        'The user with the entered email exists'
      );
    }
    return userObject;
  }
}
