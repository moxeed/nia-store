import {NextApiRequest, NextApiResponse} from "next";
import {getConnection} from "../../../database/datasource";
import {Option} from "../../../product/entities/option";
import {IsNull} from "typeorm";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const isMajor = req.query["major"]
    const connection = await getConnection();

    const repository = connection.getRepository(Option);
    const options = await repository.find({
        where:{
            label:{
                isMajor: isMajor ? Boolean(isMajor) : IsNull()
            }
        }
    });

    res.status(200).json(options);
}