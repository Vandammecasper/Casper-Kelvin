import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateServiceInput {
  @Field(() => String)
  name: string;
  
  @Field(() => String)
  description: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  duration: number;

  @Field(() => [String])
  utilities: string[];
}
