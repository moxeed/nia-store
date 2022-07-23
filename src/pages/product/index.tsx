import type {NextPage, NextPageContext} from 'next'
import Layout from "../layout";
import {ProductBrief} from "../../product/models/product-brief";
import {ProductCard} from "../../product/components/product-card";
import {getHost} from "../../common/host";

interface Props {
    products?: Array<ProductBrief>
}

const ProductSearchPage: NextPage<Props> = ({products}) => {
    return <Layout>
        {products?.map(p => <ProductCard key={p.id} product={p} baseUrl="/product"/>)}
    </Layout>
}

ProductSearchPage.getInitialProps = async (ctx: NextPageContext) => {
    const filters = ctx.query["filters"]
    
    const data = await fetch(`${getHost()}/api/product?filters=${filters??""}`);
    const products = await data.json();

    return {products: products as Array<ProductBrief>}
}

export default ProductSearchPage
