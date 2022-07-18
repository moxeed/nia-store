import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Option } from "./option";
import {Label} from "./label";
import {TSNumberKeyword} from "@typescript-eslint/types/dist/generated/ast-spec";

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
    
    @ManyToMany(() => Option, {
        eager: true,
        cascade: true
    })
    @JoinTable()
    options!: Array<Option>
    
    @Column({
        nullable: true
    })
    optionsIndex?:string

    @OneToMany(() => Picture, (picture) => picture.product, {
        eager: true,
        cascade: true
    })
    pictures!: Array<Picture>

    @OneToMany(() => Specification, (specification) => specification.product, {
        eager: true,
        cascade: true
    })
    specifications!: Array<Specification>
    
    @CreateDateColumn()
    createDateTime!: Date

    @UpdateDateColumn()
    updateDateTime!: Date
}

@Entity()
export class Picture {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    file!: string

    @ManyToOne(() => Product, (product) => product.pictures)
    product?: Product
}

@Entity()
export class Specification {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({length: 128})
    key!: string

    @ManyToOne(() => Label, {
        cascade: true,
        eager: true
    })
    label!: Label

    @ManyToOne(() => Product)
    product?: Product
}