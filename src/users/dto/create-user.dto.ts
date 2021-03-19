import { IsString, IsDefined, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  login: string;

  @IsDefined()
  @IsString()
  password: string;
}

