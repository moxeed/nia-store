import {Product, Specification} from "../entities/product";
import {Carousel, Col, Panel, Row} from "rsuite";
import {Option} from "../entities/option";
import {Label} from "../entities/label";

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
                <p className="text-lg py-1">{g.label.value}</p>
                {g.options.map(o => <p className="inline-block text-rose-100 bg-rose-500 px-4 m-1 rounded">{o.key}</p>)}
            </Row>
        )}
    </>
}

const SpecificationComponent = ({specifications}: { specifications: Array<Specification> }) => {

    return <>
        {specifications.map(s =>
            <Row>
                <Col xs={8} className="p-0">
                    <p className="bg-gray-300 p-2 pr-5">{s.label.value}</p>
                </Col>
                <Col xs={16} className="p-0">
                    <p className="bg-gray-100 p-2 pr-5">{s.key}</p>
                </Col>
            </Row>
        )}
    </>
}

export const ProductDetail = ({product}: { product: Product }) => {

    return <Col>
        <Row>
            <Carousel shape="bar" placement="bottom">
                {product.pictures?.map(p => <img alt={product.name} src={"/files/" + p.file}/>)}
            </Carousel>
        </Row>
        <Row className="p-4">
            <Col xs={12}>
                <p className="text-xl">{product.name}</p>
            </Col>
            <Col xs={12}>
                <p className="text-xl text-green-600">{product.price} ریال</p>
            </Col>
        </Row>
        <Row className="p-4">
            <p>{product.description}</p>
        </Row>
        <Row>
            <OptionComponent options={product.options}/>
        </Row>
        <Panel header="مشخصات">
            <SpecificationComponent specifications={product.specifications}/>
        </Panel>
    </Col>
}