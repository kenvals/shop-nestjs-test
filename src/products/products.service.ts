import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindConditions, Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { InQueryProductListDto } from "./dto/in-query-product-list.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductEntity } from "./entities/product.entity";
import { IFindPaginateOptions } from "./interface/find-paginate.interface";
import { Pagination } from "./pagination/pagination";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  /**
   * Добавление нового товара
   * @param createProductDto данные создаваемого товара
   */
  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    try {
      const product = await this.productRepository.save(createProductDto);

      return product;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Получение списка товаров по пагинации
   */

  async fetchPaginatedProductList(
    options,
  ): Promise<Pagination<ProductEntity>> {
    const [results, total] = await this.productRepository.findAndCount({
      take: options.limit,
      skip: options.skip, // think this needs to be page * limit
    });

    return new Pagination<ProductEntity>({
      results,
      total,
    });
  }


  async findOne(id: number) {
    try {
      const product = await this.productRepository.findOne(id);

      if (!product) {
        throw new NotFoundException('cant find the current product');
      }

      return product;
    } catch (err) {
      throw err;
    }  }

  async update(productCard:ProductEntity, updateProductDto: UpdateProductDto) {
    Object.keys(updateProductDto).forEach(key => {
      productCard[key] = updateProductDto[key];
    });

    try {
      await this.productRepository.save(productCard);

      return updateProductDto;
    } catch (err) {
      throw new Error(err);
    }
  }

    /**
   * Находит ID продукта или вызывает исключение
   * @param findConditions
   */
     async findProductOrDie(findConditions: FindConditions<ProductEntity>) {
      const productCard: ProductEntity = await this.productRepository.findOne({
        where: findConditions,
      });
  
      if (!productCard) {
        throw new NotFoundException(`The requested product does not exist`);
      }
  
      return productCard;
    }
}
