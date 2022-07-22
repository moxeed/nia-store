import {Content, Drawer, Footer, Header, Input, Nav, Navbar, Row, Sidenav, TagInput} from 'rsuite';
import {LayoutProps} from "next/dist/lib/app-layout";
import React, {ReactNode, useEffect, useState} from "react";
import {Option} from "../product/entities/option";
import {Label} from "../product/entities/label";
import {useRouter} from "next/router";
import Link from "next/link";

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

const LinkItem = ({href, children}: { href: string, children: ReactNode }) =>
    <Nav.Item>
        <Link href={href}>
            <a className="block w-full h-full">
                {children}
            </a>
        </Link>
    </Nav.Item>

function Layout({children}: LayoutProps) {
    const [active, setActive] = useState('home')
    const [options, setOptions] = useState(new Array<Option>())
    const [majorOptions, setMajorOptions] = useState(new Array<Option>())

    const router = useRouter()

    const currentFilters = router.query["filters"]
    const groupedOptions = groupByLabel(options)
    const groupedMajorOptions = groupByLabel(majorOptions)

    useEffect(() => {
        fetch("/api/option")
            .then(res => res.json())
            .then(setOptions)

        fetch("/api/option?major=true")
            .then(res => res.json())
            .then(setMajorOptions)
    }, [])

    return (
        <>
            <Header className="m-1">
                <Input className="px-5 py-3 bg-gray-100" placeholder="جستجو.."/>            </Header>
            <Content className="overflow-y-scroll overflow-x-hidden">
                {children}
            </Content>
            <Footer>
                <Nav reversed appearance="subtle" className="text-center bg-gray-600 rounded-t-xl" onSelect={setActive}
                     justified >
                    <Nav.Item className="py-6 text-gray-200" eventKey={states.category}>دسته بندی</Nav.Item>
                    <Nav.Item className="py-6 text-gray-200" eventKey={states.home}>نیا کالا</Nav.Item>
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
                            {groupedMajorOptions.map(g => <Nav.Menu title={g.label.value}>
                                {g.options.map(o =>
                                    <LinkItem href={`/product?filters=${currentFilters ?? ""}-${g.label.id}:${o.id}`}>
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
                            {currentFilters &&
                                <LinkItem href={"/product"}>
                                    حذف فیلتر ها
                                </LinkItem>
                            }
                            {groupedOptions.map(g => <Nav.Menu title={g.label.value}>
                                {g.options.map(o =>
                                    <LinkItem href={`/product?filters=${currentFilters ?? ""}-${g.label.id}:${o.id}`}>
                                        {o.key}
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
