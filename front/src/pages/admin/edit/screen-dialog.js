"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const antd_2 = require("antd");
const type_names_1 = require("../../../type-names");
const common_1 = require("../../../common");
class ScreenDialog extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { visibled: false, screenType: type_names_1.typeNames.OneSplitView };
    }
    show() {
        this.setState({ visibled: true });
    }
    render() {
        let { visibled, screenType } = this.state;
        return react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(antd_1.Modal, { title: "\u6DFB\u52A0\u5C4F\u5E55", open: visibled, okText: common_1.strings.okText, cancelText: common_1.strings.cancelText, onCancel: () => {
                    this.setState({ visibled: false });
                }, onOk: () => {
                    this.props.onSelecte(screenType);
                    this.setState({ visibled: false });
                } },
                react_1.default.createElement(antd_1.Typography.Text, { style: { display: "block", marginBottom: 10 } }, "\u8BF7\u9009\u62E9\u5C4F\u5E55\u7C7B\u578B\uFF1A"),
                react_1.default.createElement(antd_2.Radio.Group, { value: screenType, onChange: e => {
                        screenType = e.target.value;
                        this.setState({ screenType });
                    } },
                    react_1.default.createElement(antd_2.Space, { direction: "vertical" },
                        react_1.default.createElement(antd_2.Radio, { value: type_names_1.typeNames.OneSplitView }, "\u5355\u5C4F"),
                        react_1.default.createElement(antd_2.Radio, { value: type_names_1.typeNames.ThreeSplitView }, "\u4E09\u5206\u5C4F"),
                        react_1.default.createElement(antd_2.Radio, { value: type_names_1.typeNames.FourSplitView }, "\u56DB\u5206\u5C4F")))));
    }
}
exports.default = ScreenDialog;
