import ImagePlayer from "./ad-players/image-player";
import VideoPlayer from "./ad-players/video-player";
import { FourSplitView } from "./ad-views/four-split-view";
import { OneSplitView } from "./ad-views/one-split-view";
import { ThreeSplitView } from "./ad-views/three-split-view";
import ViewCarouselDesign from "./design-components/view-carousel";
import ViewCarousel from "./view-carousel";

export let runtimeComponentTypes = { OneSplitView, ThreeSplitView, FourSplitView, ImagePlayer, VideoPlayer, ViewCarousel };
export let designComponentTypes = { ViewCarousel: ViewCarouselDesign };
type TypeName = keyof typeof runtimeComponentTypes;

export const ONE_SPLIT_VIEW: TypeName = "OneSplitView";
export const THREE_SPLIT_VIEW: TypeName = "ThreeSplitView";