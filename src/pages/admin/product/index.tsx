import {NextPage} from "next";
import Layout from "../layout";
import {useState} from "react";
import {ProductBrief} from "../../../product/models/product-brief";
import {useRouter} from "next/router";
import {ProductCard} from "../../../product/components/product-card";
import {Query} from "../../../common/query";
import {useApi} from "../../../common/safe-fetch";

const ProductPage: NextPage = () => {
    const [products, setProducts] = useState(new Array<ProductBrief>())
    const router = useRouter()
    const {filters} = router.query

    useApi({
        url: '/api/admin/product' + Query({filters}),
        callback: setProducts
    }, [filters])

    return <Layout>
        {products?.map(p => <ProductCard key={p.id} product={p} baseUrl="/admin/product"/>)}
    </Layout>
}

export default ProductPage