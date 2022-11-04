"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const ad_player_1 = require("./ad-player");
require("./video-player.scss");
class VideoPlayer extends ad_player_1.AdPlayer {
    videoElement = undefined;
    play() {
        if (!this.videoElement)
            throw new Error(`Video element is null.`);
        this.videoElement.play();
    }
    pause() {
        if (!this.videoElement)
            throw new Error(`Video element is null.`);
        this.videoElement.pause();
    }
    render() {
        if (!this.props.videoPath) {
            return react_1.default.createElement(antd_1.Empty, { description: "\u6682\u65E0\u64AD\u653E\u89C6\u9891" });
        }
        return react_1.default.createElement("video", { key: this.props.videoPath, className: "player-video", src: this.props.videoPath, loop: true, ref: e => this.videoElement = e || this.videoElement });
    }
}
exports.default = VideoPlayer;
