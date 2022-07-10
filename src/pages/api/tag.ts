import { NextApiRequest, NextApiResponse } from "next";
import { Like } from "typeorm";
import { getConncetion } from "../../database/datasource";
import { Tag } from "../../product/entities/tag";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const term = req.query["term"];
    const conncetion = await getConncetion();

    const repository = conncetion.getRepository(Tag);
    const tags = await repository.find({
        where: [
            {
                label: {
                    value: Like(`%${term}%`)
                }
            },
            {
                key: Like(`%${term}%`)
            }
        ]
    });

    res.status(200).json(tags);
}