import type {NextPage} from 'next'
import {ProductEditor} from "../../../product/components/product-editor";
import Layout from "../../layout";

const AddProduct: NextPage = () => {
    return <Layout areaScope="/admin/">
        <ProductEditor/>
    </Layout>
}

export default AddProduct
