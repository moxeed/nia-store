import type {NextPage} from 'next'
import Layout from './layout';
import {FeaturedOption} from "../product/entities/featuredOption";
import {safeFetch} from "../common/safe-fetch";
import {getHost} from "../common/host";
import {Button} from "rsuite";
import Link from "next/link";

interface Props {
    featuredOptions: Array<FeaturedOption>
}

const Home: NextPage<Props> = ({featuredOptions}: Props) => {
    return (
        <Layout areaScope="/">
            {featuredOptions.map(f =>
                <Link key={f.id} href={`/product?filters=${f.option.label.id}:${f.option.id}`}
                      className="w-full px-5 py-3">
                    <div className="m-2 rounded-xl bg-white overflow-hidden">
                        <img alt={f.option.key} src={"/api/file/" + f.image}/>
                        <p className="text-center text-sm p-2">
                            مشاهده محصولات {f.option.key}
                        </p>
                    </div>
                </Link>
            )}
        </Layout>
    )
}

Home.getInitialProps = async (): Promise<Props> => {
    const [result] = safeFetch(`${getHost()}/api/featured`)
    const response = await result
    return {featuredOptions: response as Array<FeaturedOption>}
}

export default Home
