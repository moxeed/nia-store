import {Content, CustomProvider, Nav, Sidebar, Sidenav} from 'rsuite';
import {LayoutProps} from "next/dist/lib/app-layout";
import {useState} from "react";
import Link from "next/link";
import {Dashboard} from "@rsuite/icons";
import Magic from "@rsuite/icons/legacy/Magic";

function Layout({children}: LayoutProps) {
    const [expanded, setExpanded] = useState(true);
    const [activeKey, setActiveKey] = useState('1');
    return (
        <>
            <Sidebar>
                <Sidenav className="h-screen" expanded={expanded}>
                    <Sidenav.Header>
                        <div className="p-4 text-xl text-center text-white bg-cyan-500">آکام تجارت</div>
                    </Sidenav.Header>
                    <Sidenav.Body>
                        <Nav activeKey={activeKey} onSelect={setActiveKey}>
                            <Link href="/">
                                <Nav.Item eventKey="1" icon={<Dashboard/>}>
                                    داشبورد
                                </Nav.Item>
                            </Link>
                            <Link href="admin/product">
                                <Nav.Item eventKey="2" icon={<Magic/>}>
                                    لیست محصولات
                                </Nav.Item>
                            </Link>
                            <Link href="admin/product/add">
                                <Nav.Item eventKey="3" icon={<Magic/>}>
                                    افزودن محصول
                                </Nav.Item>
                            </Link>
                        </Nav>
                    </Sidenav.Body>
                    <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)}/>
                </Sidenav>
            </Sidebar>
            <Content className="h-screen">
                {children}
            </Content>
        </>
    )
}

export default Layout
