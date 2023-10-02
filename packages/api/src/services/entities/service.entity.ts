import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity() // Database link - Typeorm
@ObjectType()
export class Service {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // exampleField: number;
  @ObjectIdColumn()
  @Field(() => ID, { description: 'id' })
  id: string;

  @Column()
  @Field(() => String, { description: 'service name' })
  name: string;

  @Column()
  @Field(() => String, { description: 'service description' })
  description: string;

  @Column()
  @Field(() => Int, { description: 'service price' })
  price: number;

  @Column()
  @Field(() => Int, { description: 'service duration in minutes' })
  duration: number;

  @Column()
  @Field(() => [String], { description: 'service utilities' })
  utilities: string[];
}
