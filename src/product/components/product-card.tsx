import {Col, Panel, Row} from "rsuite";
import {ProductBrief} from "../models/product-brief";
import Image from "next/image";
import Link from "next/link";

export const ProductCard = (props: { product: ProductBrief }) => {
    const {product} = props

    return <Link href={"/product/" + product.id}>
        <Panel>
            <Row>
                <Col sm={8}>
                    <img src={"/files/"+product.file}></img>
                </Col>
                <Col sm={16}>
                    <Row>{product.name}</Row>
                    <Row>{product.price}</Row>
                </Col>
            </Row>
        </Panel>
    </Link>
}