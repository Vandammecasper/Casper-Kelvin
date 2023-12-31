import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {

  @Field(() => String, { description: 'userName' })
  userName: string;

  @Field(() => String, { description: 'id' })
  id: string;
  
  @Field(() => String, { description: 'locale' })
  locale?: string;

  @Field(() => Boolean, { description: 'isPublic' })
  isPublic: boolean;
}
