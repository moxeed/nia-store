import {NextPage} from "next";
import Layout from "../layout";
import {useState} from "react";
import {useApi} from "../../../common/safe-fetch";
import {FeaturedOption} from "../../../product/entities/featuredOption";
import Link from "next/link";

const ProductPage: NextPage = () => {
    const [featuredOptions, setFeaturedOptions] = useState(new Array<FeaturedOption>())

    useApi({
        url: '/api/admin/featured',
        callback: setFeaturedOptions
    }, [])

    return <Layout>
        {featuredOptions?.map(p => <Link key={p.id} href={"/admin/featured/" + p.id}>
            <a>
                <p>{p.option.label.value} - {p.option.key} </p>
                <img alt={p.option.key} src={"/files/"+p.image}/>
            </a>
        </Link>)}
    </Layout>
}

export default ProductPage