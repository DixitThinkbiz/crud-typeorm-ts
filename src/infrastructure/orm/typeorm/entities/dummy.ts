// Import necessary decorators from TypeORM
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

// Database entity for the t_dummy table
@Entity()
export class t_dummy {
    // Auto-incremented primary key column
    @PrimaryGeneratedColumn()
    id!: number;
    
    // Name column
    @Column()
    name!: string;

    // Email column
    @Column()
    email!: string;

    // Optional description column
    @Column({nullable: true})
    description?: string;
    
    // Column for creation timestamp
    @CreateDateColumn()
    createdAt!: string;

    // Column for update timestamp
    @UpdateDateColumn()
    updatedAt!: string;

    // Column for delete timestamp (soft delete)
    @DeleteDateColumn()
    deletedAt!: string;
    
}
