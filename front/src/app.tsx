import './app.scss';
import React from 'react';
import { OneSplitView } from './ad-views/one-split-view';
import VideoPlayer from './ad-players/video-player';
import { FourSplitView } from './ad-views/four-split-view';
import ViewCarousel, { ViewCarouselData } from './view-carousel';
import { AdView, AdViewData } from './ad-views/ad-view';
import { ThreeSplitView } from './ad-views/three-split-view';
import ImagePlayer from './ad-players/image-player';

function App() {

  let carouselData: ViewCarouselData = { views: [] };
  let oneViewData: AdViewData = { players: [] };
  let threeViewData: AdViewData = { players: [] };
  let fourViewData: AdViewData = { players: [] };

  return <ViewCarousel {...{ data: carouselData }}>
    <ThreeSplitView playSeconds={15} carouselData={carouselData} data={threeViewData} >
      <ImagePlayer imagePaths={["./medias/three/1.png", "./medias/three/2.png", "./medias/three/3.png"]} viewData={threeViewData} />
      <ImagePlayer imagePaths={["./medias/three/2.png", "./medias/three/3.png"]} viewData={threeViewData} />
      <ImagePlayer imagePaths={["./medias/three/4.png"]} viewData={threeViewData} />
    </ThreeSplitView>
    <OneSplitView playSeconds={12} carouselData={carouselData} data={oneViewData} >
      <VideoPlayer videoPath="./medias/single/1.mp4" viewData={oneViewData} />
    </OneSplitView>
    <FourSplitView playSeconds={14} carouselData={carouselData} data={fourViewData}>
      <VideoPlayer videoPath="./medias/square/1.mp4" viewData={fourViewData} />
      <VideoPlayer videoPath="./medias/square/2.mp4" viewData={fourViewData} />
      <VideoPlayer videoPath="./medias/square/3.mp4" viewData={fourViewData} />
      <ImagePlayer imagePaths={["./medias/three/4.png"]} viewData={threeViewData} />
    </FourSplitView>
  </ViewCarousel>
}

export default App;
