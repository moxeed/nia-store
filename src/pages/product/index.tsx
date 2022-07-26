import type {NextPage, NextPageContext} from 'next'
import Layout from "../layout";
import {ProductBrief} from "../../product/models/product-brief";
import {ProductCard} from "../../product/components/product-card";
import {getHost} from "../../common/host";
import {Query} from "../../common/query";
import Link from "next/link";
import {Button} from "rsuite";

interface Props {
    products?: Array<ProductBrief>
}

const ProductSearchPage: NextPage<Props> = ({products}) => {
    return <Layout areaScope="/">
        {(products?.length === 0) && <div className="bg-white m-2 p-5 rounded-xl">
            <p className="p-4 text-red-600 text-center">نتیجه ای پیدا نشد</p>
            <Link href="/product">
                <Button appearance="ghost" className="w-full theme-color-main my-1">
                    محصولات
                </Button>
            </Link>
        </div>}
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
