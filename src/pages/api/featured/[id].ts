import {NextApiRequest, NextApiResponse} from "next";
import {Option} from "../../../product/entities/option";
import {IsNull, Like, Raw} from "typeorm";
import {getRepository} from "../../../database/datasource";
import {normalizeIndex, Product} from "../../../product/entities/product";
import {FeaturedOption} from "../../../product/entities/featuredOption";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const {id} = req.query
    const repository = await getRepository(FeaturedOption)
    const featuredOption = await repository.findOne({
        where: {
            id: parseInt(id as string)
        }
    })

    if (featuredOption) {
        res.status(200).json(featuredOption)
    } else {
        res.status(404)
    }
}