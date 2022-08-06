import type {NextPage} from 'next'
import Layout from './layout';
import {FeaturedOption} from "../product/entities/featuredOption";
import {safeFetch} from "../common/safe-fetch";
import {getHost} from "../common/host";
import Link from "next/link";
import {Carousel, Col, CustomProvider, Row} from "rsuite";
import {CustomContext} from "rsuite/CustomProvider";

interface Props {
    featuredOptions: Array<FeaturedOption>
}

const FeaturedItem = ({featuredItem, description = false}: { featuredItem: FeaturedOption, description?: boolean }) => {
    return <Link key={featuredItem.id}
                 href={`/product?filters=${featuredItem.option.label.id}:${featuredItem.option.id}`}>
        <div className="px-2">
            <div className="my-2 rounded-xl bg-white overflow-hidden">
                <img alt={featuredItem.option.key} src={"/api/file/" + featuredItem.image}/>
            </div>
            {description && <p className="text-center text-xs p-1">
                {featuredItem.option.key}
            </p>}
        </div>
    </Link>
}

const FeaturedSection = ({featuredOptions}: Props) => {
    const odd = featuredOptions.length % 2 !== 0
    const first = odd ? featuredOptions[0] : undefined
    const items = odd ? featuredOptions.slice(1) : featuredOptions

    return <div>
        {first && <FeaturedItem featuredItem={first} />}
        {items.map(f => <div key={f.id} className="w-1/2 inline-block">
                <FeaturedItem featuredItem={f} description={true}/>
            </div>
        )}
    </div>
}

const Home: NextPage<Props> = ({featuredOptions}: Props) => {
    return (
        <Layout areaScope="/">
            <div className="bg-white m-2 rounded-xl overflow-hidden p-1">
                <FeaturedSection featuredOptions={featuredOptions}/>
            </div>
            <Carousel style={{height: "50vw"}} autoplay={true} className="m-2 rounded-xl bg-white overflow-hidden">
                <img src="/car1.jpg"/>
                <img src="/car2.jpg"/>
                <img src="/car3.jpg"/>
                <img src="/car4.jpg"/>
                <img src="/car5.jpg"/>
            </Carousel>
        </Layout>
    )
}

Home.getInitialProps = async (): Promise<Props> => {
    const [result] = safeFetch(`${getHost()}/api/featured`)
    const response = await result
    return {featuredOptions: response as Array<FeaturedOption>}
}

export default Home
