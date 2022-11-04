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
const antd_1 = require("antd");
const react_1 = __importStar(require("react"));
const uploadImage_1 = __importDefault(require("./uploadImage"));
require("./model-image.scss");
const user_1 = require("../../../services/user");
const ModelImage = props => {
    const { visible, type, onCancel, onOk } = props;
    const [list, setList] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        getList();
    }, []);
    const getList = async () => {
        const getlocalStorageList = localStorage.getItem(`${type}List`);
        if (getlocalStorageList) {
            const arr = JSON.parse(getlocalStorageList);
            setList(arr);
        }
        else {
            (0, user_1.getAllList)(type).then(res => {
                const data = res.reduce((prev, curr) => {
                    let obj = {
                        value: '',
                        checked: false
                    };
                    obj.value = curr;
                    prev.push(obj);
                    return prev;
                }, []);
                localStorage.setItem(`${type}List`, JSON.stringify(data));
                setList(data);
            });
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(antd_1.Modal, { open: visible, destroyOnClose: true, title: `选择${type === 'video' ? '视频' : '图片'}`, onCancel: onCancel, width: 800, bodyStyle: {
                height: 500,
                overflowY: 'auto'
            }, footer: react_1.default.createElement("div", { className: 'modal-footer' },
                react_1.default.createElement(uploadImage_1.default, { type: type, onOk: (info, isExist = false) => {
                        let arr = JSON.parse(JSON.stringify(list));
                        if (!isExist) {
                            let obj = {
                                checked: false,
                                value: info
                            };
                            arr.unshift(obj);
                        }
                        setList(arr);
                    }, onBefore: name => {
                        return list.map(item => item.value).includes(name);
                    } }),
                react_1.default.createElement(antd_1.Space, { size: 12 },
                    react_1.default.createElement(antd_1.Button, { onClick: onCancel }, "\u53D6\u6D88"),
                    react_1.default.createElement(antd_1.Button, { type: 'primary' }, "\u786E\u5B9A"))) },
            react_1.default.createElement("div", { className: 'model-items' }, list.map(item => (react_1.default.createElement("div", { key: item.value, className: item.checked ? 'model-item active' : 'model-item', onClick: () => {
                    const arr = JSON.parse(JSON.stringify(list));
                    arr.map(o => {
                        if (o.value === item.value)
                            o.checked = !o.checked;
                    });
                    setList(arr);
                } }, type === 'image' ? (react_1.default.createElement("img", { src: `/medias/${item.value}`, alt: '' })) : (react_1.default.createElement("video", { src: `/medias/${item.value}` })))))))));
};
exports.default = ModelImage;
