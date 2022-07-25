import Image from "next/image"
import { Input, InputGroup, Nav, Navbar, Sidenav } from 'rsuite';
import Logo from "../../../../../assets/image/logo.png"
import classes from "./header.module.css"
import { SearchIcon } from '../../icons/search';
import { CallIcon } from '../../icons/call';
import { SmsIcon } from '../../icons/sms';
import React from "react"
import { MenuIcon } from '../../icons/menu';
import { CrossIcon } from '../../icons/cross';

const products = [{
    title: "کولر گازی",
    items: [
        { label: "کولر نوع آ", link: "/product/1" }
    ]
}, {
    title: "کولر گازی",
    items: [
        { label: "کولر نوع آ", link: "/product/1" }
    ]
}, {
    title: "کولر گازی",
    items: [
        { label: "کولر نوع آ", link: "/product/1" }
    ]
}, {
    title: "کولر گازی",
    items: [
        { label: "کولر نوع آ", link: "/product/1" }
    ]
}]

export const Header = () => {
    const [expanded, setExpanded] = React.useState(false);
    const toggle = () => setExpanded(!expanded);

    return (<> <Navbar className={classes.mainNav}>
        <Navbar.Brand className={classes.logo}> <Image src={Logo} alt="logo" width={35}
            height={25} />نیاکالا</Navbar.Brand>
        <Nav className={classes.responsiveHide}>
            {products.map((item, _id) => (<Nav.Menu title={item.title} key={_id}>
                {item.items.map((product, _idx) => (<Nav.Item eventKey={`${_idx}`} href={product.link} key={_idx}>{product.label}</Nav.Item>
                ))}

            </Nav.Menu>))}
        </Nav>

        <Nav pullRight className={classes.responsiveHide} >
            <Nav.Item><InputGroup inside >
                <Input placeholder={"جست و جو"} />
                <InputGroup.Button>
                    <SearchIcon />  </InputGroup.Button>
            </InputGroup></Nav.Item>
            <Nav.Item>پیشنهادات ویژه</Nav.Item>

        </Nav>
        <Nav pullRight className={classes.responsiveShow}>
            <Nav.Item onClick={toggle} >{expanded ? < CrossIcon /> : <MenuIcon />}</Nav.Item>
        </Nav>
    </Navbar>
        <Sidebar expanded={expanded} />
    </>)
}

const storeInfo = [
    {
        icon: <CallIcon />,
        info: "0918 082 9934"
    },
    {
        icon: <SmsIcon />,
        info: "0918 082 9935"
    }
]

export const BrandHeader = () => {
    return (<Navbar className={classes.helperNav} appearance="inverse">
        <Nav>
            {storeInfo.map((item, _id) => (<Nav.Item className={classes.info} key={_id} href={`tel:${item.info}`}>
                {item.icon} <span>{item.info}</span>
            </Nav.Item>))}
        </Nav>
        <Nav pullRight className={classes.responsiveHide}>
            <Nav.Item>پیگیری سفارشات</Nav.Item>
            <Nav.Item>مشخصات فروشگاه</Nav.Item>
            <Nav.Item>درباره ما</Nav.Item>

        </Nav>

    </Navbar>)
}


const Sidebar = ({ expanded }: { expanded: boolean }) => {
    return (<div style={{ width: "100%", position: "relative" }}>
        <Sidenav expanded={expanded} style={{ display: !expanded ? "none" : "flex", position: "absolute", zIndex: "10" }}>
            <Sidenav.Body>
                <Nav className={classes.mainNav}>
                    <Nav.Item href={"/"} className={classes.mainNav} >
                        صفحه اصلی
                    </Nav.Item>
                    {products.map((item, _id) => (<Nav.Menu title={item.title} key={_id} className={classes.mainNav}>
                        {item.items.map((product, _idx) => (<Nav.Item eventKey={`${_idx}`} href={product.link} key={_idx}>{product.label}</Nav.Item>
                        ))}

                    </Nav.Menu>))}
                </Nav>
            </Sidenav.Body>
        </Sidenav>
    </div>)
}