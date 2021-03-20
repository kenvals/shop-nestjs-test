import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Body,
  HttpCode,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UsersService } from "src/users/user.service";
import { UserLoginDto } from "./dto/user-auth.dto";
import { UserJwtPayload } from "./interface/user-jwt-payload.interface";
@ApiTags("Users")
@Controller("users")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @ApiOperation({
    summary: "Get a token by login and password",
  })
  @Post("login")
  @HttpCode(200)
  async create(@Body() userData: UserLoginDto) {
    try {
      const user = await this.userService.findUserByEmail(userData.email);

      if (!user) {
        throw new NotFoundException(
          `User ${userData.email} is not found`
        );
      }

      if (
        !(await this.userService.compareHash(userData.password, user.password))
      ) {
        throw new ForbiddenException("Incorrect password entered.");
      }

      // тип объекта, для которого создается JWT токен
      const type = "user";

      const payload: UserJwtPayload = {
        id: user.id,
        email: user.email,
      };

      delete user.password;

      const result = {
        token: await this.userService.createToken({ type, payload }),
        user,
      };

      return result;
    } catch (error) {
      throw error;
    }
  }
}
