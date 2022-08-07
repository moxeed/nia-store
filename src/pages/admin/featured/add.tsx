import {NextPage} from "next";
import {FeaturedEditor} from "../../../product/components/option/featured-editor";
import Layout from "../../../common/layout";

const ProductPage: NextPage = () => {
    return <Layout areaScope="/admin/">
        <FeaturedEditor/>
    </Layout>
}

export default ProductPage