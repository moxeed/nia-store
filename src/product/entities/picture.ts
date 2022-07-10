import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";

@Entity()
export class Picture {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ length: 128 })
    path!: string

    @ManyToOne(() => Product, (product) => product.pictures)
    product!: any
}