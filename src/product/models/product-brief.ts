import {Option} from "../entities/option";

export interface ProductBrief {
    id: number

    price: number

    name: string
    
    file?: string
    
    options?: Array<Option>

    createDateTime: Date

    updateDateTime: Date
}