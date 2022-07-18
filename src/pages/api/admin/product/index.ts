import type { NextApiRequest, NextApiResponse } from 'next'
import {Product} from "../../../../product/entities/product";
import {getRepository} from "../../../../database/datasource";
import {Option} from "../../../../product/entities/option";

const handlePut = async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {
    const product = JSON.parse(req.body) as Product;
    
    const repository = await getRepository(Product);
    const savedProduct = await repository.save(product);
    
    //update index
    savedProduct.optionsIndex = savedProduct.options.reduce((prev: string, current:Option, index: number) => {
        return prev + "-" + current.label.id + ":" + current.id
    }, "")
    await repository.save(savedProduct);
    
    res.status(200).json({ name: 'John Doe' });
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === "PUT")
        return await handlePut(req, res);

    const repository = await getRepository(Product);
    const products = await repository.find();

    res.status(200).json(products);
}
