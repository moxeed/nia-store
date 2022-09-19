import type {NextApiRequest, NextApiResponse} from 'next'
import {normalizeIndex, Product} from "../../../product/entities/product";
import {getRepository} from "../../../database/datasource";
import {FindOptionsWhere, Like, Raw} from "typeorm";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const {filters, search} = req.query
    const normalFilters = normalizeIndex(filters as string)
    const repository = await getRepository(Product)
    
    const where: FindOptionsWhere<Product> = {
        name: search ? Like(`%${search}%`) : undefined,
        optionsIndex: filters ? Raw(a => `${a} SIMILAR TO '${normalFilters}'`) : undefined
    }

    const products = await repository.find({
        select: {
            id: true,
            name: true,
            price: true,
            pictures: true,
            options: true,
        },
        where,
        order: {
            name: "asc"
        }
    })

    const productBriefs = products.map(p => ({...p, file: p.pictures[0]?.file}))
    res.status(200).json(productBriefs);
}
