import {
    Button,
    Checkbox,
    Content,
    Footer,
    Form,
    Header, IconButton,
    Input,
    InputGroup,
    Nav,
    Sidenav,
} from 'rsuite';
import React, {ReactNode, useState} from "react";
import {Option} from "../product/entities/option";
import {Label} from "../product/entities/label";
import {useRouter} from "next/router";
import Link from "next/link";
import {Location, Phone, Search,} from "@rsuite/icons";
import {Query} from "./query";
import {useApi} from "./safe-fetch";
import Whatsapp from "@rsuite/icons/legacy/Whatsapp";
import Instagram from "@rsuite/icons/legacy/Instagram";
import {ArrowCircleORight} from "@rsuite/icons/lib/icons/legacy";
import CaretDown from "@rsuite/icons/legacy/CaretDown";

const states = {
    category: "category",
    home: "",
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
    <div className="mx-4 p-2">
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
                       setState
                   }: { state: string, areaScope: string, filters?: string, search?: string, setState: (state: string) => void }) => {
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

    return <div style={{height: state !== states.home ? "Calc(100vh - 175px)" : "0px"}} className="transition-all overflow-hidden">
        <div className="p-2">
            <Button className="bg-gray-200 w-full" onClick={() => setState(states.home)}><CaretDown className="text-xl"/></Button>
        </div>
        {(state === states.category) && <Sidenav color="red">
            <Nav className="bg-white">
                {groupedMajorOptions.map(g => <Nav.Menu open eventKey={g.label.id} key={g.label.id}
                                                        title={g.label.value} noCaret>
                    {g.options.map(o =>
                        <LinkItem key={o.id} href={`${areaScope}product/${afterPurgeClickQuery(o)}`}
                                  onClick={() => setState("")}>
                            <ArrowCircleORight color="green" className="mx-2 my-2 text-xl"/> {o.key}
                        </LinkItem>
                    )}
                </Nav.Menu>)}
            </Nav>
        </Sidenav>}
        {(state === states.menu) && <div>
            <Sidenav>
                <Nav className="bg-white h-full">
                    {filters && <div className="bg-red-400 text-white m-2 rounded-xl">
                        <LinkItem href={`${areaScope}product`}>
                            حذف فیلتر ها
                        </LinkItem>
                    </div>
                    }
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
            {(filters !== undefined) && <div className="p-2">
                <Button className="w-full rounded-xl bg-emerald-400 text-white" appearance="subtle"
                        onClick={() => setState("")}>مشاهده
                    محصولات فیلتر شده</Button>
            </div>}
        </div>}
    </div>
}

function Layout({children, areaScope}: { children: any, areaScope: "/admin/" | "/" }) {
    const router = useRouter()

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
            <Header className="mx-1">

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
                {children}
            </Content>
            <Footer className="text-center bg-white rounded-xl m-2">
                <div className="m-2">
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
                </div>
                <ActionBox state={active} areaScope={areaScope} filters={filters} search={currentSearch} setState={setActive}/>
                <Nav reversed appearance="subtle"
                     onSelect={setActive}
                     justified>
                    <Nav.Item className="py-4 text-gray-900" eventKey={states.category}>دسته بندی</Nav.Item>
                    <Nav.Item className="text-gray-900 p-1" eventKey={states.home}>
                        <Link href={areaScope}>
                            <div className="h-full w-full">
                                <img className="inline w-1/2" src="/public/logo1.jpeg" alt="نیاکالا"/>
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
