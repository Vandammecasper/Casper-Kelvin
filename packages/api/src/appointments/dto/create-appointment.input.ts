import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsBoolean, IsDate } from 'class-validator';

@InputType()
export class CreateAppointmentInput {
  @IsDate()
  @Field(() => Date, { description: 'Date' })
  date: Date;
  
  @Field(() => String, { description: 'HairdresserID' })
  hairdresserId: string;

  @Field(() => [String], { description: 'Array of ServiceIds' })
  servicesId: string[];

  @Field(() => String, { description: 'Extra’s' })
  extraId: string;

  @IsBoolean()
  @Field(() => Boolean, { description: 'isPointsUsed' })
  isPointsUsed: boolean;
}
