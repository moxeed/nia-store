import {NextApiRequest, NextApiResponse} from "next";
import {Like} from "typeorm";
import {getConnection} from "../../../database/datasource";
import {Option} from "../../../product/entities/option";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const term = req.query["term"];
    const connection = await getConnection();

    const repository = connection.getRepository(Option);
    const options = await repository.find({
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

    res.status(200).json(options);
}