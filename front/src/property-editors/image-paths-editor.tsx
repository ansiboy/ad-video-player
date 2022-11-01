import { useState } from "react";
import { EditorProps } from "./property-editor";
import { Input, Space } from "antd";
import React from "react";
import { guid } from "maishu-toolkit";

type Props = EditorProps<string[]>
export default function ImagePathsEditor(props: Props) {
    let [imagePaths, setImagePaths] = useState([...props.propertyValue]);
    imagePaths = imagePaths || props.propertyValue;

    return <Space direction="vertical" size={10}> {
        imagePaths.map((o, i) =>
            <Input key={guid()} value={o} onChange={e => {
                imagePaths[i] = e.target.value;
                setImagePaths(imagePaths);
                props.changed(imagePaths);

            }} />
        )
    } </Space>
}

