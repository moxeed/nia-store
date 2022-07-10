import React, { useEffect, useState } from "react"
import { AutoComplete, Panel } from "rsuite";
import { Label } from "../entities/label";
import { Tag } from "../entities/tag";
import { TagAdder } from "./tag-adder";

export const LabelPicker = (props: { tags?: Array<Tag>, setTags: (tags: Array<Tag>) => void }) => {

    const setTags = props.setTags
    const tags = props.tags ?? new Array<Tag>()

    const [create, setCreate] = useState<boolean>(false)
    const [key, setKey] = useState<string>("")
    const [foundTags, setFoundTags] = useState<Array<Tag>>(new Array<Tag>())

    const addTag = (tag: Tag) => {

        if (!tag.label.value) {
            setCreate(true);
            return;
        }

        tags.push(tag)
        setTags(tags)
        setCreate(false);
    }

    useEffect(() => {
        fetch(`/api/tag?term=${key}`)
            .then(res => res.json())
            .then(tags => setFoundTags(tags))
    }, [key])

    const data = foundTags.map(tag => ({
        value: `${tag.label.value}:${tag.key}`,
        label: `${tag.label.value}:${tag.key}`,
        tag
    }));

    if (!data.some(d => d.tag.key === key)) {
        data.push({
            value: `${key}`,
            label: `${key}`,
            tag: {
                key: key,
                label: new Label()
            }
        })
    }

    return (
        <>
            <Panel header="تگ ها" bordered>
                <AutoComplete data={data} onSelect={(_, e) => addTag(e.tag)} onChange={setKey} placement="bottomEnd" />
                {tags.map(tag => <p>{tag.label.value}:{tag.key}</p>)}
            </Panel>
            <TagAdder open={create} value={key} addTag={addTag} />
        </>
    );
}