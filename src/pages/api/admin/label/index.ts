import {NextApiRequest, NextApiResponse} from "next";
import {Like} from "typeorm";
import {Label} from "../../../../product/entities/label";
import {getConnection, getRepository} from "../../../../database/datasource";

const handlePost = async (
    req: NextApiRequest,
    res: NextApiResponse<any>) => 
{
    const label = JSON.parse(req.body) as Label;
    
    const repository = await getRepository(Label);
    const createdLabel = await repository.save(label);
    
    res.status(200).json(createdLabel);
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === "POST")
        return await handlePost(req, res);
    
    const term = req.query["term"];
    const connection = await getConnection();

    const repository = connection.getRepository(Label);
    const labels = await repository.find({
        where: {
            value: Like(`%${term}%`)
        }
    });

    res.status(200).json(labels);
}