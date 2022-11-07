"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./model-image.scss");
const antd_1 = require("antd");
require("sortablejs");
const react_sortablejs_1 = require("react-sortablejs");
const icons_1 = require("@ant-design/icons");
const utils_1 = require("../../../utils/utils");
const SortImageEditor = props => {
    const { data } = props;
    return (react_1.default.createElement("ul", { className: 'sorts' },
        react_1.default.createElement(react_sortablejs_1.ReactSortable, { list: data, setList: list => {
                props.onSort(list);
                // setTimeout(() => {
                // }, 100)
            }, handle: '.sort-icon' }, data.map(item => (react_1.default.createElement("li", { key: item },
            react_1.default.createElement("div", { className: 'sort-icon' },
                react_1.default.createElement(icons_1.UnorderedListOutlined, null)),
            react_1.default.createElement("div", { className: 'sort-image' },
                react_1.default.createElement(antd_1.Image, { width: 50, height: 50, src: (0, utils_1.imagePath)(item), alt: 'image' })),
            react_1.default.createElement("div", { className: 'sort-text' }, item)))))));
};
exports.default = SortImageEditor;
