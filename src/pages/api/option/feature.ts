import { NextApiRequest, NextApiResponse } from "next";
import { getRepository } from "../../../database/datasource";
import { Option } from "../../../product/entities/option";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const repository =await  getRepository(Option)
    
    const options = repository.find({
        where:{
            isFeatured:true
        }
    })

    res.status(200).json(options)
}