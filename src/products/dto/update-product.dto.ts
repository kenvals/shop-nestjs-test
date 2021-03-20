import { PartialType } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    
    @IsDefined()
    @IsString()
    name?: string;
  
    @IsDefined()
    @IsString()
    category: string;
}
