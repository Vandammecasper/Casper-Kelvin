import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Extra {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String, { description: 'Name' })
  name: string;

  @Column()
  @Field(() => String, { description: 'Description' })
  description: string;

  @Column()
  @Field(() => Float, { description: 'Price' })
  price: number;

  @Column()
  @Field(() => [String], { description: 'service utilities give in string[]' })
  utilities: string[];

}
