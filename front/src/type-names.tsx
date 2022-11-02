import React from "react";
import ImagePlayer from "./ad-players/image-player";
import VideoPlayer from "./ad-players/video-player";
import EmptyPlayer from "./ad-players/empty-player";
import { FourSplitView } from "./ad-views/four-split-view";
import { OneSplitView } from "./ad-views/one-split-view";
import { ThreeSplitView } from "./ad-views/three-split-view";
import ImagePlayerDesign from "./design-components/image-player";
import VideoPlayerDesign from "./design-components/video-player";
import ViewCarouselDesign from "./design-components/view-carousel";
import ViewCarousel from "./view-carousel";
import { Callback } from "maishu-toolkit";

export let runtimeComponentTypes = { OneSplitView, ThreeSplitView, FourSplitView, ImagePlayer, VideoPlayer, ViewCarousel, EmptyPlayer };
export let designComponentTypes = {
    ViewCarousel: ViewCarouselDesign,
    ImagePlayer: ImagePlayerDesign,
    VideoPlayer: VideoPlayerDesign,
};
export type ComponentTypeName = keyof typeof runtimeComponentTypes;

const ONE_SPLIT_VIEW: ComponentTypeName = "OneSplitView";
const THREE_SPLIT_VIEW: ComponentTypeName = "ThreeSplitView";
const FOUR_SPLIT_VIEW: ComponentTypeName = "FourSplitView";
const IMAGE_PLAYER: ComponentTypeName = "ImagePlayer";
const VIDEO_PLAYER: ComponentTypeName = "VideoPlayer";
const EMPTY_PLAYER: ComponentTypeName = "EmptyPlayer"
const VIEW_CAROUSEL: ComponentTypeName = "ViewCarousel";

export let typeNames = {
    OneSplitView: ONE_SPLIT_VIEW,
    ThreeSplitView: THREE_SPLIT_VIEW,
    FourSplitView: FOUR_SPLIT_VIEW,
    ImagePlayer: IMAGE_PLAYER,
    VideoPlayer: VIDEO_PLAYER,
    EmptyPlayer: EMPTY_PLAYER,
    ViewCarousel: VIEW_CAROUSEL,
}

export let componentPropertyChanged = new Callback<{ componentId: string, propertyName: string, propertyValue: any }>();