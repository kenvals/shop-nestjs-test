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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiPropertyOptional,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ApiParseIntPipe } from "./pipe/api-parse-int.pipe";
import { IFindPaginateOptions } from "./interface/find-paginate.interface";
import { InQueryProductListDto } from "./dto/in-query-product-list.dto";
import { Pagination } from "nestjs-typeorm-paginate";
import { ProductbyIdPipe } from "./pipe/product-by-id.pipe";
import { AuthGuard } from "@nestjs/passport";
import { UniqueUserPipe } from "src/users/pipes/unique-user.pipe";
import { json } from "express";
@ApiTags("Products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
    summary: "Add new product in shop",
  })
  @ApiResponse({
    status: 201,
    description: "Product added successfully",
  })
  @ApiResponse({
    status: 401,
    description: "User is not authorized",
    type: UnauthorizedException,
  })
  @ApiBody({
    required: true,
    description: "Data possessed by a new product",
    type: CreateProductDto,
  })
  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard())
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @ApiOperation({
    summary: "Get products by pagination",
  })
  @ApiResponse({
    status: 200,
    description: "products loaded successfully by pagination",
  })
  @ApiQuery({
    name: "limit",
    required: true,
    description: "Number of records to display",
    type: Number,
  })
  @ApiQuery({
    name: "skip",
    required: true,
    description: "How many records to skip relative to the first",
    type: Number,
  })
  @Get()
  async findAll(
    @Query("limit", ApiParseIntPipe) limit: number,
    @Query("skip", ApiParseIntPipe) skip: number
  ) {
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
  @ApiResponse({
    status: 200,
    description: "get a specific essence of the product by id",
  })
  @ApiResponse({
    status: 404,
    description: "Product not found in the database",
  })
  @ApiQuery({
    name: "id",
    required: true,
    description: "Product identifier in the database",
    type: Number,
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
  @ApiResponse({
    status: 200,
    description: "Product changed successfully",
  })
  @ApiResponse({
    status: 401,
    description: "User is not logged in",
  })
  @ApiBody({
    required: true,
    description: "Data that needs to be changed (being validated)",
    type: UpdateProductDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Patch("fetch")
  update(
    @Query("id", ProductbyIdPipe) productCard: ProductEntity,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(productCard, updateProductDto);
  }
}
