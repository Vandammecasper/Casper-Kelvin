import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateVacationInput {

  @IsDate()
  @Field(() => Date)
  startDate: Date;

  @IsDate()
  @Field(() => Date)
  endDate: Date;  
  
}
