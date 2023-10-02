import { InputType, Int, Field } from '@nestjs/graphql';
import { ObjectId } from 'typeorm';

@InputType()
export class CreateHairdresserInput {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // exampleField: number;

  @Field(() => String)
  uid: string;

  @Field(() => String)
  name: string;

  @Field(() => [String])
  servicesId: string[];
}
