import { Request, Response } from 'express';
import {
  Controller,
  Req,
  Res,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  Param,
  Headers,
  NotFoundException,
} from '@nestjs/common';

import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

type ProductType = {
  id: number;
  title: string;
  price: number;
};

@Controller('api/products/')
export class ProductController {
  private products: ProductType[] = [
    { id: 1, title: 'Product 1', price: 10 },
    { id: 2, title: 'Product 2', price: 20 },
    { id: 3, title: 'Product 3', price: 30 },
  ];

  //~/api/products
  @Get('express')
  public GetAll(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Headers() headers: any,
  ) {
    console.log('express Way');
    res.cookie('authCookie', 'this_is_a_cookie', {
      httpOnly: true,
      maxAge: 120,
    });
    console.log(headers);
    // return this.products;
    res.status(200).json(this.products); // res
  }

  //   Express way
  // POST : ~/api/products/express
  @Post('express')
  public CreateOneExpress(
    @Req() req: Request,
    @Res() res: Response,
    @Headers() headers: any,
  ) {
    // req,res
    console.log(req.body);
    const newProduct: ProductType = {
      id: this.products.length + 1,
      title: req.body.title,
      price: req.body.price,
    };
    this.products.push(newProduct);
    console.log(headers);
    res.status(200).json(this.products); // res
    // return this.products;
  }
}
