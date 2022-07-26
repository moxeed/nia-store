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

    await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files: Files) => {
            if (err) {
                res.status(400).json({err})
                reject(err)
            }

            const id = randomUUID()
            const file = Array.isArray(files.file) ? files.file[0] : files.file
            const extension = file.originalFilename?.split('.').pop()
            const newFilename = id + '.' + extension;

            fs.copyFile(file.filepath, `./storage/${newFilename}`)
                .then(() => {
                    const result = {newFilename, fileKey: newFilename, url: "/" + newFilename}
                    res.status(200).json(result)
                    resolve(result)
                }).catch(console.log)
        })
    })
}