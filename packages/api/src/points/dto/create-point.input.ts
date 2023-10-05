import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePointInput {
  @IsNotEmpty()
  @Field(() => String)
  uid: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'The name of the user, get from  firebaseUser'})
  userName: string;

  @IsInt()
  @Field(() => Int, { defaultValue: 0 })
  usablePoints: number;

  @IsInt()
  @Field(() => Int, { defaultValue: 0 })
  totalPoints: number;

  @IsNotEmpty()
  @Field(() => Boolean, { defaultValue: false })
  isPublic: Boolean;
}
