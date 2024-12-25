import { Injectable, NotFoundException } from "@nestjs/common";



@Injectable()
export class ReviewsService {
  constructor(
    // @InjectRepository(Review)
    // private readonly reviewsService: ReviewsService,
  ) // private readonly reviewsRepository: Repository<Review>,
  {}

  public  GetAll() {
    return
  }

  // /**
  //  * Create Review
  //  */
  // public async CreateOne(dto: any) {
  //   const newReview = this.reviewsRepository.create(dto);
  //   return await this.reviewsRepository.save(newReview);
  // }

  // /**
  //  * GetOne Spacific Review
  //  */
  // public async GetSingleOne(id: number) {
  //   console.log(id);
  //   const Review = this.reviewsRepository.findOne({ where: { id: id } });
  //   if (!Review) {
  //     throw new NotFoundException(`no Review found for Review id ${id}`);
  //   }
  //   return await Review;
  // }

  // /**
  //  * Update Review
  //  */
  // public async UpdateOne(id: number, body: any) {
  //   const Review = await this.GetSingleOne(id);
  //   // Review.title = body.title ?? product.title;
  //   // product.description = body.description ?? product.description;
  //   // Review.price = body.price ?? product.price;
  //   return await this.reviewsRepository.save(Review);

  //   // if (!Review) {
  //   //   throw new NotFoundException(`no Review found for Review id ${id}`);
  //   // }
  // }

  // /**
  //  * Delete Review
  //  */
  // // Delete : ~/api/Reviews/:id

  // public async DeleteOne(id: any) {
  //   const Review = await this.GetSingleOne(id);
  //   await this.reviewsRepository.remove(Review);
  //   return { message: 'Review Deleted Successfully' };

  //   // delete the Review
  // }
}