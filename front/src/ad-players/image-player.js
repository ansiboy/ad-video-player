"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ad_player_1 = require("./ad-player");
const carousel_1 = require("./image-player/carousel");
require("./image-player.scss");
const antd_1 = require("antd");
class ImagePlayer extends ad_player_1.AdPlayer {
    carouselElement = undefined;
    carousel = undefined;
    play() {
        if (!this.carousel)
            return;
        this.carousel.play();
    }
    pause() {
        if (!this.carousel)
            return;
        this.carousel.stop();
    }
    render() {
        let imagePaths = this.props.imagePaths || [];
        if (imagePaths.length == 0) {
            return react_1.default.createElement(antd_1.Empty, { description: "\u6682\u65E0\u56FE\u7247" });
        }
        if (imagePaths.length == 1) {
            return react_1.default.createElement("img", { className: "player-image", src: imagePaths[0] });
        }
        return react_1.default.createElement("div", { className: "carousel slide", ref: e => {
                if (!e || this.carouselElement)
                    return;
                this.carouselElement = e;
                this.carousel = new carousel_1.Carousel(this.carouselElement, { autoplay: true });
            } },
            react_1.default.createElement("ol", { className: "carousel-indicators" }, imagePaths.map((o, i) => react_1.default.createElement("li", { key: i }))),
            react_1.default.createElement("div", { className: "carousel-inner" }, imagePaths.map((o, i) => react_1.default.createElement("div", { key: i, className: "item" },
                react_1.default.createElement("img", { className: "player-image", src: o })))));
    }
}
exports.default = ImagePlayer;
