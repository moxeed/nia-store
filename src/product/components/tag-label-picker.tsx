import {useEffect, useRef, useState} from "react"
import {AutoComplete, Input, Modal} from "rsuite"
import { Label } from "../entities/label";
import { Tag } from "../entities/tag"
import {LabelPicker} from "./label-picker";
import {PickerInstance} from "rsuite/Picker";

export const TagLabelPicker = (props: { open: boolean, value: string, addTag: (tag: Tag) => void }) => {

    const { open, value, addTag } = props
    
    const handleSelect = (label:Label) => {
        addTag({
            label,
            key: value
        })
    }
    
    useEffect(() => {
        
    },[])
    
    return <Modal open={open} dir="rtl">
        <p>عنوان را انتخاب کنید</p>
        <LabelPicker onSelect={handleSelect}/>
    </Modal>
}