import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Hairdresser } from 'src/hairdressers/entities/hairdresser.entity';
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm';
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

  @Column()
  @Field(() => Boolean)
  isRepeat: boolean

  @Column()
  @Field(() => Boolean)
  isApproved: boolean

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
