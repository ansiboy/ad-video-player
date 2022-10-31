import React from "react";
import { AdPlayerProps } from "./ad-players/ad-player";
import { AdViewData, AdViewProps } from "./ad-views/ad-view";
import { designComponentTypes, runtimeComponentTypes } from "./type-names";
import { ViewCarouselData, ViewCarouselProps } from "./view-carousel";
import { guid } from "maishu-toolkit";

export interface ComponentData {
    type: keyof typeof runtimeComponentTypes,
    props: {
        children?: ComponentData[],
        key?: string
    }
}

export async function loadComponentData() {
    let r = await fetch("/screen.json");
    let d: ComponentData = await r.json();
    let stack: ComponentData[] = [d];
    let carouselData: ViewCarouselData = { views: [] };
    while (stack.length > 0) {
        let item = stack.pop() as ComponentData;
        switch (item.type) {
            case "ViewCarousel":
                (item.props as unknown as ViewCarouselProps).data = carouselData;
                break;
            case "OneSplitView":
            case "ThreeSplitView":
            case "FourSplitView":
                let viewData: AdViewData = { players: [] };
                (item.props as unknown as AdViewProps).carouselData = carouselData;
                (item.props as unknown as AdViewProps).data = viewData;
                (item.props.children || []).forEach(c => {
                    (c.props as unknown as AdPlayerProps).viewData = viewData;
                })
                break;
        }

        stack.push(...(item.props.children || []))
    }

    return d;
}

export function parseComponentData(componentData: ComponentData, isDesignTime?: boolean): React.ReactElement {
    if (!componentData) throw new Error(`Argument 'componentData' is null.`);

    let type: React.ComponentClass<any, any> | undefined;
    if (isDesignTime) {
        let typeName = componentData.type as keyof typeof designComponentTypes;
        let d = designComponentTypes;
        type = designComponentTypes[typeName] as any || runtimeComponentTypes[typeName];
        if (!type) {
            console.log(d);
            debugger;
        }
    }
    else {
        type = runtimeComponentTypes[componentData.type];
    }

    if (!type) throw new Error(`Component type '${componentData.type}' is not supported.`);

    let props = componentData.props;
    props.key = props.key || guid();
    let childDatas = componentData.props.children || [];
    let children = childDatas.map(c => parseComponentData(c, isDesignTime));
    delete props.children;
    return React.createElement(type, props as any, ...children);
}