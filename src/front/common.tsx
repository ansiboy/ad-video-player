import React, { ReactElement } from "react";
import { ComponentData } from "./component-parse";

export function componentChildrenArray(children: React.ReactNode): ReactElement[] {
    if (children == null)
        return [];

    if (Array.isArray(children)) {
        return children;
    }

    return [children as ReactElement];

}

export let paths = {
    home: "/",
    admin: {
        login: "/admin/login",
        edit: "/admin/edit",
        password: "/admin/password",
        remote: "/admin/remote",
    }
}

// export let componentSelected = new Callback<{ id: string }>();

export let ComponentRelateion = React.createContext<{ parent: React.Component, children: React.Component[] }>(null as any);

export type EditorPageContextValue = {
    screenIndex: number, setScreenIndex: (value: number) => void,
    selectedComponentId: string | null, setSelectedComponentId: (value: string) => void,
    getPageData: () => ComponentData | null,
    setPageData: (pageData: ComponentData) => void,
};
export let EditorPageContext = React.createContext<EditorPageContextValue>(null as any);

export let strings = {
    okText: "确定",
    cancelText: "取消",
    saveSuccess: "保存成功"
}

export const DefaultPlaySeconds = 15;

export const supportMediaTypes = {
    video: ["mp4"],
    image: ["jpg", "png", "jpge"]
}

export const httpContentTypes = {
    video: supportMediaTypes.video.map(o => `video/${o}`),
    image: supportMediaTypes.image.map(o => `image/${o}`)
}

export let headerNames = {
    contentType: "content-type"
}

export let headerContentTypes = {
    json: "application/json"
}

export function findComponentData(componentId: string, pageData: ComponentData) {
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