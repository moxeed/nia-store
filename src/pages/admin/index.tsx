import type {NextPage} from 'next'
import Layout from "../layout";
import Link from "next/link";
import {Button} from "rsuite";

const Home: NextPage = () => {
    return (
        <Layout areaScope="/">
            <Link href="/admin/product/">
                <Button appearance="subtle" className="w-full my-2 mx-5 p-4 bg-white">
                    محصولات
                </Button>
            </Link>
            <Link href="/admin/featured">
                <Button appearance="subtle" className="my-2 mx-5 p-4 bg-white">
                    ایتم های صفحه اصلی
                </Button>
            </Link>
        </Layout>
    )
}

export default Home
