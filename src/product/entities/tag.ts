import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Label } from "./label";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ length: 128 })
    key!: string

    @ManyToOne(() => Label, {
        cascade: true,
        eager: true
    })
    label!: Label
}