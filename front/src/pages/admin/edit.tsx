import React, { useEffect, useState } from "react";
import { Col, Row, PageHeader, Button, Menu, Dropdown, Modal, Empty } from "antd";
import { DeleteOutlined, ArrowLeftOutlined, ArrowRightOutlined, LineOutlined, PlusOutlined } from "@ant-design/icons";
import { ComponentData, ComponentProps, loadComponentData, parseComponentData } from "../../component-parse";
import { componentSelected } from "../../common";
import "./edit.scss";
import { componentPropertyChanged } from "../../type-names";
import { PropertyEditorPanel } from "./edit/property-editor-panel";

const contentStyle: React.CSSProperties = {
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const propertyEditors = {}


export default function EditPage() {

    let menu = <Menu items={[
        { key: '1', label: "16:9" },
    ]} />

    let [pageData, setPageData] = useState(null as ComponentData | null);
    let [selectedComponentData, setSelectedComponentData] = useState(null as ComponentData | null);

    useEffect(() => {
        loadComponentData().then(pageData => {
            setPageData(pageData);

            componentSelected.add(args => {
                let c = findComponentData(args.id, pageData as ComponentData);
                if (c) {
                    c = JSON.parse(JSON.stringify(c)) as ComponentData;
                    setSelectedComponentData(c);
                }
            })

            componentPropertyChanged.add(args => {
                let c = findComponentData(args.componentId, pageData as ComponentData);
                if (c) {
                    c.props[args.propertyName as keyof ComponentProps] = args.propertyValue;
                    pageData = JSON.parse(JSON.stringify(pageData));
                    setPageData(pageData);
                }
            })
        })



    }, [])

    return <>
        <Modal title="添加屏幕" okText="确定" cancelText="取消" >
            <Row>
                <Col>
                </Col>
                <Col>
                </Col>
                <Col>
                </Col>
            </Row>
        </Modal>
        <Row>
            <Col span={21} style={{}}>
                <PageHeader extra={[
                    <Dropdown key="screen-scale" overlay={menu} placement="bottomLeft">
                        <Button>屏幕比例 16:9</Button>
                    </Dropdown>,
                    <Button key="spliter" icon={<LineOutlined />}>分割线</Button>,
                    <Button key="previous-screen" icon={<ArrowLeftOutlined />}>上一屏</Button>,
                    <Button key="next-screen" icon={<ArrowRightOutlined />}>下一屏</Button>,
                    <Button key="add-screen" icon={<PlusOutlined />}>添加</Button>,
                    <Button key="delete-screen" icon={<DeleteOutlined />}>删除</Button>,
                ]} />
                <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                    {renderComponentData(pageData)}
                </div>
            </Col>
            <Col span={3} >
                <PropertyEditorPanel componentData={selectedComponentData} />
            </Col>
        </Row>
    </>
}

function renderComponentData(componentData: ComponentData | null) {
    if (!componentData)
        return <Empty description="数据正在加载中..." />

    return parseComponentData(componentData, true);
}

function findComponentData(componentId: string, pageData: ComponentData) {
    let stack = [pageData];
    let item = stack.pop();
    while (item) {
        if (item.props.id == componentId)
            return item;

        if (item.props.children)
            stack.push(...item.props.children)

        item = stack.pop();
    }

}



