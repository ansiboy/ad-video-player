"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const video_player_1 = __importDefault(require("../ad-players/video-player"));
const common_1 = require("../common");
function VideoPlayerDesign(props) {
    let player;
    return react_1.default.createElement(common_1.EditorPageContext.Consumer, null, args => {
        return react_1.default.createElement("div", { style: { width: "100%", height: "100%" }, onClick: () => {
                // componentSelected.fire({ id: props.id as string });
                args.setSelectedComponentId(props.id);
            } },
            react_1.default.createElement(video_player_1.default, { ref: e => player = e || player, ...props }));
    });
}
exports.default = VideoPlayerDesign;
