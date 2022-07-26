import {Picture} from "../entities/product";
import {Panel, Uploader} from "rsuite";
import {FileType} from "rsuite/Uploader";

export const ImagePicker = (props: { pictures: Array<Picture>, setPictures: (p: Array<Picture>) => void }) => {
    const {setPictures} = props
    const pictures = props.pictures ?? new Array<Picture>()

    const fileList = pictures?.map(p => ({
        fileKey: p.file,
        name: p.file,
        url: "/api/file/" + p.file,
    }))

    const handleSuccess = (response: { fileKey: string }) => {
        setPictures([...pictures, {
            file: response.fileKey,
        }])
    }

    const handleRemove = ({fileKey}: FileType) => {
        setPictures(pictures.filter(p => p.file !== fileKey))
    }

    return <Panel header="عکس" className="mt-2" bordered>
        <Uploader fileList={fileList} listType="picture-text" action="/api/admin/file" onSuccess={handleSuccess}
                  onRemove={handleRemove} draggable>
            <div>عکس را اینجا بکشید یا برای انتخاب کلیک کنید</div>
        </Uploader>
    </Panel>
}