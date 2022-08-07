import type {NextPage, NextPageContext} from 'next'
import Layout from "../../common/layout";
import {Product} from "../../product/entities/product";
import {ProductDetail} from "../../product/components/product-detail";
import {getHost} from "../../common/host";

interface Props {
    product: Product
}

const ProductDetailPage: NextPage<Props> = ({product}) => {
    return <Layout areaScope="/">
        <ProductDetail product={product}/>
    </Layout>
}

ProductDetailPage.getInitialProps = async (ctx: NextPageContext) => {

    const id = ctx.query["id"];
    const data = await fetch(`${getHost()}/api/product/${id}`);
    const product = await data.json();

    return {product: product as Product}
}

export default ProductDetailPage
