import type { NextPage, NextPageContext } from 'next'
import { ProductEditor } from '../../product/components/product-editor'
import { Product } from '../../product/entities/product'

interface Props {
    product?: Product
}

const EditProduct: NextPage<Props> = ({ product }) => {
    return <ProductEditor product={product} />;
}

EditProduct.getInitialProps = async (ctx: NextPageContext) => {
    const { id } = ctx.query;
    const data = await fetch(`http://localhost:3000/api/product/${id}`);
    const product = await data.json();

    return { product: product as Product }
}

export default EditProduct
