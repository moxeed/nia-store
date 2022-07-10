import { NextApiRequest, NextApiResponse } from "next";
import { Like } from "typeorm";
import { getConncetion } from "../../database/datasource";
import { Label } from "../../product/entities/label";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const term = req.query["term"];
    const conncetion = await getConncetion();

    const repository = conncetion.getRepository(Label);
    const labels = await repository.find({
        where: {
            value: Like(`%${term}%`)
        }
    });

    res.status(200).json(labels);
}