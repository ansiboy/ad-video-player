import React, { ReactElement } from "react";
import { Callback } from "maishu-toolkit";
import { AdPlayer } from "./ad-players/ad-player";
import ViewCarousel from "./view-carousel";
import { AdView } from "./ad-views/ad-view";

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

// export function componentRelateionContext(parent: React.Component) {
//     let children: React.Component[] = [];
//     let c = React.createContext({ parent, children });
//     return c;
// }


export let ComponentRelateion = React.createContext<{ parent: React.Component, children: React.Component[] }>(null as any);