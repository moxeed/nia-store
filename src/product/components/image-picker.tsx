import {Picture} from "../entities/product";
import {Panel, Uploader} from "rsuite";

export const ImagePicker = (props: { pictures: Array<Picture>, setPictures: (p: Array<Picture>) => void }) => {
    return <Panel header="عکس" className="mt-2" bordered>
        <Uploader action="api/uploadImage"/>
    </Panel>
}