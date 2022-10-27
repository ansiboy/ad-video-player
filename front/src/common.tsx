import React, { ReactElement } from "react";
import { AdView } from "./ad-views/ad-view";

export function componentChildrenArray(children: React.ReactNode): ReactElement[] {
    if (children == null)
        return [];

    if (Array.isArray(children)) {
        return children;
    }

    return [children as ReactElement];

}
