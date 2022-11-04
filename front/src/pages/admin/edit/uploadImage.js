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
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const react_1 = __importStar(require("react"));
const icons_1 = require("@ant-design/icons");
const user_1 = require("../../../services/user");
const UploadImage = props => {
    const { type } = props;
    const [loading, setLoading] = (0, react_1.useState)(false);
    const onBeforeUpload = async (file) => {
        const key = 'uploadding';
        const formData = new FormData();
        formData.append('image', file);
        const isExist = props.onBefore(file.name);
        if (isExist) {
            await antd_1.Modal.confirm({
                title: '该图片名称已存在,是否覆盖？',
                onCancel: () => {
                    return false;
                },
                onOk: () => {
                    setLoading(true);
                    antd_1.message.loading({ content: '上传中', key });
                    (0, user_1.uploadFile)(formData)
                        .then(res => {
                        antd_1.message.success({ content: '上传成功！', key, duration: 2 });
                        props.onOk(file.name);
                        setLoading(false);
                    })
                        .catch(err => {
                        setLoading(false);
                        antd_1.message.success({ content: '上传失败！', key, duration: 2 });
                    });
                }
            });
            return false;
        }
        else {
            setLoading(true);
            antd_1.message.loading({ content: '上传中', key });
            (0, user_1.uploadFile)(formData)
                .then(res => {
                setLoading(false);
                antd_1.message.success({ content: '上传成功！', key, duration: 2 });
                props.onOk(file.name);
            })
                .catch(err => {
                setLoading(false);
                antd_1.message.success({ content: '上传失败！', key, duration: 2 });
            });
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(antd_1.Spin, { spinning: loading, size: 'small' },
            react_1.default.createElement(antd_1.Upload, { listType: 'picture', beforeUpload: onBeforeUpload, accept: type === 'video' ? 'video/mp4' : 'image/jpg,image/jpeg,image/png' },
                react_1.default.createElement(antd_1.Button, { icon: react_1.default.createElement(icons_1.UploadOutlined, null) },
                    "\u4E0A\u4F20",
                    type === 'video' ? '视频' : '图片')))));
};
exports.default = UploadImage;
