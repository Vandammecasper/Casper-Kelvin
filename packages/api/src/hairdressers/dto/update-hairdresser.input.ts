import { CreateHairdresserInput } from './create-hairdresser.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHairdresserInput extends PartialType(CreateHairdresserInput) {
  @Field(() => Int)
  id: string;
}
