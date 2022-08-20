import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Option} from "./option";
import {Label} from "./label";

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
    optionsIndex?: string

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

    @DeleteDateColumn()
    deleteDateTime!: Date
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

const createIndex = (options: Array<Option>) => {
    return options?.map(o => `${o.label.id}:${o.id}`).sort()
}

export const updateIndex = (product: Product) => {
    product.optionsIndex = `-${createIndex(product.options)?.join("-")}-`
}

export const normalizeIndex = (index?: string) => {
    if (!index)
        return ".*"
    
    const keys = index.split('-')
        .filter(v => v.length > 0)
        .sort()
    
    let last = "";
    let result = "%-" 
    for (const key of keys){
        const [label, value] = key.split(':')

        if (label !== last){
            last = label
            result += result[result.length - 1] == '|' ? '0)-%' : ""
            result += label + ':('
        }
        
        result += value + '|'
    }
    
    return result + "0)-%"
}