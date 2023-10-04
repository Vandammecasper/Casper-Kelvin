import { CreateVacationInput } from './create-vacation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVacationInput extends PartialType(CreateVacationInput) {
  @Field(() => Int)
  id: number;
}
