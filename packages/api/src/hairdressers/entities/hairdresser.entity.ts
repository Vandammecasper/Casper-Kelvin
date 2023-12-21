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

  @Field(() => [Service])
  services: Service[]

  @Column('simple-array', { default: []})
  servicesId: ObjectId[]

  @Column({nullable: true})
  @Field(() => Number, { description: 'vacation days' , nullable: true} )
  vacationDays: number

  @Column({nullable: true})
  @Field(() => [Number], { description: 'days off in the week', nullable: true })
  daysOff: number[]

}
