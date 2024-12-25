import { NotFoundException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable() // 1
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  /**
   * GetAll Product
   */
  public async GetAll() {
    return await this.productsRepository.find();
  }

  /**
   * Create Product
   */
  public async CreateOne(dto: CreateProductDto) {
    const newProduct = this.productsRepository.create(dto);
    return await this.productsRepository.save(newProduct);
  }

  /**
   * GetOne Spacific Product
   */
  public async GetSingleOne(id: number) {
    console.log(id);
    const product = this.productsRepository.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException(`no product found for product id ${id}`);
    }
    return await product;
  }

  /**
   * Update Product
   */
  public async UpdateOne(id: number, body: UpdateProductDto) {
    const product = await this.GetSingleOne(id);
    product.title = body.title ?? product.title;
    product.description = body.description ?? product.description;
    product.price = body.price ?? product.price;
    return await this.productsRepository.save(product);

    // if (!product) {
    //   throw new NotFoundException(`no product found for product id ${id}`);
    // }
  }

  /**
   * Delete Product
   */
  // Delete : ~/api/products/:id

  public async DeleteOne(id: any) {
    const product = await this.GetSingleOne(id);
    await this.productsRepository.remove(product);
    return { message: 'Product Deleted Successfully' };

    // delete the product
  }
}
