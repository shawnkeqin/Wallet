import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Field, Int, ObjectType } from '@nestjs/graphql';
  
  @Entity()
  @ObjectType()
  export class Transaction {
    @PrimaryColumn()
    @Field(() => Int)
    id: number;
  
    @Column({ type: 'float' })
    @Field()
    amount: number;
  
    @Column({ type: 'simple-array' })
    @Field(() => [String])
    category: string[];
  
    @Column({ type: 'date' })
    @Field(() => String)
    date: Date;
  
    @Column()
    @Field()
    merchant_name: string;
  
    @Column({ default: false })
    @Field()
    isFollowed: boolean;
  
    @CreateDateColumn()
    @Field(() => String)
    createdAt: Date;
  
    @UpdateDateColumn()
    @Field(() => String)
    updatedAt: Date;
  }