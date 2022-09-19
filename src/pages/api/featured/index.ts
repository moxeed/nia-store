import {NextApiRequest, NextApiResponse} from "next";
import {getRepository} from "../../../database/datasource";
import {FeaturedOption} from "../../../product/entities/featuredOption";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const repository = await getRepository(FeaturedOption)
    const featuredOptions = await repository.find({
        order: {
            order: "asc"
        }
    })

    res.status(200).json(featuredOptions)
}