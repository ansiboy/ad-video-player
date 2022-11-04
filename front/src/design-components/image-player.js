"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const image_player_1 = __importDefault(require("../ad-players/image-player"));
const common_1 = require("../common");
function ImagePlayerDesign(props) {
    let imagePlayer;
    return react_1.default.createElement(common_1.EditorPageContext.Consumer, null, args => {
        return react_1.default.createElement("div", { style: { width: "100%", height: "100%" }, onClick: () => {
                args.setSelectedComponentId(props.id);
            } },
            react_1.default.createElement(image_player_1.default, { ref: e => imagePlayer = e || imagePlayer, ...props }));
    });
}
exports.default = ImagePlayerDesign;
