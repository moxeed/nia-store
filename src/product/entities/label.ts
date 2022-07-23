import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Label {
    @PrimaryGeneratedColumn({ type: "int" })
    id?: number

    @Column({ length: 128 })
    value!: string
    
    @Column({
        nullable: true,
    })
    isMajor?:boolean
}