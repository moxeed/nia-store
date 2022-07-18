import {Content, Drawer, Footer, Nav, Navbar, Sidenav} from 'rsuite';
import {LayoutProps} from "next/dist/lib/app-layout";
import Home from "@rsuite/icons/legacy/Home";
import {useEffect, useState} from "react";
import {Option} from "../product/entities/option";
import {Label} from "../product/entities/label";
import {router} from "next/client";
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

function Layout({children}: LayoutProps) {
    const [active, setActive] = useState('home')
    const [options, setOptions] = useState(new Array<Option>())

    const router = useRouter()

    const currentFilters = router.query["filters"]
    const groupedOptions = groupByLabel(options)
    console.log(groupedOptions)
    useEffect(() => {
        fetch("/api/option")
            .then(res => res.json())
            .then(setOptions)
    }, [])

    return (
        <>
            <Content className="h-screen">
                {children}
            </Content>
            <Footer>
                <Nav className="text-center" activeKey={active} onSelect={setActive} justified>
                    <Nav.Item className="py-3" eventKey={states.category}>دسته بندی</Nav.Item>
                    <Nav.Item className="py-3 text-white bg-blue-800" eventKey={states.home} icon={<Home/>}/>
                    <Nav.Item className="py-3" eventKey={states.menu}>منو</Nav.Item>
                </Nav>
            </Footer>
            <Drawer onClose={() => setActive("")} open={active === states.category} size="full" placement="bottom">
                <Drawer.Header>
                    <Drawer.Title className="text-right">
                        دسته بندی ها
                    </Drawer.Title>
                </Drawer.Header>
                <Drawer.Body className="text-right p-3">
                    <Sidenav>
                        <Nav>
                            {currentFilters &&
                                <Nav.Item href={"/product"}>
                                    حذف فیلتر ها
                                </Nav.Item>
                            }
                            {groupedOptions.map(g => <Nav.Menu title={g.label.value}>
                                {g.options.map(o => <Nav.Item
                                        href={`/product?filters=${currentFilters??""}-${g.label.id}:${o.id}`}>
                                        {o.key}
                                    </Nav.Item>
                                )}
                            </Nav.Menu>)}
                        </Nav>
                    </Sidenav>
                </Drawer.Body>
            </Drawer>
            <Drawer onClose={() => setActive("")} open={active === states.menu} placement="bottom">
                <p>menu</p>
            </Drawer>
        </>
    )
}

export default Layout
