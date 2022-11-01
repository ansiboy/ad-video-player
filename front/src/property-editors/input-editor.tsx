import { Input, InputNumber } from "antd";
import React, { } from "react";
import { EditorProps, EditorState } from "./property-editor";

export class NumberInputEditor extends React.Component<EditorProps<number>, EditorState<number>> {
    constructor(props: NumberInputEditor["props"]) {
        super(props);

        this.state = { propertyValue: props.propertyValue };
    }
    render(): React.ReactNode {
        let { propertyValue: value } = this.state;
        return <InputNumber value={value} style={{ width: "100%" }} />
    }
}

export class InputEditor extends React.Component<EditorProps<string>, EditorState<string>> {

    constructor(props: InputEditor["props"]) {
        super(props);

        this.state = { propertyValue: props.propertyValue };
    }

    render(): React.ReactNode {
        let { propertyValue: value } = this.state;
        return <Input value={value} onChange={e => {
            this.props.changed(e.target.value);
        }} />
    }

}