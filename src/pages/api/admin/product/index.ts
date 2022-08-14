import type {NextApiRequest, NextApiResponse} from 'next'
import {normalizeIndex, Product, updateIndex} from "../../../../product/entities/product";
import {getRepository} from "../../../../database/datasource";
import {Option} from "../../../../product/entities/option";
import {FindOptionsWhere, Like, Raw} from "typeorm";

const handlePut = async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {
    const product = JSON.parse(req.body) as Product;

    const repository = await getRepository(Product);
    const savedProduct = await repository.save(product);

    updateIndex(savedProduct)
    await repository.save(savedProduct);

    res.status(200).json(savedProduct);
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === "PUT")
        return await handlePut(req, res);

    const {filters, search} = req.query
    const normalFilters = normalizeIndex(filters as string)
    const repository = await getRepository(Product)

    const where: FindOptionsWhere<Product> = {
        name: search ? Like(`%${search}%`) : undefined,
        optionsIndex: filters ? Raw((a: any) => `${a} SIMILAR TO '${normalFilters}'`) : undefined
    }

    const products = await repository.find({
        select: {
            id: true,
            name: true,
            price: true,
            pictures: true,
            options: true,
        },
        where
    })

    const productBriefs = products.map(p => ({...p, file: p.pictures[0]?.file}))
    res.status(200).json(productBriefs);
}
