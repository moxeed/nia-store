import React, { useState } from "react"
import { Button, FlexboxGrid, Form, Input } from "rsuite";
import { Product } from "../entities/product"
import { Tag } from "../entities/tag";
import { LabelPicker } from "./label-picker";

export const ProductEditor = (props: { product?: Product }) => {
    const [product, setProduct] = useState<Product>(props.product ?? new Product());

    const save = () => {
        fetch("/api/product", {
            method: "PUT",
            body: JSON.stringify(product)
        })
    }

    const setTags = (tags: Array<Tag>) => setProduct({ ...product, tags });

    return (
        <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={22}>
                <Form fluid >
                    <Form.ControlLabel>قیمت</Form.ControlLabel>
                    <Input value={product.price} onChange={((val) => setProduct({ ...product, price: parseInt(val) }))} />
                    <Form.ControlLabel>عنوان</Form.ControlLabel>
                    <Input value={product.name} onChange={((val) => setProduct({ ...product, name: val }))} />
                    <Form.ControlLabel>توضیحات</Form.ControlLabel>
                    <Input value={product.description} onChange={((val) => setProduct({ ...product, description: val }))} />
                    <LabelPicker tags={product.tags} setTags={setTags} />
                    <div>
                        {product.pictures?.map(picture => (<p>{picture.path}</p>))}
                    </div>
                    <Button onClick={save}>ثبت</Button>
                </Form>
            </FlexboxGrid.Item>
        </FlexboxGrid>);
}