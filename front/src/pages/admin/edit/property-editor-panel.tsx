import React from "react";
import { Empty, Form } from "antd";
import { ComponentData } from "../../../component-parse";
import componentPropertyEditors, { PropertyEditorInfo } from "../../../component-property-editors";
import { Collapse } from 'antd';
import { EditorProps, EditorState } from "../../../property-editors/property-editor";
import { componentPropertyChanged } from "../../../type-names";
import { InputEditor } from "../../../property-editors/input-editor";

/** 属性编辑器面板 */
export function PropertyEditorPanel(props: { componentData: ComponentData | null }) {

    let componentData = props.componentData;
    if (!componentData) {
        return <Collapse defaultActiveKey={['1']}>
            <Collapse.Panel header={"属性编辑"} key="1">
                <Empty />
            </Collapse.Panel>
        </Collapse>
    }

    let propertyEditors = componentPropertyEditors[componentData.type] || [];

    return <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel header={"属性编辑"} key="1">
            <Form layout="vertical">
                {propertyEditors.map((e, i) =>
                    <Form.Item key={e.propertyName} name={e.propertyName} label={e.displayName}>
                        {createEditor(e, componentData as ComponentData)}
                    </Form.Item>
                )}
            </Form>
        </Collapse.Panel>
    </Collapse>
}

function createEditor(editorInfo: PropertyEditorInfo, componentData: ComponentData) {
    let { editorClass, propertyName } = editorInfo;
    let props: EditorProps<any> = {
        propertyValue: (componentData.props as any)[propertyName],
        propertyName,
        changed: (value: any) => {
            componentPropertyChanged.fire({ componentId: componentData.props.id, propertyValue: value, propertyName })
        }
    }

    return React.createElement(editorClass, props)
}

