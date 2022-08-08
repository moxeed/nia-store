import {
    Button,
    Checkbox, Col, Container,
    Content,
    Footer,
    Form,
    Header, IconButton,
    Input,
    InputGroup, Loader,
    Nav, Row,
    Sidenav,
} from 'rsuite';
import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {Option} from "../../product/entities/option";
import {Label} from "../../product/entities/label";
import {useRouter} from "next/router";
import Link from "next/link";
import {ArrowRight, Location, Phone, Search,} from "@rsuite/icons";
import {Query} from "../query";
import {useApi} from "../safe-fetch";
import Whatsapp from "@rsuite/icons/legacy/Whatsapp";
import Instagram from "@rsuite/icons/legacy/Instagram";
import {ArrowCircleORight} from "@rsuite/icons/lib/icons/legacy";
import CaretDown from "@rsuite/icons/legacy/CaretDown";
import {NiaWrapper} from "./nia-wrapper";

const states = {
    category: "category",
    home: "",
    menu: "menu"
}

export const LoadingContext = createContext<{ loading: boolean, setLoading: (newState: boolean) => void }>({
    loading: false,
    setLoading: () => {
    }
})

const groupByLabel = (options: Array<Option>): Array<{ label: Label, options: Array<Option> }> => {
    const grouped = new Map<number, { label: Label, options: Array<Option> }>();

    for (const option of options) {
        const prev = grouped.get(option.label.id as number) ?? {label: option.label, options: []};
        prev.options.push(option)
        grouped.set(option.label.id as number, prev);
    }

    return Array.from(grouped.values())
}

const LinkItem = ({href, children, onClick}: { href: string, children: ReactNode, onClick?: () => void }) =>
    <div className="mx-4 p-2 border-b">
        <Link href={href}>
            <div onClick={onClick} className="block w-full h-full text-sm">
                {children}
            </div>
        </Link>
    </div>

const ActionBox = ({
                       state,
                       areaScope,
                       filters,
                       search,
                       setState,
                       children
                   }: { state: string, areaScope: string, filters?: string, search?: string, children: ReactNode, setState: (state: string) => void }) => {

    const {loading} = useContext(LoadingContext)
    const [options, setOptions] = useState(new Array<Option>())
    const [majorOptions, setMajorOptions] = useState(new Array<Option>())

    const currentQuery = {filters, search}

    useApi({
        url: "/api/option" + Query(currentQuery),
        callback: setOptions
    }, [filters])

    useApi({
        url: "/api/option?major=true",
        callback: setMajorOptions
    }, [filters])


    const groupedOptions = groupByLabel(options)
    const groupedMajorOptions = groupByLabel(majorOptions)

    const isActive = (option: Option): boolean | undefined => {
        const key = `${option.label.id}:${option.id}`
        return filters?.split("-").some(a => a == key)
    }

    const afterClickQuery = (option: Option) => {
        const key = `${option.label.id}:${option.id}`
        const newFilters = filters?.split("-") ?? []

        if (isActive(option)) {
            return Query({
                ...currentQuery,
                filters: newFilters
                    .filter(a => a !== key)
                    .join("-")
            })
        }

        newFilters.push(key)
        return Query({...currentQuery, filters: newFilters.join("-")})
    }

    const afterPurgeClickQuery = (option: Option) => {
        const key = `${option.label.id}:${option.id}`
        const newFilters = [key]
        return Query({...currentQuery, filters: newFilters.join("-")})
    }

    return <>
        <div style={loading ? {visibility: "visible", opacity: 1} : {visibility: "hidden", opacity: 0}}
             className="fixed transition-all w-full h-full bottom-0 top-0 left-0 right-0 z-20 bg-white grid place-items-center">
            <img src="/logo1.jpg" alt="نیا کالا" width="100"/>
            <Loader size="lg"/>
        </div>
        <NiaWrapper style={{height: state !== states.home ? "100%" : "0"}}
                    className="transition-all bg-white text-center my-0">
            {(state === states.category) && <Sidenav className="h-full bg-white">
                <Container className="h-full">
                    <Header>
                        <div className="p-2">
                            <Button className="bg-gray-200 w-full" onClick={() => setState(states.home)}><CaretDown
                                className="text-xl"/></Button>
                        </div>
                    </Header>
                    <Content className="overflow-scroll">
                        <Nav className="bg-white">
                            {groupedMajorOptions.map(g => <Nav.Menu open eventKey={g.label.id} key={g.label.id}
                                                                    title={g.label.value} noCaret>
                                {g.options.map(o =>
                                    <LinkItem key={o.id} href={`${areaScope}product/${afterPurgeClickQuery(o)}`}
                                              onClick={() => setState("")}>
                                        <ArrowRight color="gray" className="mx-2 my-2 text-xl"/> {o.key}
                                    </LinkItem>
                                )}
                            </Nav.Menu>)}
                        </Nav>
                    </Content>
                </Container>
            </Sidenav>
            }
            {(state === states.menu) && <Container className="h-full">
                <Header>
                    <div className="p-2">
                        <Button className="bg-gray-200 w-full" onClick={() => setState(states.home)}><CaretDown
                            className="text-xl"/></Button>
                    </div>
                </Header>
                <Content className="overflow-scroll">
                    <Sidenav>
                        <Nav className="bg-white h-full">
                            {groupedOptions.map(g => <Nav.Menu key={g.label.id} title={g.label.value}>
                                {g.options.map(o =>
                                    <LinkItem key={o.id} href={`${areaScope}product/${afterClickQuery(o)}`}>
                                        <Checkbox checked={isActive(o)}/>
                                        {o.key}
                                    </LinkItem>
                                )}
                            </Nav.Menu>)}
                        </Nav>
                    </Sidenav>
                </Content>
                <Footer>
                    <Row>
                        <Col xs={12} className="p-2 pr-5">
                            {(filters !== undefined) &&
                                <div
                                    className="w-full rounded-xl p-2 bg-emerald-500 text-white border-2 border-emerald-500"
                                    onClick={() => setState("")}>
                                    اعمال فیلتر</div>}
                        </Col>
                        <Col xs={12} className="p-2 pl-5">
                            {(filters !== undefined) && <Link href={`${areaScope}product`}>
                                <div className="w-full rounded-xl border-2 p-2 border-red-500 text-red-500"
                                     onClick={() => setState("")}>
                                    حذف فیلتر
                                </div>
                            </Link>
                            }
                        </Col>
                    </Row>
                </Footer>
            </Container>}
        </NiaWrapper>
        {state === states.home && children}
    </>
}

