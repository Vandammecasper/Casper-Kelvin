import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { ArrayMaxSize, ArrayNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateServiceInput {
  @IsString()
  @Field(() => String)
  name: string;
  
  @IsString()
  @IsOptional()
  @Field(() => String)
  description: string;

  @IsNumber()
  @Field(() => Float)
  price: number;

  @Field(() => Int)
  duration: number;

  @ArrayNotEmpty()
  @ArrayMaxSize(10)
  @Field(() => [String])
  utilities: string[];
}
