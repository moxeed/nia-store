import {NextApiRequest, NextApiResponse} from "next";
import {IncomingForm} from "formidable";
import { promises as fs } from 'fs'

export const config = {
    api: {
        bodyParser: false,
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const data = await new Promise((resolve, reject) => {
        const form = new IncomingForm()

        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            resolve({ fields, files })
        })
    })

    const contents = await fs.readFile(data?.files?.nameOfTheInput.path, {
        encoding: 'utf8',
    })
}