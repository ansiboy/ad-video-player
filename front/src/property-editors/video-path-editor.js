"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoEditor = void 0;
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const modelImage_1 = __importDefault(require("../pages/admin/edit/modelImage"));
const utils_1 = require("../utils/utils");
class VideoEditor extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { propertyValue: props.propertyValue, visible: false };
    }
    // this.props.changed(e.target.value);
    render() {
        let { propertyValue: value = '' } = this.state;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(antd_1.Space, { size: 12, direction: 'vertical' },
                react_1.default.createElement("video", { style: { border: '#ddd 1px solid' }, src: (0, utils_1.imagePath)(value), width: 100, height: 100 }),
                react_1.default.createElement(antd_1.Button, { type: 'primary', onClick: () => this.setState({ visible: true }) }, "\u66F4\u6362\u89C6\u9891")),
            this.state.visible ? (react_1.default.createElement(modelImage_1.default, { visible: this.state.visible, type: 'video', data: [value], isRadio: true, onOk: value => {
                    this.setState({ visible: false });
                    this.props.changed(value[0]);
                }, onCancel: () => this.setState({ visible: false }) })) : null));
    }
}
exports.VideoEditor = VideoEditor;
