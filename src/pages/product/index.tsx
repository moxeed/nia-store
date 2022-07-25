import type {NextPage, NextPageContext} from 'next'
import Layout from "../layout";
import {ProductBrief} from "../../product/models/product-brief";
import {ProductCard} from "../../product/components/product-card";
import {getHost} from "../../common/host";
import {Query} from "../../common/query";

interface Props {
    products?: Array<ProductBrief>
}

const ProductSearchPage: NextPage<Props> = ({products}) => {
    return <Layout>
        {products?.map(p => <ProductCard key={p.id} product={p} baseUrl="/product"/>)}
    </Layout>
}

ProductSearchPage.getInitialProps = async (ctx: NextPageContext) => {
    const {filters, search} = ctx.query
    
    const data = await fetch(`${getHost()}/api/product`+Query({
        filters,
        search
    }));
    const products = await data.json();

    return {products: products as Array<ProductBrief>}
}

export default ProductSearchPage
