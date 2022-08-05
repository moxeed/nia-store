import {NextPage} from "next";
import {useState} from "react";
import {ProductBrief} from "../../../product/models/product-brief";
import {useRouter} from "next/router";
import {ProductCard} from "../../../product/components/product-card";
import {Query} from "../../../common/query";
import {useApi} from "../../../common/safe-fetch";
import Layout from "../../layout";
import Link from "next/link";
import {Button} from "rsuite";

const ProductPage: NextPage = () => {
    const [products, setProducts] = useState(new Array<ProductBrief>())
    const router = useRouter()
    const {filters, search} = router.query

    useApi({
        url: '/api/admin/product' + Query({filters, search}),
        callback: setProducts
    }, [filters, search])

    return <Layout areaScope="/admin/">
        <Link href="/admin/product/add">
            <Button>
                افزودن محصول
            </Button>
        </Link>
        {(products?.length === 0) && <div className="bg-white m-2 p-5 rounded-xl">
            <p className="p-4 text-red-600 text-center">نتیجه ای پیدا نشد</p>
            <Link href="admin/product">
                <Button appearance="ghost" className="w-full theme-color-main my-1">
                    محصولات
                </Button>
            </Link>
        </div>}
        {products?.map(p => <ProductCard key={p.id} product={p} baseUrl="/admin/product"/>)}
    </Layout>
}

export default ProductPage