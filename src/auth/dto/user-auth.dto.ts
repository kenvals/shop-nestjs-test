import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDefined } from 'class-validator';

export class UserLoginDto {
  @ApiPropertyOptional({
    description: 'Unique email',
    example:'vasya@mail.ru',
  })
  @IsDefined()
  @IsString()
  email: string;


  @ApiPropertyOptional({
    description: 'Password user',
    example:'123456789',
  })
  @IsDefined()
  @IsString()
  password: string;
}
