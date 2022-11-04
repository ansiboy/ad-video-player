"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ad_player_1 = require("./ad-player");
class Empty extends ad_player_1.AdPlayer {
    play() {
    }
    pause() {
    }
    render() {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
}
exports.default = Empty;
