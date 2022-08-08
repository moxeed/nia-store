import {NextPage} from "next";
import {useState} from "react";
import {useApi} from "../../../common/safe-fetch";
import {FeaturedOption} from "../../../product/entities/featuredOption";
import Link from "next/link";
import Layout from "../../../common/components/layout";

const ProductPage: NextPage = () => {
    const [featuredOptions, setFeaturedOptions] = useState(new Array<FeaturedOption>())

    useApi({
        url: '/api/admin/featured',
        callback: setFeaturedOptions
    }, [])

    return <Layout areaScope="/admin/">
        {featuredOptions?.map(p =>
            <div key={p.id} className="bg-white text-center p-2 m-2">
                <Link key={p.id} href={"/admin/featured/" + p.id}>
                    <a>
                        <img alt={p.option.key} src={"/api/file/" + p.image}/>
                        <p>{p.option.label.value} - {p.option.key} </p>
                    </a>
                </Link>
            </div>
        )}
    </Layout>
}

export default ProductPage