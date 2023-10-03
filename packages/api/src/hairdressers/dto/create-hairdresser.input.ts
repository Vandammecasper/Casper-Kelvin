import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ObjectId } from 'typeorm';

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
}
