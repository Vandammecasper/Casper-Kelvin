import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateExtraInput {
  @IsString()
  @Field(() => String, { description: 'Name' })
  name: string;

  @IsString()
  @Field(() => String, { description: 'Description' })
  description: string;

  @IsNumber()
  @Field(() => Float, { description: 'Price' })
  price: number;

  @Field(() => [String], { description: 'service utilities give in string[]' })
  utilities: string[];
}
