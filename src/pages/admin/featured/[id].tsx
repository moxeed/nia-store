import {NextPage} from "next";
import {FeaturedEditor} from "../../../product/components/option/featured-editor";
import {useRouter} from "next/router";
import Layout from "../../layout";

const ProductPage: NextPage = () => {
    const router = useRouter()
    const {id} = router.query
    
    return <Layout areaScope="/admin">
        <FeaturedEditor id={parseInt(id as string)}/>
    </Layout>
}

export default ProductPage