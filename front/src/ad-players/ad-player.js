"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdPlayer = void 0;
const react_1 = __importDefault(require("react"));
const common_1 = require("../common");
/** 广告播放器 */
class AdPlayer extends react_1.default.Component {
    constructor(props) {
        super(props);
        let originalRender = this.render.bind(this);
        this.render = function () {
            return react_1.default.createElement(common_1.ComponentRelateion.Consumer, null, args => {
                if (args != null && args.children.indexOf(this) < 0) {
                    args.children.push(this);
                }
                return originalRender();
            });
        };
    }
}
exports.AdPlayer = AdPlayer;
