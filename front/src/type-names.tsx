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
type TypeName = keyof typeof runtimeComponentTypes;

export const ONE_SPLIT_VIEW: TypeName = "OneSplitView";
export const THREE_SPLIT_VIEW: TypeName = "ThreeSplitView";
export const FOUR_SPLIT_VIEW: TypeName = "FourSplitView";
export const IMAGE_PLAYER: TypeName = "ImagePlayer";
export const VIDEO_PLAYER: TypeName = "VideoPlayer";
export const EMPTY_PLAYER: TypeName = "EmptyPlayer"

export let typeNames = {
    OneSplitView: ONE_SPLIT_VIEW,
    ThreeSplitView: THREE_SPLIT_VIEW,
    FourSplitView: FOUR_SPLIT_VIEW,
    ImagePlayer: IMAGE_PLAYER,
    VideoPlayer: VIDEO_PLAYER,
    EmptyPlayer: EMPTY_PLAYER
}

export let componentPropertyChanged = new Callback<{ componentId: string, propertyName: string, propertyValue: any }>();