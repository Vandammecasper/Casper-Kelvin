import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateExtraInput {
  @Field(() => String, { description: 'Name' })
  name: string;

  @Field(() => String, { description: 'Description' })
  description: string;

  @Field(() => Float, { description: 'Price' })
  price: number;

  @Field(() => [String], { description: 'service utilities give in string[]' })
  utilities: string[];
}
