import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'userName' })
  userName: string;

  @Field(() => String, { description: 'locale' })
  locale?: string;

  @IsBoolean()
  @Field(() => Boolean, { description: 'isPublic' })
  isPublic: boolean;
}
