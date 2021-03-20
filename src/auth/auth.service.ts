import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/user.service';
import { IJwtPayload } from './interface/jwt-payload.interface';
import { UserJwtPayload } from './interface/user-jwt-payload.interface';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
      ) {}


      async validate(jwtPayload: IJwtPayload): Promise<any> {
        // проверяем тип объекта в нагрузке JWT
        if (jwtPayload.type === 'user') {
          /* если это пользователь */
          // получаем данные пользователя из токена JWT
          const userPayload: UserJwtPayload = jwtPayload.payload as UserJwtPayload;
    
          // находим пользователя по email в БД
          return this.usersService.findUserByEmail(userPayload.email);
        }
      }


                  /**
   * Создание токена доступа
   * @param email
   */
     async createToken(payload: IJwtPayload): Promise<string> {
      const expiresIn = '1d';
      const secretOrKey = 'secret';
  
      const token = jwt.sign(payload, secretOrKey, { expiresIn });
  
      return token;
    }
}
