import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Min,
  Max,
  Length,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsString({ message: ' title must be a string"' })
  @IsNotEmpty({ message: 'title is required' })
  @Length(2, 150)
  @IsOptional()
  title?: string;

  @IsString({ message: ' description must be a string' })
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty({ message: 'price is required' })
  @Min(0, { message: 'price should not be less than 0 ' })
  @Max(999999)
  @IsOptional()
  price?: number;
}
