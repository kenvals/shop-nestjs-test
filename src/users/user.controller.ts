import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiConflictResponse, ApiOperation, ApiResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UniqueUserPipe } from './pipes/unique-user.pipe';
import { UsersService } from './user.service';
@ApiTags("Users")

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}


  @ApiOperation({
    summary:"add new user for shop",
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    // type: UserDto,
  })
  @ApiConflictResponse({
    description: 'The user with the entered email exists',
  })
  @Post('signup')
  create(@Body(UniqueUserPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

}


