import type {NextApiRequest, NextApiResponse} from 'next'
import {Product} from "../../../product/entities/product";
import {getRepository} from "../../../database/datasource";
import {ProductBrief} from "../../../product/models/product-brief";
import {Like} from "typeorm";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Array<ProductBrief>>
) {
    const filters = req.query["filters"] as string
    const like = filters?.replace("-", "%")
    const repository = await getRepository(Product)

    const products = filters ? await repository.find({
        select: {
            id: true,
            name: true,
            price: true,
            pictures: true,
            options: true,
        },
        where: {
            optionsIndex: Like(`%${like}%`)
        }
    }) : await repository.find({
        select: {
            id: true,
            name: true,
            price: true,
            pictures: true,
            options: true,
        }
    });

    const productBriefs = products.map(p => ({...p, file: p.pictures[0]?.file}))
    res.status(200).json(productBriefs);
}
