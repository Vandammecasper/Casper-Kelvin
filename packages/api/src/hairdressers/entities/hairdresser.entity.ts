import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity() // Database link - Typeorm
@ObjectType() //graphql
export class Hairdresser {

  @ObjectIdColumn()
  @Field(() => ID, { description: 'Id' })
  id: string;

  @Column()
  @Field(() => String, { description: 'Fullname' })
  name: string;

  // @Column('simple-array', { default: [] }) // Use 'simple-array' type for an array of IDs
  // @Field(() => [Int], { description: 'Array of IDs' }) // GraphQL field for the array of IDs
  // otherIds: number[]


}
