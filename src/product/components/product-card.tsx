import {Col, Row} from "rsuite";
import {ProductBrief} from "../models/product-brief";
import Link from "next/link";

export const Price = ({value}: { value: number }) => <div className="text-green-600">
    {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال
</div>

export const ProductCard = (props: { product: ProductBrief }) => {
    const {product} = props

    return <Link href={"/product/" + product.id}>
        <Row className="m-2 mt-1 bg-gray-100 rounded-xl overflow-hidden">
            <Col className="p-0" xs={12}>
                <img alt={product.name} src={"/files/" + product.file}></img>
            </Col>
            <Col className="pt-3" xs={12}>
                <Row className="text-lg mb-2">{product.name}</Row>
                <Row>
                    <Price value={product.price}/>
                </Row>
                <Row>
                    {product.options?.map(o =>
                        <div className="inline-block ml-2 mt-1 px-2 py-1 bg-rose-500 text-white rounded text-xs">
                            {o.key}
                        </div>)}
                </Row>
            </Col>
        </Row>
    </Link>
}

