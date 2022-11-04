"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyEditorPanel = void 0;
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const component_property_editors_1 = __importDefault(require("../../../component-property-editors"));
const antd_2 = require("antd");
const type_names_1 = require("../../../type-names");
const common_1 = require("../../../common");
const errors_1 = __importDefault(require("../../../errors"));
/** 属性编辑器面板 */
function PropertyEditorPanel() {
    return react_1.default.createElement(common_1.EditorPageContext.Consumer, null, args => {
        return react_1.default.createElement(antd_2.Collapse, { defaultActiveKey: ['1'] },
            react_1.default.createElement(antd_2.Collapse.Panel, { header: "属性编辑", key: "1" }, renderPropertyEditorsByComponentId(args.selectedComponentId, args.pageData)));
    });
}
exports.PropertyEditorPanel = PropertyEditorPanel;
function renderPropertyEditorsByComponentId(componentId, pageData) {
    // if (!componentId) throw errors.argumentNull("componentId");
    // if (!pageData) throw errors.argumentNull("pageData");
    let stack = [pageData];
    let item = stack.pop();
    let componentData = null;
    if (componentId != null && pageData != null) {
        while (item) {
            if (componentId == item.props.id) {
                componentData = item;
                break;
            }
            if (item.props.children) {
                stack.push(...item.props.children);
            }
            item = stack.pop();
        }
        if (componentData == null)
            throw errors_1.default.componentDataNotExists(componentId);
    }
    return renderPropertyEditors(componentData);
}
function renderPropertyEditors(componentData) {
    if (!componentData)
        return react_1.default.createElement(antd_1.Empty, null);
    let propertyEditors = component_property_editors_1.default[componentData.type] || [];
    return react_1.default.createElement(antd_1.Form, { layout: "vertical" }, propertyEditors.map((e, i) => react_1.default.createElement(antd_1.Form.Item, { key: e.propertyName, name: e.propertyName, label: e.displayName }, createEditor(e, componentData))));
}
function createEditor(editorInfo, componentData) {
    let { editorClass, propertyName } = editorInfo;
    let propertyValue = componentData.props[propertyName];
    let props = {
        propertyValue,
        propertyName,
        changed: (value) => {
            type_names_1.componentPropertyChanged.fire({ componentId: componentData.props.id, propertyValue: value, propertyName });
        },
        ref: (e) => {
            if (!e)
                return;
            e.setState({ propertyValue: componentData.props[propertyName] });
        }
    };
    return react_1.default.createElement(editorClass, props);
}
