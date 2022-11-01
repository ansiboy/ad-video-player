import { Button, Form, List, Radio, Row, Space } from "antd";
import React from "react";
import { ComponentData } from "../component-parse";
import { typeNames } from "../type-names";
import { EditorProps, EditorState } from "./property-editor";

type Props = EditorProps<ComponentData["props"]["children"]>;
type State = EditorState<ComponentData["props"]["children"]>;

export class ChildrenEditor extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = { propertyValue: props.propertyValue };
    }

    render(): React.ReactNode {
        let value = this.state.propertyValue || [];
        return <List dataSource={value} renderItem={childComponentData => {
            return <List.Item>
                <Radio.Group value={childComponentData.type}
                    onChange={e => {
                        childComponentData.type = e.target.value;
                        this.props.changed(value);
                    }} style={{ width: "100%" }}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <Radio value={typeNames.EmptyPlayer}>
                            空白
                        </Radio>
                        <Radio value={typeNames.ImagePlayer}>
                            图片
                            <Button type="link">编辑</Button>
                        </Radio>
                        <Radio value={typeNames.VideoPlayer}>
                            视频
                            <Button type="link">编辑</Button>
                        </Radio>
                    </Space>
                </Radio.Group>
            </List.Item>
        }}>
        </List>
    }
} 