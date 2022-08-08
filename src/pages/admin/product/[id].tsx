import type {NextPage, NextPageContext} from 'next'
import {Product} from "../../../product/entities/product";
import {ProductEditor} from "../../../product/components/product-editor";
import {getHost} from "../../../common/host";
import Layout from "../../../common/components/layout";

interface Props {
    product?: Product
}

const EditProduct: NextPage<Props> = ({product}) => {
    return <Layout areaScope="/admin/">
        <ProductEditor product={product}/>
    </Layout>
}

EditProduct.getInitialProps = async (ctx: NextPageContext) => {
    const {id} = ctx.query;
    const data = await fetch(`${getHost()}/api/admin/product/${id}`);
    const product = await data.json();

    return {product: product as Product}
}

export default EditProduct
