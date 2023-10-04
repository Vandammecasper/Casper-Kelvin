import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePointInput {
  @IsNotEmpty()
  @Field(() => String)
  uid: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  userName: string;

  @IsInt()
  @Field(() => Int)
  usablePoints: number;

  @IsInt()
  @Field(() => Int)
  totalPoints: number;

  @IsNotEmpty()
  @Field(() => Boolean)
  public: Boolean;
}
