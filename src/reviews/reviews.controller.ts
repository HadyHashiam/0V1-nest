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
import { ReviewsService } from './reviews.service';
import { ConfigService } from '@nestjs/config';
// Get : http://localhost:3000/api/reviews

@Controller('/api/reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly config: ConfigService,
  ) {}

  // GET ALl
  //~/api/products
  @Get()
  public getAllReviews() {
    return this.reviewsService.GetAll();
  }

  // // Create : ~/api/products/
  // @Post()
  // public CreateOne(@Body() body: any) {
  //   return this.reviewsService.CreateOne(body);
  // }

  // // GET One : ~/api/products/:id
  // @Get(':id')
  // public GetSingleOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.reviewsService.GetSingleOne(id);
  // }

  // // PUT : ~/api/products/:id
  // @Put(':id')
  // public UpdateOne(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body()
  //   body: any,
  // ) {
  //   return this.reviewsService.UpdateOne(id, body);
  // }

  // // Delete : ~/api/products/:id
  // @Delete(':id')
  // public DeleteOne(@Param('id', ParseIntPipe) id: string) {
  //   return this.reviewsService.DeleteOne(id);
  // }
}
