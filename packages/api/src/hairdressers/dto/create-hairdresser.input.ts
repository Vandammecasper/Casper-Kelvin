import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateHairdresserInput {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // exampleField: number;

  @Field(() => String)
  uid: string;

  @Field(() => String)
  name: string;
}
