import {NextApiRequest, NextApiResponse} from "next";
import fs from "fs";
import path from "path";

export const config = {
    api: {
        bodyParser: false,
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const {name} = req.query
    const filePath = path.join("./storage", name as string);
    const stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': stat.size
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
}