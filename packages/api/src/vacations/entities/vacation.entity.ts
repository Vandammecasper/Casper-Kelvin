import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Hairdresser } from 'src/hairdressers/entities/hairdresser.entity';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import {ObjectId} from 'mongodb';

@Entity()
@ObjectType()
export class Vacation {
  
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @Field(() => Hairdresser)
  hairdresser: Hairdresser

  @Column()
  hairdresserId: ObjectId

  @Column()
  @Field(() => Date)
  startDate: Date
  
  @Column()
  @Field(() => Date)
  endDate: Date
}
