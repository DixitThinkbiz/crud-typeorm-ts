import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"

@Entity()
export class t_dummy {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    description?: string;
    
    @CreateDateColumn()
    createdAt!:string;

    @UpdateDateColumn()
    updatedAt!:string;

    @DeleteDateColumn()
    deletedAt!:string;
}