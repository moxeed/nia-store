import {Col, Divider, Row} from "rsuite";
import {ProductBrief} from "../models/product-brief";
import Link from "next/link";

export const Price = ({value}: { value: number }) => <div className="text-green-600 py-1 text-sm">
    {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال
</div>

export const ProductCard = (props: { product: ProductBrief, baseUrl: string }) => {
    const {product, baseUrl} = props

    return <Link href={`${baseUrl}/${product.id}`}>
        <Row className="m-2 bg-white rounded-xl overflow-hidden">
            <Col className="p-0" xs={10}>
                <img alt={product.name} src={"/api/file/" + product.file}></img>
            </Col>
            <Col className="pr-5 my-4 border-r">
                <Row className="text-lg mb-2">{product.name}</Row>
                <Row>
                    <Price value={product.price}/>
                </Row>
                <Row>
                    {product.options?.map(o =>
                        <div key={o.id} className="inline-block ml-2 mt-1 px-2 py-1 theme-color-main rounded text-xs">
                            {o.key}
                        </div>)}
                </Row>
            </Col>
        </Row>
    </Link>
}

