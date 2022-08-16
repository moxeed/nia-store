import {Button, Col, FlexboxGrid, Input, Message, Panel, Row, Stack, useToaster} from "rsuite";
import {LabelPicker} from "./label-picker";
import {Label} from "../entities/label";
import {Specification} from "../entities/product";
import {NiaButton} from "../../common/components/nia-button";
import React from "react";

const message = <Message showIcon type="success">
    با موفقیت کپی شد
</Message>

export const SpecificationEditor = (props: {
    specifications: Array<Specification>, setSpecifications: (a: Array<Specification>) => void
}) => {
    const {setSpecifications} = props;
    const specifications = props.specifications ?? new Array<Specification>();
    const toast = useToaster()

    const addLabel = (label: Label) => {
        specifications.push({
            label: label,
            key: ""
        })
        setSpecifications(specifications)
    }

    const removeLabel = (index: number) => () => {
        delete specifications[index];
        setSpecifications(specifications)
    }

    const updateKey = (spec: Specification) => (value: string) => {
        spec.key = value;
        setSpecifications(specifications);
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(JSON.stringify(specifications.map(s => ({...s, id: undefined}))))
            .then(() => toast.push(message))
    }

    const loadFromClipBoard = () => {
        navigator.clipboard.readText()
            .then(t => setSpecifications(JSON.parse(t)))
    }

    return <Panel header="مشخصات" bordered className="pb-2 pt-2">
        <Row>
            <Col xs={12}>
                <NiaButton onClick={copyToClipboard}>
                    کپی کردن مشخصات
                </NiaButton>
            </Col>
            <Col xs={12}>
                <NiaButton onClick={loadFromClipBoard}>
                    الحاق
                </NiaButton>
            </Col>
        </Row>
        <LabelPicker onSelect={addLabel}/>
        {specifications?.map((spec, i) => (
            <FlexboxGrid className="pt-2 pb-2">
                <FlexboxGrid.Item colspan={2}>
                    <Button appearance="ghost" className="w-full" onClick={removeLabel(i)}>X</Button>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={6}>
                    <Input className="w-full" value={spec.label.value} disabled/>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={16}>
                    <Input className="w-full" value={spec.key} onChange={updateKey(spec)}/>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        ))}
    </Panel>
}