import type { NextApiRequest, NextApiResponse } from 'next'
import { getRepository } from '../../../database/datasource';
import { Product } from '../../../product/entities/product';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { id } = req.query;
    const repository = await getRepository(Product);
    const product = await repository.findOneBy({
        id: parseInt(id as string)
    });

    res.status(200).json(product);
}
