"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const maishu_toolkit_1 = require("maishu-toolkit");
const icons_1 = require("@ant-design/icons");
const modelImage_1 = __importDefault(require("../pages/admin/edit/modelImage"));
class ImagePathsEditor extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }
    render() {
        let imagePaths = this.props.propertyValue || [];
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(antd_1.Space, { direction: 'vertical', size: 10 },
                imagePaths.map((o, i) => (react_1.default.createElement(antd_1.Input, { key: (0, maishu_toolkit_1.guid)(), value: o, onChange: e => {
                        imagePaths[i] = e.target.value;
                        // setImagePaths(imagePaths);
                        this.setState({ propertyValue: imagePaths });
                        this.props.changed(imagePaths);
                    } }))),
                react_1.default.createElement(antd_1.Button, { type: 'primary', onClick: () => {
                        this.setState({
                            visible: true
                        });
                    } },
                    react_1.default.createElement(icons_1.PlusOutlined, null),
                    " \u9009\u62E9\u56FE\u7247/\u89C6\u9891")),
            react_1.default.createElement(modelImage_1.default, { visible: this.state.visible, type: 'image' })));
    }
}
exports.default = ImagePathsEditor;
