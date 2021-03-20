import { ProductEntity } from "./entities/product.entity";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  CacheInterceptor,
  CacheTTL,
  HttpCode,
  UnauthorizedException,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApiParseIntPipe } from "./pipe/api-parse-int.pipe";
import { IFindPaginateOptions } from "./interface/find-paginate.interface";
import { InQueryProductListDto } from "./dto/in-query-product-list.dto";
import { Pagination } from "nestjs-typeorm-paginate";
import { ProductbyIdPipe } from "./pipe/product-by-id.pipe";
import { AuthGuard } from "@nestjs/passport";
import { UniqueUserPipe } from "src/users/pipes/unique-user.pipe";
@ApiTags("Products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
    summary: "Add new product in shop",
  })
  @ApiResponse({
    status: 201,
    description: 'Product added successfully',
    type: CreateProductDto,
  })
  @ApiResponse({
    status: 401,
    description: 'User is not authorized',
    type: UnauthorizedException,
  })
  @Post()
  @UseGuards(AuthGuard())
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @ApiOperation({
    summary: "Get products by pagination",
  })
  @Get()
  async findAll(
    @Query("limit", ApiParseIntPipe) limit: number,
    @Query("skip", ApiParseIntPipe) skip: number,
    @Body() findBody: InQueryProductListDto
  ) {
    const findOptions: IFindPaginateOptions = {
      limit,
      skip,
    };
    try {
      return await this.productsService.fetchPaginatedProductList({
        limit: limit,
        skip: skip,
      });
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({
    summary: "Get a specific product knowing its identifier",
  })
  @Get("fetch")
  @CacheTTL(60)
  @UseInterceptors(CacheInterceptor)
  findOne(@Query("id", ApiParseIntPipe) id: number) {
    return this.productsService.findOne(+id);
  }

  @ApiOperation({
    summary: "Change product with a token",
  })
  @UseGuards(AuthGuard())
  @Patch("fetch")
  update(
    @Query("id", ProductbyIdPipe) productCard: ProductEntity,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(productCard, updateProductDto);
  }
}
