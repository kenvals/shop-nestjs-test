import { IsString, IsDefined } from 'class-validator';

export class CreateProductDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  category?: string;

}
