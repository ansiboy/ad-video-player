import { typeNames } from "./type-names";
import { AdViewProps } from "./ad-views/ad-view";
import { Props as ImagePlayerProps } from "./ad-players/image-player";
import { Props as VideoPlayerProps } from "./ad-players/video-player";

import React from "react";
import { InputEditor, NumberInputEditor } from "./property-editors/input-editor";
import { ChildrenEditor } from "./property-editors/children-editor";
import ImagePathsEditor from "./property-editors/image-paths-editor";

export type PropertyEditorInfo = {
    propertyName: string,
    displayName: string,
    editorClass: React.ComponentClass<any, any> | React.FunctionComponent<any>
}

let PLAY_SECONDS: keyof AdViewProps = "playSeconds";
let CHILDREN: keyof AdViewProps = "children";
let propertyEditors: { [typeName: string]: PropertyEditorInfo[] } = {};
propertyEditors[typeNames.OneSplitView] = [
    { propertyName: PLAY_SECONDS, displayName: "播放时间", editorClass: NumberInputEditor },
    { propertyName: CHILDREN, displayName: "分屏", editorClass: ChildrenEditor }
]

propertyEditors[typeNames.ThreeSplitView] = propertyEditors[typeNames.FourSplitView] = propertyEditors[typeNames.OneSplitView];


let IMAGE_PATHS: keyof ImagePlayerProps = "imagePaths";
propertyEditors[typeNames.ImagePlayer] = [
    { propertyName: IMAGE_PATHS, displayName: "图片路径", editorClass: ImagePathsEditor }//ImagePathsEditor
]

let VIDEO_PATH: keyof VideoPlayerProps = "videoPath";
propertyEditors[typeNames.VideoPlayer] = [
    { propertyName: VIDEO_PATH, displayName: "视频路径", editorClass: InputEditor },
]


export default propertyEditors;