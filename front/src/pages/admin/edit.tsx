import React, { useEffect, useState } from "react";
import { Col, Row, PageHeader, Button, Menu, Dropdown, Empty } from "antd";
import { DeleteOutlined, ArrowLeftOutlined, ArrowRightOutlined, LineOutlined, PlusOutlined } from "@ant-design/icons";
import { ComponentData, ComponentProps, loadComponentData, parseComponentData } from "../../component-parse";
import { DefaultPlaySeconds, EditorPageContext, EditorPageContextValue } from "../../common";
import "./edit.scss";
import { componentPropertyChanged, ComponentTypeName, typeNames } from "../../type-names";
import { PropertyEditorPanel } from "./edit/property-editor-panel";
import { guid } from "maishu-toolkit";
import ScreenDialog from "./edit/screen-dialog";
import { showError } from "../../ui";
import errors from "../../errors";
import { AdViewProps } from "../../ad-views/ad-view";
import { ViewCarouselProps } from "../../view-carousel";

export default function EditPage() {

    let menu = <Menu items={[
        { key: '1', label: "16:9" },
    ]} />

    let [pageData, setPageData] = useState(null as ComponentData | null);
    let [screensCount, setScreensCount] = useState(0);
    let [screenIndex, setScreenIndex] = useState(0);
    let [selectedComponentId, setSelectedComponentId] = useState(null as string | null);
    let contextValue: EditorPageContextValue = {
        screenIndex: screenIndex,
        setScreenIndex: (value) => {
            setScreenIndex(value);
            let screens = (pageData as ComponentData).props.children || [];
            setSelectedComponentId(screens[value].props.id);
        },
        selectedComponentId: selectedComponentId,
        setSelectedComponentId: (value) => {
            setSelectedComponentId(value)
        },
        pageData: pageData
    };

    useEffect(() => {
        loadComponentData().then(pageData => {
            setPageData(pageData);
            setScreensCount((pageData.props.children || []).length);

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

    function nextScreen() {
        screenIndex = screenIndex + 1;
        if (screenIndex > screensCount - 1)
            screenIndex = 0;

        setScreenIndex(screenIndex);
    }

    function previousScreen() {
        screenIndex = screenIndex - 1;
        if (screenIndex < 0)
            screenIndex = screensCount - 1;

        setScreenIndex(screenIndex);
    }

    function addScreen(screenType: ComponentTypeName) {
        if (!pageData) throw new Error("Pagedata is null.");

        let newChildData = () => {
            let c: ComponentData = {
                type: typeNames.ImagePlayer,
                props: { id: guid() }
            }
            return c;
        }

        let screenChildren: ComponentData[] = [];
        switch (screenType) {
            case typeNames.OneSplitView:
                screenChildren.push(newChildData())
                break;
            case typeNames.ThreeSplitView:
                screenChildren.push(newChildData(), newChildData(), newChildData())
                break;
            case typeNames.FourSplitView:
                screenChildren.push(newChildData(), newChildData(), newChildData(), newChildData())
                break;
            default:
                showError(errors.unsupportedScreenType(screenType))
                break;
        }

        let componentData: ComponentData = {
            type: screenType,
            props: {
                id: guid(),
                children: screenChildren
            }
        };

        (componentData.props as AdViewProps).playSeconds = DefaultPlaySeconds;

        screenIndex = screenIndex + 1;
        let children = pageData.props.children = pageData.props.children || [];
        children.splice(screenIndex, 0, componentData);

        console.assert((pageData as ComponentData).type == typeNames.ViewCarousel);
        ((pageData as ComponentData).props as ViewCarouselProps).activeIndex = screenIndex;

        pageData = JSON.parse(JSON.stringify(pageData));
        setPageData(pageData);
        setScreenIndex(screenIndex);
        setSelectedComponentId(componentData.props.id);
    }

    let screenDialog: ScreenDialog;
    function showScreenDialog() {
        screenDialog.show();
    }

    return <EditorPageContext.Provider value={contextValue}>
        <ScreenDialog key={guid()}
            ref={e => screenDialog = e || screenDialog}
            onSelecte={(screenType) => addScreen(screenType)} />
        <Row>
            <Col span={21} style={{}}>
                <PageHeader extra={[
                    <Dropdown key="screen-scale" overlay={menu} placement="bottomLeft">
                        <Button>屏幕比例 16:9</Button>
                    </Dropdown>,
                    <Button key="spliter" icon={<LineOutlined />}>分割线</Button>,
                    <Button key="previous-screen" icon={<ArrowLeftOutlined />}
                        disabled={screensCount <= 1}
                        onClick={() => previousScreen()}>上一屏</Button>,
                    <Button key="next-screen" icon={<ArrowRightOutlined />}
                        disabled={screensCount <= 1}
                        onClick={() => nextScreen()}>下一屏</Button>,
                    <Button key="add-screen" icon={<PlusOutlined />} onClick={() => {
                        console.log("click")
                        showScreenDialog();
                    }}>添加</Button>,
                    <Button key="delete-screen" icon={<DeleteOutlined />}>删除</Button>,
                ]} />
                <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                    {renderComponentData(pageData)}
                </div>
            </Col>
            <Col span={3} >
                <PropertyEditorPanel />
            </Col>
        </Row>
    </EditorPageContext.Provider>
}

function renderComponentData(componentData: ComponentData | null) {
    if (!componentData)
        return <Empty description="数据正在加载中..." />

    let r = parseComponentData(componentData, true);
    return r;
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



