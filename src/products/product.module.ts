import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
@Module({
  controllers: [ProductController],
  providers: [ProductService], // 2
  imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductModule {}
