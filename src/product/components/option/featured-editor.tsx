import React, {useEffect, useState} from "react";
import {FeaturedOption} from "../../entities/featuredOption";
import {safeFetch} from "../../../common/safe-fetch";
import {ImagePicker} from "../image-picker";
import {Picture} from "../../entities/product";
import {OptionsPicker} from "../options-picker";
import {Option} from "../../entities/option";
import {Button, Message, Panel, useToaster} from "rsuite";

const message = <Message showIcon type="success">
    با موفقیت ثبت شد
</Message>

export const FeaturedEditor = ({id}: { id?: number }) => {
    const [featureOption, setFeatureOption] = useState(new FeaturedOption())
    const toast = useToaster()

    useEffect(() => {
        if (id) {
            const [result , cancel] = safeFetch("/api/featured/" + id)
            result.then(setFeatureOption)
            return cancel
        }
    }, [id])

    const pictures = featureOption.image ? [{file: featureOption.image}] : []
    const tags = featureOption.option ? [featureOption.option] : undefined

    const handlePictureUpdate = (pictures: Array<Picture>) => {
        const picture = pictures.pop()
        if (picture) {
            setFeatureOption({...featureOption, image: picture.file})
        }
    }

    const handleOptionUpdate = (options: Array<Option>) => {
        const option = options.pop()
        if (option) {
            setFeatureOption({...featureOption, option})
        }
    }
    
    const handleSubmit = () => {
        fetch("/api/admin/featured", {
            method: "PUT",
            body: JSON.stringify(featureOption)
        }).then(() => toast.push(message))
    }
    

    return <Panel>
        <ImagePicker pictures={pictures} setPictures={handlePictureUpdate}/>
        <OptionsPicker tags={tags} setTags={handleOptionUpdate}/>
        <Button onClick={handleSubmit}>ثبت</Button>
    </Panel>
}