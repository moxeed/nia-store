import type {NextPage} from 'next'
import Layout from '../common/layout';
import {FeaturedOption} from "../product/entities/featuredOption";
import {safeFetch} from "../common/safe-fetch";
import {getHost} from "../common/host";
import Link from "next/link";
import {Carousel} from "rsuite";
import {NiaWrapper} from "../common/components/nia-wrapper";
import QuoteRight from "@rsuite/icons/legacy/QuoteRight";

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
            {description && <p className="text-center text-xs pb-2">
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
        {first && <FeaturedItem featuredItem={first}/>}
        {items.map(f => <div key={f.id} className="w-1/2 inline-block">
                <FeaturedItem featuredItem={f} description={true}/>
            </div>
        )}
    </div>
}

const Home: NextPage<Props> = ({featuredOptions}: Props) => {
    return (
        <Layout areaScope="/">
            <NiaWrapper>
                <FeaturedSection featuredOptions={[...featuredOptions, ...featuredOptions]}/>
            </NiaWrapper>
            <NiaWrapper>
                <Carousel style={{height: "50vw"}} autoplay={true}>
                    <img src="/car1.jpg"/>
                    <img src="/car2.jpg"/>
                    <img src="/car3.jpg"/>
                    <img src="/car4.jpg"/>
                    <img src="/car5.jpg"/>
                </Carousel>
            </NiaWrapper>
            <NiaWrapper className="px-12 pb-2 text-center">
                <img src="/trusted.png" alt="نماینده برتر برندهای معتبر داخلی"/>
                <p className="p-2">
                    <QuoteRight/> کیفیت هرگز از مد نمی افتد
                </p>
            </NiaWrapper>
        </Layout>
    )
}

Home.getInitialProps = async (): Promise<Props> => {
    const [result] = safeFetch(`${getHost()}/api/featured`)
    const response = await result
    return {featuredOptions: response as Array<FeaturedOption>}
}

export default Home
