import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IJwtPayload } from 'src/auth/interface/jwt-payload.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  
  /**
   * Добавление нового пользователя
   * @param userData данные пользователя
   */
   async create(userData: CreateUserDto): Promise<UserEntity> {

    const user = plainToClass(UserEntity, userData);

    try {
      user.getPasswordHash();
      const newUser = await this.userRepository.save(user);
      delete newUser.password;

      return newUser;
    } catch (error) {
      throw error;
    }
  }
    /**
   * Поиск пользователя в БД по логину
   * @param login логин пользователя
   */
     findUserByLogin(login: string): Promise<UserEntity> {
      return this.userRepository.findOne({ where: { login } });
    }

        /**
   * Сравнивает пароль с хэшем
   * @param password пароль
   * @param hash хэш
   */
         async compareHash(password: string, hash: string): Promise<boolean> {
          return bcrypt.compare(password, hash);
        }
    
            /**
   * Создание токена доступа
   * @param login
   */
     async createToken(payload: IJwtPayload): Promise<string> {
      const expiresIn = '1d';
      const secretOrKey = 'secret';
  
      const token = jwt.sign(payload, secretOrKey, { expiresIn });
  
      return token;
    }

}
