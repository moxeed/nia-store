import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Label } from "./label";

@Entity()
export class Option {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ length: 128 })
    key!: string

    @ManyToOne(() => Label, {
        cascade: true,
        eager: true
    })
    label!: Label

    @Column({
        default:false
    })
    isFeatured?: boolean
}