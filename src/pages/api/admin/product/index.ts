import type {NextApiRequest, NextApiResponse} from 'next'
import {normalizeIndex, Product, updateIndex} from "../../../../product/entities/product";
import {getRepository} from "../../../../database/datasource";
import {Option} from "../../../../product/entities/option";
import {Like, Raw} from "typeorm";

const handlePut = async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {
    const product = JSON.parse(req.body) as Product;

    const repository = await getRepository(Product);
    const savedProduct = await repository.save(product);

    updateIndex(savedProduct)
    await repository.save(savedProduct);

    res.status(200).json({name: 'John Doe'});
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === "PUT")
        return await handlePut(req, res);

    const {filters} = req.query
    const normalFilters = normalizeIndex(filters as string)
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
            optionsIndex: Raw(a => `${a} SIMILAR TO '${normalFilters}'`)
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
