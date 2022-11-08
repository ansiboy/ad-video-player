import React, { useState } from "react";
import { Empty, Form } from "antd";
import { ComponentData } from "../../../component-parse";
import componentPropertyEditors, { PropertyEditorInfo } from "../../../component-property-editors";
import { Collapse } from 'antd';
import { EditorProps, EditorState } from "../../../property-editors/property-editor";
import { } from "../../../type-names";
import { EditorPageContext, findComponentData } from "../../../common";
import errors from "../../../errors";

/** 属性编辑器面板 */
export function PropertyEditorPanel() {
    return <EditorPageContext.Consumer>
        {args => {
            return <Collapse defaultActiveKey={['1']}>
                <Collapse.Panel header={"属性编辑"} key="1">
                    {renderPropertyEditorsByComponentId(args.selectedComponentId, args.getPageData())}
                </Collapse.Panel>
            </Collapse>
        }}
    </EditorPageContext.Consumer>

}

function renderPropertyEditorsByComponentId(componentId: string | null, pageData: ComponentData | null) {
    // if (!componentId) throw errors.argumentNull("componentId");
    // if (!pageData) throw errors.argumentNull("pageData");

    let stack = [pageData];
    let item = stack.pop();
    let componentData: ComponentData | null = null;
    if (componentId != null && pageData != null) {
        while (item) {
            if (componentId == item.props.id) {
                componentData = item;
                break;
            }

            if (item.props.children) {
                stack.push(...item.props.children)
            }
            item = stack.pop();
        }

        if (componentData == null)
            throw errors.componentDataNotExists(componentId);
    }

    return renderPropertyEditors(componentData);
}

function renderPropertyEditors(componentData: ComponentData | null) {
    if (!componentData)
        return <Empty />

    let propertyEditors = componentPropertyEditors[componentData.type] || [];
    return <Form layout="vertical">
        {propertyEditors.map((e, i) =>
            <Form.Item key={e.propertyName} name={e.propertyName} label={e.displayName}>
                {createEditor(e, componentData as ComponentData)}
            </Form.Item>
        )}
    </Form>
}

function createEditor(editorInfo: PropertyEditorInfo, componentData: ComponentData) {
    let { editorClass, propertyName } = editorInfo;
    let propertyValue = (componentData.props as any)[propertyName];

    return <EditorPageContext.Consumer>
        {args => {
            let props: EditorProps<any> = {
                propertyValue,
                propertyName,
                changed: (value: any) => {
                    // componentPropertyChanged.fire({ componentId: componentData.props.id, propertyValue: value, propertyName })
                    let pageData = args.getPageData() as ComponentData;
                    let c = findComponentData(componentData.props.id, pageData);
                    if (c == null)
                        throw errors.componentDataNotExists(componentData.props.id);

                    (c.props as any)[propertyName] = value;
                    args.setSelectedComponentId(componentData.props.id);
                    args.setPageData(pageData);
                },
                ref: (e: React.Component<EditorProps<any>, EditorState<any>>) => {
                    if (!e) return;

                    e.setState({ propertyValue: (componentData.props as any)[propertyName] });
                }
            }

            return React.createElement(editorClass, props);
        }}
    </EditorPageContext.Consumer>
}

