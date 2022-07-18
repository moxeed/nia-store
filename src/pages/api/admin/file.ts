import {NextApiRequest, NextApiResponse} from "next";
import {Files, IncomingForm} from "formidable";
import {randomUUID} from "crypto";
import {promises as fs} from "fs";

export const config = {
    api: {
        bodyParser: false,
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const form = new IncomingForm()

    form.parse(req, (err, fields, files: Files) => {
        if (err) {
            res.status(400).json({err})
            return
        }

        const id = randomUUID()
        const file = Array.isArray(files.file) ? files.file[0] : files.file
        const extension = file.originalFilename?.split('.').pop()
        const newFilename = id + '.' + extension;

        fs.copyFile(file.filepath, `./public/files/${newFilename}`)
        res.status(200).json({newFilename, fileKey: newFilename, url:"/"+newFilename})
    })
}