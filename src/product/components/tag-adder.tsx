import { useEffect, useState } from "react"
import { AutoComplete, Modal } from "rsuite"
import { Label } from "../entities/label";
import { Tag } from "../entities/tag"

export const TagAdder = (props: { open: boolean, value: string, addTag: (tag: Tag) => void }) => {

    const { open, value, addTag } = props;

    const [term, setTerm] = useState<string>("");
    const [foundLabels, setFoundLabels] = useState<Array<Label>>(new Array<Label>());

    useEffect(() => {
        fetch(`/api/label?term=${term}`)
            .then(res => res.json())
            .then(tags => setFoundLabels(tags))
    }, [term])

    const data = foundLabels.map(label => ({
        value: `${label.value}:${value}`,
        label: `${label.value}:${value}`,
        tag: {
            key: value,
            label
        }
    }));

    if (!data.some(d => d.tag.label.value === term)) {
        data.push({
            value: `${term}:${value}`,
            label: `${term}:${value}`,
            tag: {
                key: value,
                label: {
                    value: term
                }
            }
        })
    }

    return <Modal open={open}>
        <AutoComplete data={data} onSelect={(_, e) => addTag(e.tag)} onChange={setTerm} placement="bottomEnd" />
    </Modal>
}