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
    pageData: ComponentData | null,
};
export let EditorPageContext = React.createContext<EditorPageContextValue>(null as any);

export let strings = {
    okText: "确定",
    cancelText: "取消"
}

export const DefaultPlaySeconds = 15;