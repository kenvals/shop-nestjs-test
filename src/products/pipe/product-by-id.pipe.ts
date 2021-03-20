import { ProductsService } from './../products.service';
import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ProductbyIdPipe implements PipeTransform {
  constructor(private readonly productsService: ProductsService) {}

  transform(id: number) {
    console.log(id);
    
    return this.productsService.findProductOrDie({ id });
  }
}
