import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Option} from "./option";

@Entity()
export class FeaturedOption {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        default: 1
    })
    order!: number

    @Column()
    image!: string
    
    @ManyToOne(() => Option, {
        eager: true,
        cascade: true
    })
    option!: Option
}