function Layout({children, areaScope}: { children: any, areaScope: "/admin/" | "/" }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState(states.home)
    const [search, setSearch] = useState<string>()

    const {filters, search: currentSearch}: { filters?: string, search?: string } = router.query
    const currentQuery = {filters, search}

    const handleSearch = () => {
        setActive(states.home)
        router.push(`${areaScope}product` + Query(currentQuery))
    }

    return (
        <>
            <Header className="mx-1 m-1">
                <Form onSubmit={handleSearch}>
                    <InputGroup>
                        <Input className="px-5 py-3 bg-white w-80" placeholder="جستجو.." value={search}
                               onChange={setSearch}/>
                        <InputGroup.Button onClick={handleSearch}
                                           className="border-2 bg-white"><Search/></InputGroup.Button>
                    </InputGroup>
                </Form>
            </Header>
            <Content className="overflow-y-scroll overflow-x-hidden">
                <LoadingContext.Provider value={{loading, setLoading}}>
                    <ActionBox state={active} areaScope={areaScope} filters={filters} search={currentSearch}
                               setState={setActive}>
                        {children}
                    </ActionBox>
                </LoadingContext.Provider>
            </Content>
            <Footer className="text-center bg-white rounded-xl overflow-hidden m-2">
                {active === states.home && <div className="m-2">
                    <Link href="tel:09124097690">
                        <IconButton className="bg-blue-500 mx-5" icon={<Phone color="white"/>} circle size="md"/>
                    </Link>
                    <Link href="https://wa.me/0989124097690">
                        <IconButton className="bg-green-500 mx-5" icon={<Whatsapp color="white"/>} circle
                                    size="md"/>
                    </Link>
                    <Link href="https://instagram.com/hasannia.niakala">
                        <IconButton className="bg-pink-600 mx-5" icon={<Instagram color="white"/>} circle
                                    size="md"/>
                    </Link>
                    <Link href="https://goo.gl/maps/uY21pEyUVkmbUzke8">
                        <IconButton className="bg-orange-500 text-white mx-5" icon={<Location color="white"/>}
                                    circle size="md"/>
                    </Link>
                </div>}
                <Nav reversed appearance="subtle"
                     onSelect={setActive}
                     justified>
                    <Nav.Item className="py-4 text-gray-900" eventKey={states.category}>دسته بندی</Nav.Item>
                    <Nav.Item className="text-gray-900 p-1" eventKey={states.home}>
                        <Link href={areaScope}>
                            <div className="h-full w-full">
                                <img className="inline w-1/2" src="/logo1.jpg" alt="نیاکالا"/>
                            </div>
                        </Link>
                    </Nav.Item>
                    <Nav.Item className="py-4  text-gray-900" eventKey={states.menu}>فیلتر</Nav.Item>
                </Nav>
            </Footer>
        </>
    )
}

export default Layout
