import { IsString, IsDefined } from 'class-validator';

export class UserLoginDto {
  @IsDefined()
  @IsString()
  login: string;

  @IsDefined()
  @IsString()
  password: string;
}
