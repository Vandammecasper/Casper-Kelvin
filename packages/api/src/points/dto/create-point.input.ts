import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreatePointInput {
  @IsNotEmpty()
  @Field(() => Boolean, { defaultValue: false })
  isPublic: Boolean;
}
