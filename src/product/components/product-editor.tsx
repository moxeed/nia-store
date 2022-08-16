import React, {useState} from "react"
import {Button, FlexboxGrid, Form, Input, Message, Panel, toaster, useToaster} from "rsuite";
import {Picture, Product, Specification} from "../entities/product"
import {Option} from "../entities/option";
import {OptionsPicker} from "./options-picker";
import {SpecificationEditor} from "./specification-editor";
import {ImagePicker} from "./image-picker";
import {NiaButton} from "../../common/components/nia-button";
import {useRouter} from "next/router";

const message = <Message showIcon type="success">
    با موفقیت ثبت شد
</Message>

const failedMessage = <Message showIcon type="error">
    داده ورودی اشتباه است
</Message>

export const ProductEditor = (props: { product?: Product }) => {
    const [product, setProduct] = useState<Product>(props.product ?? new Product());
    const toast = useToaster()
    const router = useRouter()

    const save = () => {
        fetch("/api/admin/product", {
            method: "PUT",
            body: JSON.stringify(product)
        })
            .then((res) => {
                if (res.ok) {
                    toast.push(message)
                    return res.json()
                } else {
                    toast.push(failedMessage)
                    throw "error in product put"
                }
            }).then((responseProduct) => setProduct({...product, options: responseProduct.options}))
            .catch()
    }

    const remove = () => {
        fetch("/api/admin/product/" + product.id, {
            method: "DELETE"
        })
            .then((res) => {
                if (res.ok) {
                    toast.push(message)
                    router.push("/admin/product").catch()
                } else {
                    toast.push(failedMessage)
                }
            })
    }

    const setTags = (tags: Array<Option>) => setProduct({...product, options: tags});
    const setSpecifications = (specifications: Array<Specification>) => setProduct({...product, specifications});
    const setPictures = (pictures: Array<Picture>) => setProduct({...product, pictures});
    const setPrice = (value: string) => {
        const price = value === "" ? 0 : parseInt(value)
        
        if (!isNaN(price))
            setProduct({...product, price})
    }

    return (
        <FlexboxGrid justify="center" className="bg-white m-2 rounded p-5 pb-5">
            <FlexboxGrid.Item colspan={24}>
                {product.id && <NiaButton className="border-red-400 border text-red-400" onClick={remove}>
                    حذف
                </NiaButton>}
                <ImagePicker pictures={product.pictures} setPictures={setPictures}/>
                <Panel header="اطلاعات اصلی" className="mt-2" bordered>
                    <Form.ControlLabel className="text-lg">قیمت</Form.ControlLabel>
                    <Input className="my-2" value={product.price}
                           onChange={setPrice}/>
                    <Form.ControlLabel className="text-lg">عنوان</Form.ControlLabel>
                    <Input className="my-2" value={product.name}
                           onChange={((val: string) => setProduct({...product, name: val}))}/>
                    <Form.ControlLabel className="text-lg">توضیحات</Form.ControlLabel>
                    <Input className="my-2" value={product.description}
                           onChange={((val: string) => setProduct({...product, description: val}))}/>
                </Panel>
                <OptionsPicker tags={product.options} setTags={setTags}/>
                <SpecificationEditor specifications={product.specifications} setSpecifications={setSpecifications}/>
                <Button appearance="ghost" className="w-full mt-2" onClick={save}>ثبت</Button>
            </FlexboxGrid.Item>
        </FlexboxGrid>);
}