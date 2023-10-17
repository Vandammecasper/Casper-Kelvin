import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'locale' })
  locale?: string;

  @Field(() => Boolean, { description: 'isPublic' })
  isPublic: boolean;
}
