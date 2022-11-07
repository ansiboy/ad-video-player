"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const icons_1 = require("@ant-design/icons");
const modelImage_1 = __importDefault(require("../pages/admin/edit/modelImage"));
const sortImageEditor_1 = __importDefault(require("../pages/admin/edit/sortImageEditor"));
function CreateImagePathsEditorType(type) {
    return class ImagePathsEditor extends react_1.default.Component {
        constructor(props) {
            super(props);
            this.state = {
                visible: false
            };
        }
        // this.props.changed(imagePaths)
        render() {
            let imagePaths = this.props.propertyValue || [];
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(antd_1.Space, { direction: 'vertical', size: 10 },
                    react_1.default.createElement(sortImageEditor_1.default, { data: imagePaths, onSort: value => {
                            this.props.changed(value);
                        } }),
                    react_1.default.createElement(antd_1.Button, { type: 'primary', onClick: () => {
                            this.setState({
                                visible: true
                            });
                        } },
                        react_1.default.createElement(icons_1.PlusOutlined, null),
                        " \u9009\u62E9",
                        type === 'video' ? '视频' : '图片')),
                this.state.visible ? (react_1.default.createElement(modelImage_1.default, { visible: this.state.visible, type: type, data: imagePaths, onOk: value => {
                        this.setState({ visible: false });
                        this.props.changed(value);
                    }, onCancel: () => this.setState({ visible: false }) })) : null));
        }
    };
}
exports.default = CreateImagePathsEditorType;
