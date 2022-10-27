import React from "react";
import { AdView, AdViewProps } from "./ad-views/ad-view";
import { componentChildrenArray } from "./common";

const second = 1000;

export interface ViewCarouselData {
    views: AdView[]
}

interface Props {
    children: React.ReactNode,
    data: ViewCarouselData
}

export const ViewCarouselContext = React.createContext({ views: [] as AdView[] });


/** 视图轮播 */
export default class ViewCarousel extends React.Component<Props> {

    private currentIndex = 0;
    private playItemSeconds: number[];

    constructor(props: ViewCarousel["props"]) {
        super(props);

        let children = componentChildrenArray(this.props.children);
        this.playItemSeconds = children.map(o => o.props as AdViewProps).map(o => o.playSeconds);
    }


    componentDidMount(): void {

        let playSeconds = 0;
        setInterval(() => {
            playSeconds = playSeconds + 1;
            if (playSeconds == this.playItemSeconds[this.currentIndex]) {
                this.pause(this.currentIndex);
                playSeconds = 0;
                this.currentIndex = this.currentIndex + 1;
                if (this.currentIndex > this.playItemSeconds.length - 1) {
                    this.currentIndex = 0;
                }

                this.play(this.currentIndex);
            }

        }, second)

        this.play(this.currentIndex);
    }

    play(index: number) {
        let adView = this.getAdView(index);
        adView.setVisible(true);
        adView.play();
    }

    pause(index: number) {
        let adView = this.getAdView(index);
        adView.pause();
        adView.setVisible(false);
    }

    getAdView(index: number): AdView {
        let adView = this.props.data.views[index] as any as AdView;
        return adView;
    }

    render(): React.ReactNode {
        return this.props.children;
    }
}