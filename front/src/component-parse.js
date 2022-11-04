"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseComponentData = exports.loadComponentData = void 0;
const react_1 = __importDefault(require("react"));
const type_names_1 = require("./type-names");
const maishu_toolkit_1 = require("maishu-toolkit");
async function loadComponentData() {
    let r = await fetch("/screen.json");
    let d = await r.json();
    return d;
}
exports.loadComponentData = loadComponentData;
function parseComponentData(componentData, isDesignTime) {
    if (!componentData)
        throw new Error(`Argument 'componentData' is null.`);
    let type;
    if (isDesignTime) {
        let typeName = componentData.type;
        type = type_names_1.designComponentTypes[typeName] || type_names_1.runtimeComponentTypes[typeName];
    }
    else {
        type = type_names_1.runtimeComponentTypes[componentData.type];
    }
    if (!type)
        throw new Error(`Component type '${componentData.type}' is not supported.`);
    let props = componentData.props;
    props.id = props.id || (0, maishu_toolkit_1.guid)();
    props.key = props.id;
    let childDatas = componentData.props.children || [];
    let children = childDatas.map(c => parseComponentData(c, isDesignTime));
    let obj = Object.assign({}, props);
    delete obj.children;
    return react_1.default.createElement(type, obj, ...children);
}
exports.parseComponentData = parseComponentData;
