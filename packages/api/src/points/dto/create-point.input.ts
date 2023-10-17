import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePointInput {
  @IsNotEmpty()
  @Field(() => Boolean, { defaultValue: false })
  isPublic: Boolean;
}
