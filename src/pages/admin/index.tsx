import type {NextPage} from 'next'
import Layout from "../../common/components/layout";
import Link from "next/link";
import {Button} from "rsuite";

const Home: NextPage = () => {
    return (
        <Layout areaScope="/">
            <Link href="/admin/product/">
                <div className="py-2 px-4">
                    <Button appearance="subtle" className="w-full p-4 bg-white">
                        محصولات
                    </Button>
                </div>
            </Link>
            <Link href="/admin/featured">
                <div className="py-2 px-4">
                    <Button appearance="subtle" className="w-full p-4 bg-white">
                        ایتم های صفحه اصلی
                    </Button>
                </div>
            </Link>
        </Layout>
    )
}

export default Home
