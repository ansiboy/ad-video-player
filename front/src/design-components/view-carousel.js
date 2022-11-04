"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const common_1 = require("../common");
require("./view-carousel.scss");
const contentStyle = {
    height: '450px',
    // color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
class ViewCarouselDesign extends react_1.default.Component {
    children = [];
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
    }
    render() {
        let children = (0, common_1.componentChildrenArray)(this.props.children);
        return react_1.default.createElement(common_1.EditorPageContext.Consumer, null, args => {
            return react_1.default.createElement(common_1.ComponentRelateion.Provider, { value: { parent: this, children: this.children } },
                react_1.default.createElement("div", { className: "ant-carousel" },
                    react_1.default.createElement("ul", { className: "slick-dots slick-dots-bottom", style: { display: "block", position: "unset" } }, children.map((c, i) => react_1.default.createElement("li", { key: i, className: args.screenIndex == i ? "slick-active" : "" },
                        react_1.default.createElement("button", { onClick: () => args.setScreenIndex(i) }, i))))),
                children.map((c, i) => react_1.default.createElement("div", { key: `${c.key}`, style: { display: args.screenIndex == i ? "" : "none" } }, c)));
        });
    }
}
exports.default = ViewCarouselDesign;
