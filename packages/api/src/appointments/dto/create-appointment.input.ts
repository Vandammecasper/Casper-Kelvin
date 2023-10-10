import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateAppointmentInput {
  @Field(() => Date, { description: 'Date' })
  date: Date;

  // TODO: should be gone when login is implemented
  @Field(() => String, { description: 'UId from firebase' })
  uid: string;

  @Field(() => String, { description: 'UserName' })
  userName: string;

  @Field(() => String, { description: 'HairdresserID' })
  hairdresserId: string;

  @Field(() => [String], { description: 'Array of ServiceIds' })
  servicesId: string[];

  @Field(() => [String], { description: 'Extra’s' })
  extras: string[];

}
