import React from "react";
import { designComponentTypes, runtimeComponentTypes } from "./type-names";
import { guid } from "maishu-toolkit";

export interface ComponentProps {
    id: string
    key?: string
    children?: ComponentData[]
}

export interface ComponentData {
    type: keyof typeof runtimeComponentTypes,
    props: ComponentProps,

}

export async function loadComponentData() {
    let r = await fetch("/screen.json");
    let d: ComponentData = await r.json();
 
    return d;
}

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