import { InputType, Int, Field } from '@nestjs/graphql';
import { ArrayMaxSize, ArrayNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateServiceInput {
  @IsString()
  @Field(() => String)
  name: string;
  
  @IsString()
  @IsOptional()
  @Field(() => String)
  description: string;

  @IsInt()
  @Field(() => Int)
  price: number;

  @Field(() => Int)
  duration: number;

  @ArrayNotEmpty()
  @ArrayMaxSize(10)
  @Field(() => [String])
  utilities: string[];
}
