import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDefined } from 'class-validator';

export class CreateProductDto {
  @ApiPropertyOptional({
    description: 'Product name to display',
    example:'European style evening dress',
  })
  @IsDefined()
  @IsString()
  name: string;


  @ApiPropertyOptional({
    description: 'Category where to classify a new product',
    example:'other',
  })
  @IsDefined()
  @IsString()
  category?: string;

}
