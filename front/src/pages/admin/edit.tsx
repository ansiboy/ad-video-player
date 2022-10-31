import React, { useEffect, useState } from "react";
import { Col, Row, Tabs, Carousel, PageHeader, Button, Menu, Dropdown, Modal, List, Empty } from "antd";
import { DeleteOutlined, ArrowLeftOutlined, ArrowRightOutlined, LineOutlined, PlusOutlined } from "@ant-design/icons";
import { ComponentData, loadComponentData, parseComponentData } from "../../component-parse";

const contentStyle: React.CSSProperties = {
    // height: '450px',
    // color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const propertyEditors = {}


export default function EditPage() {

    let menu = <Menu items={[
        { key: '1', label: "16:9" },
    ]} />

    let [componentData, setComponentData] = useState(null as ComponentData | null);
    useEffect(() => {
        loadComponentData().then(c => {
            setComponentData(c);
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
                {/* <Carousel style={{ marginLeft: 10, marginRight: 10 }}>
                    <div>
                        <Row style={contentStyle}>
                            <Col span={8} style={{ backgroundColor: "red" }}></Col>
                            <Col span={8} style={{ backgroundColor: "blue" }}></Col>
                            <Col span={8} style={{ backgroundColor: "black" }}></Col>
                        </Row>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel> */}
                <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                    {renderComponentData(componentData)}
                </div>
            </Col>
            <Col span={3} >
                <List header={<div>属性编辑</div>}>

                </List>
                {/* <Tabs>
                    <Tabs.TabPane tab="图片" key="item-1">
                        内容 1
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="视频" key="item-2">
                        内容 2
                    </Tabs.TabPane>
                </Tabs> */}
            </Col>
        </Row>
    </>
}

function renderComponentData(componentData: ComponentData | null) {
    if (!componentData)
        return <Empty description="数据正在加载中..." />

    return parseComponentData(componentData, true);
}