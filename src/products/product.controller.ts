import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './products.service';
import { ConfigService } from '@nestjs/config';

@Controller('api/products/')
export class ProductController {
  // Dependency injection
  constructor(private readonly productService: ProductService,
    private readonly config : ConfigService 
  ) {}

  //1- Private Service
  // private ProductService: ProductService ;
  // //2- Generate constructor
  // constructor( productService: ProductService) {
  //   this.ProductService = productService ;
  // }

  // GET ALl
  //~/api/products
  @Get()
  public GetAll() {
    return this.productService.GetAll();
  }

  // Create : ~/api/products/
  @Post()
  public CreateOne(@Body() body: CreateProductDto) {
    return this.productService.CreateOne(body);
  }

  // GET One : ~/api/products/:id
  @Get(':id')
  public GetSingleOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.GetSingleOne(id);
  }

  // PUT : ~/api/products/:id
  @Put(':id')
  public UpdateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: UpdateProductDto,
  ) {
    return this.productService.UpdateOne(id, body);
  }

  // Delete : ~/api/products/:id
  @Delete(':id')
  public DeleteOne(@Param('id', ParseIntPipe) id: string) {
    return this.productService.DeleteOne(id);
  }

  // import { Request, Response } from 'express';
  // import {
  //   Controller,
  //   Req,
  //   Res,
  //   Get,
  //   Post,
  //   Put,
  //   Delete,
  //   Body,
  //   Query,
  //   Param,
  //   Headers,
  //   ParseIntPipe,
  //   ValidationPipe,
  //   NotFoundException,
  // } from '@nestjs/common';

  // import { CreateProductDto } from './dtos/create-product.dto';
  // import { UpdateProductDto } from './dtos/update-product.dto';
  // import whitelist from './../../node_modules/validator/es/lib/whitelist';

  // type ProductType = {
  //   id: number;
  //   title: string;
  //   price: number;
  // };

  // @Controller('api/products/')
  // export class ProductController {
  //   private products: ProductType[] = [
  //     { id: 1, title: 'Product 1', price: 10 },
  //     { id: 2, title: 'Product 2', price: 20 },
  //     { id: 3, title: 'Product 3', price: 30 },
  //   ];

  //   // GET ALl
  //   //~/api/products
  //   @Get()
  //   public GetAll() {
  //     return this.products;
  //   }

  //   // Post : ~/api/products/
  //   @Post()
  //   public CreateOne(
  //     @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  //     body: CreateProductDto,
  //   ) {
  //     console.log(body);
  //     const newProduct: ProductType = {
  //       id: this.products.length + 1,
  //       title: body.title,
  //       price: body.price,
  //     };
  //     this.products.push(newProduct);
  //     return this.products;
  //   }

  //   // GET One : ~/api/products/:id
  //   @Get(':id')
  //   public GetSingleOne(@Param('id', ParseIntPipe) id: number) {
  //     console.log(id);
  //     const product = this.products.find((p) => p.id === id);
  //     if (!product) {
  //       throw new NotFoundException(`no product found for product id ${id}`);
  //     }
  //     return product;
  //   }

  //   // PUT : ~/api/products/:id
  //   @Put(':id')
  //   public UpdateOne(
  //     @Param('id', ParseIntPipe) id: string,
  //     @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  //     body: UpdateProductDto,
  //   ) {
  //     const product = this.products.find((p) => p.id === parseInt(id));
  //     if (!product) {
  //       throw new NotFoundException(`no product found for product id ${id}`);
  //     }
  //     console.log(id);
  //     console.log(body);
  //     product.title = body.title;
  //     product.price = body.price;
  //     return product;
  //   }

  //   // Delete : ~/api/products/:id
  //   @Delete(':id')
  //   public DeleteOne(@Param('id', ParseIntPipe) id: string) {
  //     const product = this.products.find((p) => p.id === parseInt(id));
  //     if (!product) {
  //       throw new NotFoundException(`no product found for product id ${id}`);
  //       return `no product found for product id ${id}`;
  //     }
  //     // delete the product
  //     this.products = this.products.filter((p) => p.id !== parseInt(id));
  //     return this.products;
  //   }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  // //   Express way
  // // POST : ~/api/products/express
  // @Post('express')
  // public CreateOneExpress(
  //   @Req() req: Request,
  //   @Res() res: Response,
  //   @Headers() headers: any,
  // ) {
  //   // req,res
  //   console.log(req.body);
  //   const newProduct: ProductType = {
  //     id: this.products.length + 1,
  //     title: req.body.title,
  //     price: req.body.price,
  //   };
  //   this.products.push(newProduct);
  //   console.log(headers);
  //   res.status(200).json(this.products); // res
  //   // return this.products;
  // }

  // //~/api/products
  // @Get()
  // public GetAll(
  //   @Req() req: Request,
  //   @Res({ passthrough: true }) res: Response,
  //   @Headers() headers: any,
  // ) {
  //   console.log('express Way');
  //   res.cookie('authCookie', 'this_is_a_cookie', {
  //     httpOnly: true,
  //     maxAge: 120,
  //   });
  //   console.log(headers);
  //   // return this.products;
  //   res.status(200).json(this.products); // res
  // }
}
