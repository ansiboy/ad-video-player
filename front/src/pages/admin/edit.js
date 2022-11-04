"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const component_parse_1 = require("../../component-parse");
const common_1 = require("../../common");
require("./edit.scss");
const type_names_1 = require("../../type-names");
const property_editor_panel_1 = require("./edit/property-editor-panel");
const maishu_toolkit_1 = require("maishu-toolkit");
const screen_dialog_1 = __importDefault(require("./edit/screen-dialog"));
const ui_1 = require("../../ui");
const errors_1 = __importDefault(require("../../errors"));
function EditPage() {
    let menu = react_1.default.createElement(antd_1.Menu, { items: [
            { key: '1', label: "16:9" },
        ] });
    let [pageData, setPageData] = (0, react_1.useState)(null);
    let [screensCount, setScreensCount] = (0, react_1.useState)(0);
    let [screenIndex, setScreenIndex] = (0, react_1.useState)(0);
    let [selectedComponentId, setSelectedComponentId] = (0, react_1.useState)(null);
    let contextValue = {
        screenIndex: screenIndex,
        setScreenIndex: (value) => {
            setScreenIndex(value);
            let screens = pageData.props.children || [];
            setSelectedComponentId(screens[value].props.id);
        },
        selectedComponentId: selectedComponentId,
        setSelectedComponentId: (value) => {
            setSelectedComponentId(value);
        },
        pageData: pageData
    };
    (0, react_1.useEffect)(() => {
        (0, component_parse_1.loadComponentData)().then(pageData => {
            setPageData(pageData);
            setScreensCount((pageData.props.children || []).length);
            type_names_1.componentPropertyChanged.add(args => {
                let c = findComponentData(args.componentId, pageData);
                if (c) {
                    c.props[args.propertyName] = args.propertyValue;
                    pageData = JSON.parse(JSON.stringify(pageData));
                    setPageData(pageData);
                }
            });
        });
    }, []);
    function nextScreen() {
        screenIndex = screenIndex + 1;
        if (screenIndex > screensCount - 1)
            screenIndex = 0;
        setScreenIndex(screenIndex);
    }
    function previousScreen() {
        screenIndex = screenIndex - 1;
        if (screenIndex < 0)
            screenIndex = screensCount - 1;
        setScreenIndex(screenIndex);
    }
    function addScreen(screenType) {
        if (!pageData)
            throw new Error("Pagedata is null.");
        let newChildData = () => {
            let c = {
                type: type_names_1.typeNames.ImagePlayer,
                props: { id: (0, maishu_toolkit_1.guid)() }
            };
            return c;
        };
        let screenChildren = [];
        switch (screenType) {
            case type_names_1.typeNames.OneSplitView:
                screenChildren.push(newChildData());
                break;
            case type_names_1.typeNames.ThreeSplitView:
                screenChildren.push(newChildData(), newChildData(), newChildData());
                break;
            case type_names_1.typeNames.FourSplitView:
                screenChildren.push(newChildData(), newChildData(), newChildData(), newChildData());
                break;
            default:
                (0, ui_1.showError)(errors_1.default.unsupportedScreenType(screenType));
                break;
        }
        let componentData = {
            type: screenType,
            props: {
                id: (0, maishu_toolkit_1.guid)(),
                children: screenChildren
            }
        };
        componentData.props.playSeconds = common_1.DefaultPlaySeconds;
        screenIndex = screenIndex + 1;
        let children = pageData.props.children = pageData.props.children || [];
        children.splice(screenIndex, 0, componentData);
        console.assert(pageData.type == type_names_1.typeNames.ViewCarousel);
        pageData.props.activeIndex = screenIndex;
        pageData = JSON.parse(JSON.stringify(pageData));
        setPageData(pageData);
        setScreenIndex(screenIndex);
        setSelectedComponentId(componentData.props.id);
    }
    let screenDialog;
    function showScreenDialog() {
        screenDialog.show();
    }
    return react_1.default.createElement(common_1.EditorPageContext.Provider, { value: contextValue },
        react_1.default.createElement(screen_dialog_1.default, { key: (0, maishu_toolkit_1.guid)(), ref: e => screenDialog = e || screenDialog, onSelecte: (screenType) => addScreen(screenType) }),
        react_1.default.createElement(antd_1.Row, null,
            react_1.default.createElement(antd_1.Col, { span: 21, style: {} },
                react_1.default.createElement(antd_1.PageHeader, { extra: [
                        react_1.default.createElement(antd_1.Dropdown, { key: "screen-scale", overlay: menu, placement: "bottomLeft" },
                            react_1.default.createElement(antd_1.Button, null, "\u5C4F\u5E55\u6BD4\u4F8B 16:9")),
                        react_1.default.createElement(antd_1.Button, { key: "spliter", icon: react_1.default.createElement(icons_1.LineOutlined, null) }, "\u5206\u5272\u7EBF"),
                        react_1.default.createElement(antd_1.Button, { key: "previous-screen", icon: react_1.default.createElement(icons_1.ArrowLeftOutlined, null), disabled: screensCount <= 1, onClick: () => previousScreen() }, "\u4E0A\u4E00\u5C4F"),
                        react_1.default.createElement(antd_1.Button, { key: "next-screen", icon: react_1.default.createElement(icons_1.ArrowRightOutlined, null), disabled: screensCount <= 1, onClick: () => nextScreen() }, "\u4E0B\u4E00\u5C4F"),
                        react_1.default.createElement(antd_1.Button, { key: "add-screen", icon: react_1.default.createElement(icons_1.PlusOutlined, null), onClick: () => {
                                console.log("click");
                                showScreenDialog();
                            } }, "\u6DFB\u52A0"),
                        react_1.default.createElement(antd_1.Button, { key: "delete-screen", icon: react_1.default.createElement(icons_1.DeleteOutlined, null) }, "\u5220\u9664"),
                    ] }),
                react_1.default.createElement("div", { style: { paddingLeft: 20, paddingRight: 20 } }, renderComponentData(pageData))),
            react_1.default.createElement(antd_1.Col, { span: 3 },
                react_1.default.createElement(property_editor_panel_1.PropertyEditorPanel, null))));
}
exports.default = EditPage;
function renderComponentData(componentData) {
    if (!componentData)
        return react_1.default.createElement(antd_1.Empty, { description: "\u6570\u636E\u6B63\u5728\u52A0\u8F7D\u4E2D..." });
    let r = (0, component_parse_1.parseComponentData)(componentData, true);
    return r;
}
function findComponentData(componentId, pageData) {
    let stack = [pageData];
    let item = stack.pop();
    while (item) {
        if (item.props.id == componentId)
            return item;
        if (item.props.children)
            stack.push(...item.props.children);
        item = stack.pop();
    }
}
