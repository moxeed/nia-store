import type {NextPage, NextPageContext} from 'next'
import Layout from "../layout";
import {Product} from "../../product/entities/product";
import {ProductDetail} from "../../product/components/product-detail";

interface Props {
    product: Product
}

const ProductDetailPage: NextPage<Props> = ({product}) => {
    return <Layout>
        <ProductDetail product={product}/>
    </Layout>
}

ProductDetailPage.getInitialProps = async (ctx: NextPageContext) => {
    const id = ctx.query["id"];
    const data = await fetch(`http://localhost:3000/api/product/${id}`);
    const product = await data.json();

    return {product: product as Product}
}

export default ProductDetailPage
