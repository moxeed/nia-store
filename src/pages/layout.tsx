import {Content, Drawer, Footer, Form, Header, Input, InputGroup, Nav, Row, Sidenav, Stack} from 'rsuite';
import React, {ReactNode, useState} from "react";
import {Option} from "../product/entities/option";
import {Label} from "../product/entities/label";
import {useRouter} from "next/router";
import Link from "next/link";
import {Check, Search,} from "@rsuite/icons";
import {Query} from "../common/query";
import {useApi} from "../common/safe-fetch";

const states = {
    category: "category",
    home: "home",
    menu: "menu"
}


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
    <Nav.Item>
        <Link href={href}>
            <div onClick={onClick} className="block w-full h-full">
                {children}
            </div>
        </Link>
    </Nav.Item>

function Layout({children, areaScope}: { children: any, areaScope: "/admin/" | "/" }) {
    const router = useRouter()

    const [active, setActive] = useState('home')
    const [search, setSearch] = useState<string>()
    const [options, setOptions] = useState(new Array<Option>())
    const [majorOptions, setMajorOptions] = useState(new Array<Option>())
    const {filters}: { filters?: string } = router.query
    
    const currentQuery = {filters, search}

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
            return Query({...currentQuery,
                filters: newFilters
                    .filter(a => a !== key)
                    .join("-")
            })
        }

        newFilters.push(key)
        return Query({...currentQuery, filters: newFilters.join("-")})
    }

    useApi({
        url: "/api/option" + Query(currentQuery),
        callback: setOptions
    }, [filters, search])

    useApi({
        url: "/api/option?major=true",
        callback: setMajorOptions
    }, [filters, search])
    
    const handleSearch = () => {
        console.log(areaScope)
        router.push(`${areaScope}product` + Query(currentQuery))
    }

    return (
        <>
            <Header className="m-1">
                <Form onSubmit={handleSearch}>
                    <InputGroup>
                        <Input className="px-5 py-3 bg-white w-80" placeholder="جستجو.." value={search}
                               onChange={setSearch}/>
                        <InputGroup.Button onClick={handleSearch} className="border-2"><Search/></InputGroup.Button>
                    </InputGroup>
                </Form>
            </Header>
            <Content className="overflow-y-scroll overflow-x-hidden">
                {children}
            </Content>
            <Footer>
                <Nav reversed appearance="subtle" className="text-center bg-gray-600 rounded-t-xl" onSelect={setActive}
                     justified>
                    <Nav.Item className="py-6 text-gray-200" eventKey={states.category}>دسته بندی</Nav.Item>
                    <Nav.Item href={areaScope} className="py-6 text-gray-200" eventKey={states.home}>نیا کالا</Nav.Item>
                    <Nav.Item className="py-6 text-gray-200" eventKey={states.menu}>فیلتر</Nav.Item>
                </Nav>
            </Footer>
            <Drawer onClose={() => setActive("")} open={active === states.category} size="lg" placement="bottom">
                <Drawer.Header>
                    <Drawer.Title className="text-right">
                        دسته بندی ها
                    </Drawer.Title>
                </Drawer.Header>
                <Drawer.Body className="text-right p-3">
                    <Sidenav>
                        <Nav>
                            {groupedMajorOptions.map(g => <Nav.Menu key={g.label.id} title={g.label.value}>
                                {g.options.map(o =>
                                    <LinkItem key={o.id} href={`${areaScope}product/${afterClickQuery(o)}`}>
                                        {o.key}
                                    </LinkItem>
                                )}
                            </Nav.Menu>)}
                        </Nav>
                    </Sidenav>
                </Drawer.Body>
            </Drawer>
            <Drawer onClose={() => setActive("")} open={active === states.menu} size="lg" placement="bottom">
                <Drawer.Header>
                    <Drawer.Title className="text-right">
                        فیلتر
                    </Drawer.Title>
                </Drawer.Header>
                <Drawer.Body className="text-right p-3">
                    <Sidenav>
                        <Nav>
                            {filters &&
                                <LinkItem href={`${areaScope}product`}>
                                    حذف فیلتر ها
                                </LinkItem>
                            }
                            {groupedOptions.map(g => <Nav.Menu key={g.label.id} title={g.label.value}>
                                {g.options.map(o =>
                                    <LinkItem key={o.id} href={`${areaScope}product/${afterClickQuery(o)}`}>
                                        {o.key}
                                        {isActive(o) ? <Check className="ml-2 text-3xl" fill="green"/> :
                                            <Check className="ml-2 text-3xl" fill="gray"/>}
                                    </LinkItem>
                                )}
                            </Nav.Menu>)}
                        </Nav>
                    </Sidenav>
                </Drawer.Body>
            </Drawer>
        </>
    )
}

export default Layout
