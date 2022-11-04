"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentPropertyChanged = exports.typeNames = exports.designComponentTypes = exports.runtimeComponentTypes = void 0;
const image_player_1 = __importDefault(require("./ad-players/image-player"));
const video_player_1 = __importDefault(require("./ad-players/video-player"));
const empty_player_1 = __importDefault(require("./ad-players/empty-player"));
const four_split_view_1 = require("./ad-views/four-split-view");
const one_split_view_1 = require("./ad-views/one-split-view");
const three_split_view_1 = require("./ad-views/three-split-view");
const image_player_2 = __importDefault(require("./design-components/image-player"));
const video_player_2 = __importDefault(require("./design-components/video-player"));
const view_carousel_1 = __importDefault(require("./design-components/view-carousel"));
const view_carousel_2 = __importDefault(require("./view-carousel"));
const maishu_toolkit_1 = require("maishu-toolkit");
exports.runtimeComponentTypes = { OneSplitView: one_split_view_1.OneSplitView, ThreeSplitView: three_split_view_1.ThreeSplitView, FourSplitView: four_split_view_1.FourSplitView, ImagePlayer: image_player_1.default, VideoPlayer: video_player_1.default, ViewCarousel: view_carousel_2.default, EmptyPlayer: empty_player_1.default };
exports.designComponentTypes = {
    ViewCarousel: view_carousel_1.default,
    ImagePlayer: image_player_2.default,
    VideoPlayer: video_player_2.default,
};
const ONE_SPLIT_VIEW = "OneSplitView";
const THREE_SPLIT_VIEW = "ThreeSplitView";
const FOUR_SPLIT_VIEW = "FourSplitView";
const IMAGE_PLAYER = "ImagePlayer";
const VIDEO_PLAYER = "VideoPlayer";
const EMPTY_PLAYER = "EmptyPlayer";
const VIEW_CAROUSEL = "ViewCarousel";
exports.typeNames = {
    OneSplitView: ONE_SPLIT_VIEW,
    ThreeSplitView: THREE_SPLIT_VIEW,
    FourSplitView: FOUR_SPLIT_VIEW,
    ImagePlayer: IMAGE_PLAYER,
    VideoPlayer: VIDEO_PLAYER,
    EmptyPlayer: EMPTY_PLAYER,
    ViewCarousel: VIEW_CAROUSEL,
};
exports.componentPropertyChanged = new maishu_toolkit_1.Callback();
