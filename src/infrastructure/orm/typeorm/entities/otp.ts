
// Import necessary decorators from TypeORM
import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    Generated,
    Unique
  } from "typeorm";

  
  // Database entity for the t_dummy table
  @Entity()
  @Unique(['email'])
  export class otptable {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
  
    @Column()
    otp: string;
  
    // Column for creation timestamp
    @CreateDateColumn()
    createdAt: string;
  
    // Column for update timestamp
    @UpdateDateColumn()
    updatedAt: string;

  }
  