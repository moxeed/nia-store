import {NextApiRequest, NextApiResponse} from "next";
import {Option} from "../../../product/entities/option";
import {FindOptionsWhere, IsNull, Like, Raw} from "typeorm";
import {getRepository} from "../../../database/datasource";
import {normalizeIndex, Product} from "../../../product/entities/product";

const getOptionsWithFilters = async (filters?: string, search?: string, isMajor?: boolean,) => {
    const repository = await getRepository(Product)
    const normalFilters = normalizeIndex(filters)

    const where: FindOptionsWhere<Product> = {
        name: search ? Like(`%${search}%`) : undefined,
        optionsIndex: filters ? Raw(a => `${a} SIMILAR TO '${normalFilters}'`) : undefined
    }
    
    const products = await repository.find({
        select: {
            options: true
        },
        where
    });

    const unique = (value: Option, index: number, self: Array<Option>) => {
        return (value.label.isMajor === isMajor || !isMajor) && self.findIndex(a => a.id === value.id) === index;
    }

    return products.map(p => p.options).flat().filter(unique)
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const isMajor = req.query["major"] ? req.query["major"] === "true" : undefined
    const filters = req.query["filters"] as string
    const search = req.query["search"] as string

    res.status(200).json(await getOptionsWithFilters(filters, search, isMajor));
}