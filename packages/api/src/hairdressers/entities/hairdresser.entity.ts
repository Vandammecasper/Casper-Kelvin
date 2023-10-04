import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Service } from 'src/services/entities/service.entity';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import {ObjectId} from 'mongodb';

@Entity() // Database link - Typeorm
@ObjectType() //graphql
export class Hairdresser {

  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String, { description: 'UId from firebase' })
  uid: string;

  @Column()
  @Field(() => String, { description: 'Fullname' })
  name: string;

  // @Column('simple-array', { default: [] }) // Use 'simple-array' type for an array of IDs
  // @Field(() => [Int], { description: 'Array of IDs' }) // GraphQL field for the array of IDs
  // otherIds: number[]
  @Field(() => [Service])
  services: Service[]

  @Column('simple-array', { default: []})
  servicesId: ObjectId[]

}
