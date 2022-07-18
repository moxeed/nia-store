import type {NextPage, NextPageContext} from 'next'
import {Product} from "../../../product/entities/product";
import {ProductEditor} from "../../../product/components/product-editor";
import Layout from "../layout";

interface Props {
    product?: Product
}

const EditProduct: NextPage<Props> = ({product}) => {
    return <Layout>
        <ProductEditor product={product}/>
    </Layout>
}

EditProduct.getInitialProps = async (ctx: NextPageContext) => {
    const {id} = ctx.query;
    const data = await fetch(`http://localhost:3000/api/admin/product/${id}`);
    const product = await data.json();

    return {product: product as Product}
}

export default EditProduct
