import {NextPage} from "next";
import Layout from "../layout";
import {FeaturedEditor} from "../../../product/components/option/featured-editor";

const ProductPage: NextPage = () => {
    return <Layout>
        <FeaturedEditor/>
    </Layout>
}

export default ProductPage