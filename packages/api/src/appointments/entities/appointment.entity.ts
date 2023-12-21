import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Hairdresser } from 'src/hairdressers/entities/hairdresser.entity';
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Service } from 'src/services/entities/service.entity';
import { Extra } from 'src/extras/entities/extra.entity';

@Entity()
@ObjectType()
export class Appointment {

  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => Date, { description: 'Date', nullable: true })
  date: Date;

  @Column()
  @Field(() => Int, { description: 'total time', nullable: true })
  totalTime: number;

  @Column()
  @Field(() => String, { description: 'UId from firebase', nullable: true })
  uid: string;

  @Column()
  @Field(() => String, { description: 'UserName', nullable: true })
  userName: string;

  @Column()
  hairdresserId: ObjectId;

  @Field(() => Hairdresser, { description: 'HairdresserID', nullable: true })
  hairdresser: Hairdresser;

  @Column('simple-array', { default: []})
  servicesId: ObjectId[]

  @Field(() => [Service], { description: 'Array of services', nullable: true })
  services: Service[]

  @Column()
  extraId: ObjectId

  @Field(() => Extra, { description: 'Extra', nullable: true })
  extra: Extra

  @Column()
  @Field(() => Float, { description: 'Price', nullable: true })
  price: number

  @Column()
  @Field(() => Int, { description: 'addedPoints', nullable: true })
  addedPoints: number

  @Column()
  @Field(() => Boolean, { description: 'isPointsUsed', nullable: true })
  isPointsUsed: boolean

  @Column()
  @Field(() => Boolean, { description: 'isCompleted', nullable: true})
  isCompleted: boolean

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}