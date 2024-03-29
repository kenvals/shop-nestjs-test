import { AuthService } from "./../auth/auth.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { UsersService } from "./user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
