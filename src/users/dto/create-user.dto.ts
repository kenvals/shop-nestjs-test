import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDefined, IsEnum } from 'class-validator';

export class CreateUserDto {
  @ApiPropertyOptional({
    description: 'Unique email',
    example:'vasya@mail.ru',
  })
  @IsDefined()
  @IsString()
  email: string;

  @ApiPropertyOptional({
    description: 'User password',
    example:'123456789',
  })
  @IsDefined()
  @IsString()
  password: string;
}

