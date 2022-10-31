import { ReactElement } from "react";

export let paths = {
    // home: "/",
    edit: "/",
    password: "/password",
    remote: "/remote",
}


export function componentChildrenArray(children: React.ReactNode): ReactElement[] {
    if (children == null)
        return [];

    if (Array.isArray(children)) {
        return children;
    }

    return [children as ReactElement];

}
