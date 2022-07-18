import {NextApiRequest, NextApiResponse} from "next";
import {getConnection} from "../../../database/datasource";
import {Option} from "../../../product/entities/option";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const connection = await getConnection();

    const repository = connection.getRepository(Option);
    const options = await repository.find();

    res.status(200).json(options);
}