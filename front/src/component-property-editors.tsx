import { ONE_SPLIT_VIEW } from "./type-names";
import { AdViewProps } from "./ad-views/ad-view";

import React from "react";
import { NumberInputEditor } from "./property-editors/input-editor";

type PropertyEditor = {
    propertyName: string,
    displayName: string,
    editorClass: React.ComponentClass<any, any>
}

let PLAY_SECONDS: keyof AdViewProps = "playSeconds";

let propertyEditors: { [typeName: string]: PropertyEditor[] } = {};
propertyEditors[ONE_SPLIT_VIEW] = [
    { propertyName: PLAY_SECONDS, displayName: "播放时间", editorClass: NumberInputEditor }
]