import {NextPage} from "next";
import {ProductTable} from "../../../product/components/product-table";
import Layout from "../layout";

const ProductPage : NextPage = () => {
    return <Layout>
        <ProductTable/>
    </Layout> 
}

export default ProductPage