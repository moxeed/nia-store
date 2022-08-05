import type {NextPage} from 'next'
import Layout from './layout';
import {FeaturedOption} from "../product/entities/featuredOption";
import {safeFetch} from "../common/safe-fetch";
import {getHost} from "../common/host";
import Link from "next/link";
import {Carousel, Col, CustomProvider, Row} from "rsuite";

interface Props {
    featuredOptions: Array<FeaturedOption>
}

const modes: { [key: number]: string } = {
    1: "single",
    2: "duplicate",
    3: "many"
}

const FeaturedItem = ({featuredItem, description = false}: { featuredItem: FeaturedOption, description?: boolean }) => {
    return <Link key={featuredItem.id}
                 href={`/product?filters=${featuredItem.option.label.id}:${featuredItem.option.id}`}>
        <div>
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
    const mode = modes[featuredOptions.length]

    if (mode == "single") {
        return <>
            {featuredOptions.map(f => <FeaturedItem key={f.id} featuredItem={f}/>)}
        </>
    }

    if (mode == "duplicate") {
        return <>
            <Row>
                {featuredOptions.map(f => <Col xs={12} key={f.id}>
                    <FeaturedItem featuredItem={f}/>
                </Col>)}
            </Row>
        </>
    }

    const top = featuredOptions.slice(0, 2)
    const others = featuredOptions.slice(2)

    return <>
        <Row>
            {top.map(f => <Col xs={12} key={f.id}>
                <FeaturedItem featuredItem={f}/>
            </Col>)}
        </Row>
        <Row className="overflow-scroll">
            {others.map(f => <Col xs={8} key={f.id}>
                <FeaturedItem featuredItem={f} description={true}/>
            </Col>)}
        </Row>
    </>
}

const Home: NextPage<Props> = ({featuredOptions}: Props) => {
    return (
        <Layout areaScope="/">
            <div className="bg-white m-2 rounded-xl overflow-hidden p-1">
                <FeaturedSection featuredOptions={[...featuredOptions, ...featuredOptions, ...featuredOptions]}/>
            </div>
            {/*<CustomProvider rtl={true}>*/}
            <Carousel style={{height: "50vw"}} autoplay={true} className="m-2 rounded-xl bg-white overflow-hidden">
                <img src="/car1.jpg"/>
                <img src="/car2.jpg"/>
                <img src="/car3.jpg"/>
                <img src="/car4.jpg"/>
                <img src="/car5.jpg"/>
            </Carousel>
            {/*</CustomProvider>*/}
        </Layout>
    )
}

Home.getInitialProps = async (): Promise<Props> => {
    const [result] = safeFetch(`${getHost()}/api/featured`)
    const response = await result
    return {featuredOptions: response as Array<FeaturedOption>}
}

export default Home
