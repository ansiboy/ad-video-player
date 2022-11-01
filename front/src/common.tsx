import React, { ReactElement } from "react";
import { Callback } from "maishu-toolkit";
import type { AdPlayer } from "./ad-players/ad-player";
import type ViewCarouselDesign from "./design-components/view-carousel";

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

export let componentSelected = new Callback<{ id: string, component: AdPlayer<any> }>();

export let ComponentRelateion = React.createContext<{ parent: React.Component, children: React.Component[] }>(null as any);

type T = { setCarousel?: (carousel: ViewCarouselDesign) => void };
export let EditorPageContext = React.createContext<T>(null as any);