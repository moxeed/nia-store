import type { NextApiRequest, NextApiResponse } from 'next'
import {Product} from "../../../../product/entities/product";
import {getRepository} from "../../../../database/datasource";

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
