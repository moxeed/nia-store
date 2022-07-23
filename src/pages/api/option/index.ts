import {NextApiRequest, NextApiResponse} from "next";
import {Option} from "../../../product/entities/option";
import {IsNull, Like, Raw} from "typeorm";
import {getRepository} from "../../../database/datasource";
import {normalizeIndex, Product} from "../../../product/entities/product";

const getOptions = async (isMajor?: boolean) => {
    const repository = await getRepository(Option);
    const res = await repository.find({
        where: {
            label: {
                isMajor: isMajor ?? IsNull()
            }
        }
    })
    
    return res;
}

const getOptionsWithFilters = async (filters: string, isMajor?: boolean, ) => {
    const repository = await getRepository(Product)
    const normalFilters = normalizeIndex(filters)

    const products = await repository.find({
        select: {
            options: true,
            optionsIndex: false,
            id: false,
            name: false
        },
        where: {
            optionsIndex: Raw(a => `${a} SIMILAR TO '${normalFilters}'`),
            options: {
                label:{
                    isMajor: isMajor ?? IsNull()
                }
            }
        }
    });

    const unique = (value: Option, index: number, self: Array<Option>) => {
        return self.findIndex(a => a.id === value.id) === index;
    }

    return products.map(p => p.options).flat().filter(unique)
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const isMajor = req.query["major"] ? req.query["major"] === "true" : undefined
    const filters = req.query["filters"] as string

    if (filters) {
        res.status(200).json(await getOptionsWithFilters(filters, isMajor));
    } else {
        res.status(200).json(await getOptions(isMajor));
    }
}