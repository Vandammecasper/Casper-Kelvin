import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateAppointmentInput {
  @Field(() => Date, { description: 'Date' })
  date: Date;
  
  @Field(() => String, { description: 'HairdresserID' })
  hairdresserId: string;

  @Field(() => [String], { description: 'Array of ServiceIds' })
  servicesId: string[];

  @Field(() => String, { description: 'Extra’s' })
  extraId: string;

}
