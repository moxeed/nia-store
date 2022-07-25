import {NextPage} from "next";
import Layout from "../layout";
import {FeaturedEditor} from "../../../product/components/option/featured-editor";
import {useRouter} from "next/router";

const ProductPage: NextPage = () => {
    const router = useRouter()
    const {id} = router.query
    
    return <Layout>
        <FeaturedEditor id={parseInt(id as string)}/>
    </Layout>
}

export default ProductPage