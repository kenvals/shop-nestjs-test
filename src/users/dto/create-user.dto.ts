import { IsString, IsDefined, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  email: string;

  @IsDefined()
  @IsString()
  password: string;
}

