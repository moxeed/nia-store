import { Container, Grid, Col, Carousel, Button } from 'rsuite';
import classes from "./banner.module.css";
import { ShopIcon } from '../../icons/shop';

export const Banner = () => {
    return (<Container>
        <Grid fluid className={classes.bannerContianer}>
            <Col xs={24} sm={24} md={14} className={classes.introContainer}><BannerCarousel /></Col>
            <Col xs={24} sm={24} md={10} className={classes.introContainer}><Intro /></Col>
        </Grid>
    </Container>)
}

const images = [
    ...new Array(10).fill("https://etimg.etb2bimg.com/photo/82136874.cms")
]

const BannerCarousel = () => {
    return (<Carousel
        className={classes.introContainer}
        key={`${"left"}.${"bar"}`}
        placement={"left"}
        shape={"bar"}
        autoplay={true}
    >
        {images.map((item, _id) => <img className="responsiveImg" key={_id} alt="" src={item} />
        )}

    </Carousel>)
}

const Intro = () => {
    return (<Container className={classes.intro}>
        <h2 className={classes.title}>نیاکالا</h2>
        <p className={classes.subtitle}>به نیاکالا خوش آمدید، نیاکالا با لوازم خانگی و جهزیه در خدمت شماست.</p>
        <p className={classes.subtitle}>به نیاکالا خوش آمدید، نیاکالا با لوازم خانگی و جهزیه در خدمت شماست.</p>
        <p className={classes.subtitle}>به نیاکالا خوش آمدید، نیاکالا با لوازم خانگی و جهزیه در خدمت شماست.</p>
        <Button className={"primaryButton"} href="/product">
            <ShopIcon /> الان خرید کنید
        </Button>
    </Container>)
}