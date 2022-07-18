import React, {useState} from "react"
import {Button, FlexboxGrid, Form, Input, Panel} from "rsuite";
import {Picture, Product, Specification} from "../entities/product"
import {Option} from "../entities/option";
import {OptionsPicker} from "./options-picker";
import {SpecificationEditor} from "./specification-editor";
import {ImagePicker} from "./image-picker";

export const ProductEditor = (props: { product?: Product }) => {
    const [product, setProduct] = useState<Product>(props.product ?? new Product());

    const save = () => {
        fetch("/api/admin/product", {
            method: "PUT",
            body: JSON.stringify(product)
        })
    }

    const setTags = (tags: Array<Option>) => setProduct({...product, options: tags});
    const setSpecifications = (specifications: Array<Specification>) => setProduct({...product, specifications});
    const setPictures = (pictures: Array<Picture>) => setProduct({...product, pictures});

    return (
        <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={22}>
                <ImagePicker pictures={product.pictures} setPictures={setPictures}/>
                <Panel header="اطلاعات اصلی" className="mt-2" bordered>
                    <Form.ControlLabel className="text-lg">قیمت</Form.ControlLabel>
                    <Input className="my-2" value={product.price}
                           onChange={((val) => setProduct({...product, price: parseInt(val)}))}/>
                    <Form.ControlLabel className="text-lg">عنوان</Form.ControlLabel>
                    <Input className="my-2" value={product.name}
                           onChange={((val) => setProduct({...product, name: val}))}/>
                    <Form.ControlLabel className="text-lg">توضیحات</Form.ControlLabel>
                    <Input className="my-2" value={product.description}
                           onChange={((val) => setProduct({...product, description: val}))}/>
                </Panel>
                <OptionsPicker tags={product.options} setTags={setTags}/>
                <SpecificationEditor specifications={product.specifications} setSpecifications={setSpecifications}/>
                <Button appearance="ghost" className="w-full mt-2" onClick={save}>ثبت</Button>
            </FlexboxGrid.Item>
        </FlexboxGrid>);
}