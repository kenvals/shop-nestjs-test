import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/user.service';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
      ) {}
}
