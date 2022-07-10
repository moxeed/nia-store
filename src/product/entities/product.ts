import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Picture } from "./picture";
import { Tag } from "./tag";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        type: "int"
    })
    price!: number

    @Column({
        length: 128
    })
    name!: string

    @Column({
        length: 512
    })
    description!: string

    @ManyToMany(() => Tag, {
        eager: true,
        cascade: true
    })
    @JoinTable()
    tags!: Array<Tag>

    @OneToMany(() => Picture, (picture) => picture.product, {
        eager: true,
        cascade: true
    })
    pictures!: Array<Picture>

    @CreateDateColumn()
    createDateTime!: Date

    @UpdateDateColumn()
    updateDateTime!: Date
}