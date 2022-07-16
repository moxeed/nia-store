import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export const fileBasePath = "D:/Repos/nia-store/storage/files" 

@Entity()
export class file {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({length: 128})
    relativePath!: string
    
    @CreateDateColumn()
    createDateTime!: Date
    
    @UpdateDateColumn()
    updateDateTime!: Date
}