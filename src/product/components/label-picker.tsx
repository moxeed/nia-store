import {useEffect, useState} from "react"
import {AutoComplete} from "rsuite"
import {Label} from "../entities/label";

export const LabelPicker = (props: { onSelect: (label: Label) => void }) => {

    const {onSelect} = props;

    const [term, setTerm] = useState<string>("");
    const [foundLabels, setFoundLabels] = useState<Array<Label>>(new Array<Label>());

    const handleSelect = (label: Label) => {
        fetch("/api/label", {
            method: "POST",
            body: JSON.stringify(label)
        })
            .then(res => res.json())
            .then((label: Label) => onSelect(label))
    }

    useEffect(() => {
        fetch(`/api/label?term=${term}`)
            .then(res => res.json())
            .then(labels => setFoundLabels(labels))
    }, [term])

    const data = foundLabels.map(label => ({
        value: `${label.value}`,
        label: `${label.value}`,
        data: label
    }));

    if (!data.some(d => d.value === term)) {
        data.push({
            value: `${term}`,
            label: `${term}`,
            data: {
                value: term
            }
        })
    }

    return <AutoComplete data={data} onSelect={(_, e) => handleSelect(e.data)} onChange={setTerm}
                         placement="bottomEnd"/>
}