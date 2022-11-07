"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const utils_1 = require("../../../utils/utils");
const ModelImage = props => {
    const { visible, type, onCancel, onOk, isRadio = false, data = [] } = props;
    const [list, setList] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        getList();
    }, []);
    /**
     * 将数据转换
     * @date 2022-11-07
     * @param {any} arr:string[]
     * @returns {any}
     */
    const handleData = (arr) => {
        const getImagesList = arr.reduce((prev, curr) => {
            let obj = {
                value: '',
                checked: false
            };
            if (data.includes(curr)) {
                obj.checked = true;
            }
            obj.value = curr;
            prev.push(obj);
            return prev;
        }, []);
        return getImagesList;
    };
    /**
     * 获取图片/视频数据
     * @date 2022-11-07
     * @returns {any}
     */
    const getList = async () => {
        const getlocalStorageList = localStorage.getItem(`${type}List`);
        if (getlocalStorageList) {
            const arr = JSON.parse(getlocalStorageList);
            const overData = handleData(arr);
            setList(overData);
        }
        else {
            (0, user_1.getAllList)(type).then(res => {
                localStorage.setItem(`${type}List`, JSON.stringify(res));
                const overData = handleData(res);
                setList(overData);
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
                react_1.default.createElement(antd_1.Space, { size: 12, style: { marginLeft: 'auto' } },
                    react_1.default.createElement(antd_1.Button, { onClick: onCancel }, "\u53D6\u6D88"),
                    react_1.default.createElement(antd_1.Button, { type: 'primary', onClick: () => {
                            const value = list
                                .filter(item => item.checked)
                                .map(item => item.value);
                            if (!value.length) {
                                antd_1.message.warning(`请至少选择一个${type === 'image' ? '图片' : '视频'}`);
                                return;
                            }
                            onOk(value);
                        } }, "\u786E\u5B9A"))) },
            react_1.default.createElement("div", { className: 'model-items' }, list.map(item => (react_1.default.createElement("div", { key: item.value, className: item.checked ? 'model-item active' : 'model-item', onClick: () => {
                    const arr = JSON.parse(JSON.stringify(list));
                    if (!isRadio) {
                        arr.map(o => {
                            if (o.value === item.value)
                                o.checked = !o.checked;
                        });
                    }
                    else {
                        arr.map(o => {
                            o.checked = false;
                            if (o.value === item.value) {
                                o.checked = !o.checked;
                            }
                        });
                    }
                    setList(arr);
                } }, type === 'image' ? (react_1.default.createElement("img", { src: (0, utils_1.imagePath)(item.value), alt: '' })) : (react_1.default.createElement("video", { src: (0, utils_1.imagePath)(item.value) })))))))));
};
exports.default = ModelImage;
