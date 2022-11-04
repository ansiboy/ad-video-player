"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_names_1 = require("./type-names");
const input_editor_1 = require("./property-editors/input-editor");
const children_editor_1 = require("./property-editors/children-editor");
const image_paths_editor_1 = __importDefault(require("./property-editors/image-paths-editor"));
let PLAY_SECONDS = "playSeconds";
let CHILDREN = "children";
let propertyEditors = {};
propertyEditors[type_names_1.typeNames.OneSplitView] = [
    { propertyName: PLAY_SECONDS, displayName: "播放时间", editorClass: input_editor_1.NumberInputEditor },
    { propertyName: CHILDREN, displayName: "分屏设置", editorClass: children_editor_1.ChildrenEditor }
];
propertyEditors[type_names_1.typeNames.ThreeSplitView] = propertyEditors[type_names_1.typeNames.FourSplitView] = propertyEditors[type_names_1.typeNames.OneSplitView];
let IMAGE_PATHS = "imagePaths";
propertyEditors[type_names_1.typeNames.ImagePlayer] = [
    { propertyName: IMAGE_PATHS, displayName: "图片路径", editorClass: image_paths_editor_1.default }
];
let VIDEO_PATH = "videoPath";
propertyEditors[type_names_1.typeNames.VideoPlayer] = [
    { propertyName: VIDEO_PATH, displayName: "视频路径", editorClass: input_editor_1.InputEditor },
];
exports.default = propertyEditors;
