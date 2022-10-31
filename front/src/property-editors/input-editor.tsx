import { InputNumber } from "antd";
import React, {  } from "react";
import { EditorProps, EditorState } from "./property-editor";

export class NumberInputEditor extends React.Component<EditorProps<number>, EditorState<number>> {
    constructor(props: NumberInputEditor["props"]) {
        super(props);

        this.state = { value: props.value };
    }
    render(): React.ReactNode {
        let { value } = this.state;
        return <InputNumber value={value} />
    }
}