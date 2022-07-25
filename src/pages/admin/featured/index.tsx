import {NextPage} from "next";
import {useState} from "react";
import {useApi} from "../../../common/safe-fetch";
import {FeaturedOption} from "../../../product/entities/featuredOption";
import Link from "next/link";
import Layout from "../../layout";

const ProductPage: NextPage = () => {
    const [featuredOptions, setFeaturedOptions] = useState(new Array<FeaturedOption>())

    useApi({
        url: '/api/admin/featured',
        callback: setFeaturedOptions
    }, [])

    return <Layout areaScope="/admin">
        {featuredOptions?.map(p => <Link key={p.id} href={"/admin/featured/" + p.id}>
            <a>
                <p>{p.option.label.value} - {p.option.key} </p>
                <img alt={p.option.key} src={"/files/"+p.image}/>
            </a>
        </Link>)}
    </Layout>
}

export default ProductPage