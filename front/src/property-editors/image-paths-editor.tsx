import { EditorProps, EditorState } from "./property-editor";
import { Input, Space } from "antd";
import React from "react";
import { guid } from "maishu-toolkit";

type Props = EditorProps<string[]>
type State = EditorState<string[]>
export default class ImagePathsEditor extends React.Component<Props, State> {
    render() {
        let imagePaths = this.props.propertyValue || [];
        return <Space direction="vertical" size={10}>
            {imagePaths.map((o, i) =>
                <Input key={guid()} value={o} onChange={e => {
                    imagePaths[i] = e.target.value;
                    // setImagePaths(imagePaths);
                    this.setState({ propertyValue: imagePaths });
                    this.props.changed(imagePaths);

                }} />
            )}
            <Input key={guid()} value="" onChange={e => {
                if (!e.target.value)
                    return;

                imagePaths.push(e.target.value)
                this.setState({ propertyValue: imagePaths });
                this.props.changed(imagePaths);

            }} />
        </Space>
    }

}

