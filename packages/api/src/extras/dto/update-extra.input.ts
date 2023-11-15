import { CreateExtraInput } from './create-extra.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateExtraInput extends PartialType(CreateExtraInput) {
  @Field(() => Int)
  id: number;
}
