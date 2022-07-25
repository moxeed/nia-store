import {NextApiRequest, NextApiResponse} from "next";
import {Like} from "typeorm";
import {getConnection, getRepository} from "../../../database/datasource";
import {Option} from "../../../product/entities/option";
import {FeaturedOption} from "../../../product/entities/featuredOption";

const handlePut = async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {
    const featured = JSON.parse(req.body)
    const repository = await getRepository(FeaturedOption)

    const created = await repository.save(featured)
    res.status(200).json(created)
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method == "PUT") {
        return await handlePut(req, res)
    }

    const repository = await getRepository(FeaturedOption);
    const featuredOptions = await repository.find();

    res.status(200).json(featuredOptions);
}