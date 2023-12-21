import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

@InputType()
export class CreateHairdresserInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  uid: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;

  // @ValidateNested()
  @Field(() => [String])
  servicesId: string[];

  @IsNotEmpty()
  @Field(() => Number)
  vacationDays: number;

  @IsNotEmpty()
  @Field(() => [Number])
  daysOff: number[];
}
