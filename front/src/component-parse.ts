import React from "react";
import { AdPlayerProps } from "./ad-players/ad-player";
import { AdViewData, AdViewProps } from "./ad-views/ad-view";
import { designComponentTypes, runtimeComponentTypes } from "./type-names";
import { ViewCarouselData, ViewCarouselProps } from "./view-carousel";
import { guid } from "maishu-toolkit";

export interface ComponentProps {
    id: string
    key?: string
    children?: ComponentData[]
}

export interface ComponentData {
    type: keyof typeof runtimeComponentTypes,
    props: ComponentProps
}

export async function loadComponentData() {
    let r = await fetch("/screen.json");
    let d: ComponentData = await r.json();
    // let stack: ComponentData[] = [d];
    // let carouselData: ViewCarouselData = { views: [] };
    // while (stack.length > 0) {
    //     let item = stack.pop() as ComponentData;
    //     item.props.id = item.props.id || guid();
    //     switch (item.type) {
    //         case "ViewCarousel":
    //             // (item.props as unknown as ViewCarouselProps).data = carouselData;
    //             break;
    //         case "OneSplitView":
    //         case "ThreeSplitView":
    //         case "FourSplitView":
    //             let viewData: AdViewData = { players: [] };
    //             (item.props as unknown as AdViewProps).carouselData = carouselData;
    //             (item.props as unknown as AdViewProps).data = viewData;
    //             (item.props.children || []).forEach(c => {
    //                 (c.props as unknown as AdPlayerProps).viewData = viewData;
    //             })
    //             break;
    //     }

    //     stack.push(...(item.props.children || []))
    // }

    return d;
}

// export function trimComponentData(componentData: ComponentData) {
//     let stack: ComponentData[] = [componentData];
//     while (stack.length > 0) {
//         let item = stack.pop() as ComponentData;
//         item.props.id = item.props.id || guid();
//         switch (item.type) {
//             case "ViewCarousel":
//                 {
//                     // let DataKey: keyof ViewCarouselProps = "data";
//                     // delete (item.props as any)[DataKey];
//                 }
//                 break;
//             case "OneSplitView":
//             case "ThreeSplitView":
//             case "FourSplitView":
//                 const CarouselDataKey: keyof AdViewProps = "carouselData";
//                 const DataKey: keyof AdViewProps = "data";
//                 delete (item.props as any)[CarouselDataKey];
//                 delete (item.props as any)[DataKey];

//                 const ViewDataKey: keyof AdPlayerProps = "viewData";
//                 (item.props.children || []).forEach(c => {
//                     delete (c.props as any)[ViewDataKey];
//                 })
//                 break;
//         }

//         stack.push(...(item.props.children || []))
//     }
// }

// export function fillComponentData(componentData: ComponentData) {
//     let stack: ComponentData[] = [componentData];
//     let carouselData: ViewCarouselData = { views: [] };
//     while (stack.length > 0) {
//         let item = stack.pop() as ComponentData;
//         item.props.id = item.props.id || guid();
//         switch (item.type) {
//             case "ViewCarousel":
//                 // (item.props as unknown as ViewCarouselProps).data = carouselData;
//                 break;
//             case "OneSplitView":
//             case "ThreeSplitView":
//             case "FourSplitView":
//                 let viewData: AdViewData = { players: [] };
//                 (item.props as unknown as AdViewProps).carouselData = carouselData;
//                 (item.props as unknown as AdViewProps).data = viewData;
//                 (item.props.children || []).forEach(c => {
//                     (c.props as unknown as AdPlayerProps).viewData = viewData;
//                 })
//                 break;
//         }

//         stack.push(...(item.props.children || []))
//     }
// }

export function parseComponentData(componentData: ComponentData, isDesignTime?: boolean): React.ReactElement {
    if (!componentData) throw new Error(`Argument 'componentData' is null.`);

    let type: React.ComponentClass<any, any> | undefined;
    if (isDesignTime) {
        let typeName = componentData.type as keyof typeof designComponentTypes;
        type = designComponentTypes[typeName] as any || runtimeComponentTypes[typeName];
    }
    else {
        type = runtimeComponentTypes[componentData.type];
    }

    if (!type) throw new Error(`Component type '${componentData.type}' is not supported.`);

    let props = componentData.props;
    props.id = props.id || guid();
    props.key = props.id;
    let childDatas = componentData.props.children || [];
    let children = childDatas.map(c => parseComponentData(c, isDesignTime));

    let obj = Object.assign({}, props);
    delete obj.children;
    return React.createElement(type, obj, ...children);
}