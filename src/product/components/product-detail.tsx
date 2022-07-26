import {Product, Specification} from "../entities/product";
import {Carousel, Col, Divider, Panel, Row} from "rsuite";
import {Option} from "../entities/option";
import {Label} from "../entities/label";
import {Price} from "./product-card";

const groupByLabel = (options: Array<Option>): Array<{ label: Label, options: Array<Option> }> => {
    const grouped = new Map<number, { label: Label, options: Array<Option> }>();

    for (const option of options) {
        const prev = grouped.get(option.label.id as number) ?? {label: option.label, options: []};
        prev.options.push(option)
        grouped.set(option.label.id as number, prev);
    }

    return Array.from(grouped.values())
}

const OptionComponent = ({options}: { options: Array<Option> }) => {
    const groupedOptions = groupByLabel(options)

    return <>
        {groupedOptions.map(g =>
            <Row className="px-7">
                <p className="py-1">{g.label.value}</p>
                {g.options.map(o => <p className="inline-block theme-color-main px-4 py-1 m-1 rounded">{o.key}</p>)}
            </Row>
        )}
    </>
}

const SpecificationComponent = ({specifications}: { specifications: Array<Specification> }) => {

    return <>
        {specifications.map(s =>
            <Row className="rounded overflow-hidden">
                <Col xs={8} className="p-0">
                    <p className="bg-gray-200 p-2 pr-5">{s.label.value}</p>
                </Col>
                <Col xs={16} className="p-0">
                    <p className="bg-gray-100 p-2 pr-5">{s.key}</p>
                </Col>
            </Row>
        )}
    </>
}

export const ProductDetail = ({product}: { product: Product }) => {

    return <>
        <div className="bg-white m-1 rounded-lg overflow-hidden">
            <Carousel shape="bar" placement="bottom">
                {product.pictures?.map(p => <img alt={product.name} src={"/api/file/" + p.file}/>)}
            </Carousel>
            <div className="px-6 py-2">
                <p className="text-xl">{product.name}</p>
                <Price value={product.price}/>
                <Divider className="m-3"/>
                <p>{product.description}</p>
            </div>
        </div>
        <Row className="bg-white m-1 py-2 rounded-lg overflow-hidden">
            <OptionComponent options={product.options}/>
        </Row>
        <Panel header="مشخصات" className="bg-white m-1 rounded-lg overflow-hidden">
            <SpecificationComponent specifications={product.specifications}/>
        </Panel>
    </>
}