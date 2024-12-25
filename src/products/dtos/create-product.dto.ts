import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Min,
  Max,
  Length,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: ' title must be a string' })
  @IsNotEmpty({ message: 'title is required' })
  @Length(2, 150)
  title: string;

  @IsString({ message: ' description must be a string' })
  description: string;

  @IsNumber()
  @IsNotEmpty({ message: 'price is required' })
  @Min(0, { message: 'price should not be less than 0 ' })
  @Max(999999)
  price: number;
}
