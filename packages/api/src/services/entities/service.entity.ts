import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity() // Database link - Typeorm
@ObjectType()
export class Service {
  @ObjectIdColumn()
  @Field(() => ID, { description: 'id' })
  id: string;

  @Column()
  @Field(() => String, { description: 'service name' })
  name: string;

  @Column()
  @Field(() => String, { description: 'service description', nullable: true })
  description: string;

  @Column()
  @Field(() => Float, { description: 'service price' })
  price: number;

  @Column()
  @Field(() => Int, { description: 'service duration in minutes' })
  duration: number;

  @Column()
  @Field(() => [String], { description: 'service utilities give in string[]' })
  utilities: string[];
}
