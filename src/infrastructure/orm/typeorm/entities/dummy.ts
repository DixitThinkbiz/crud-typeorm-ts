// Import necessary decorators from TypeORM
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { UserRoleType } from "../../../../domain/models/dummy";

// Database entity for the t_dummy table
@Entity()
export class t_dummy {
  // Auto-incremented primary key column
  @PrimaryGeneratedColumn()
  id: number;

  // Name column
  @Column()
  name: string;

  // Email column
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: ["admin", "user"],
    default: "user",
  })
  role: UserRoleType;

  // Optional description column
  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  refreshToken: string;

  // Column for creation timestamp
  @CreateDateColumn()
  createdAt: string;

  // Column for update timestamp
  @UpdateDateColumn()
  updatedAt: string;

  // Column for delete timestamp (soft delete)
  @DeleteDateColumn()
  deletedAt: string;
}
