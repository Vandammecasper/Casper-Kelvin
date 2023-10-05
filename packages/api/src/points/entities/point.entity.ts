import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Point {
 
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  uid: string

  @Column()
  @Field(() => String)
  userName: string

  @Column()
  @Field(() => Int)
  usablePoints: number

  @Column()
  @Field(() => Int)
  totalPoints: number

  @Column()
  @Field(() => Boolean)
  isPublic: Boolean
}
