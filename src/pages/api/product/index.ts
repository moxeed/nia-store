import type { NextApiRequest, NextApiResponse } from 'next'
import { getRepository } from '../../../database/datasource';
import { Product } from '../../../product/entities/product';

const handlePut = async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {
    const product = JSON.parse(req.body) as Product;
    console.log(product);

    const repository = await getRepository(Product);
    await repository.save(product);

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
