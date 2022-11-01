import React from "react";
import { AdView, AdViewProps } from "./ad-views/ad-view";
import { componentChildrenArray, ComponentRelateion } from "./common";
import { ComponentProps } from "./component-parse";

const second = 1000;

export interface ViewCarouselData {
    views: AdView[]
}

export interface ViewCarouselProps {
    id: string,
    children: React.ReactNode,
    // data: ViewCarouselData
}

export const ViewCarouselContext = React.createContext({ views: [] as AdView[] });


/** 视图轮播 */
export default class ViewCarousel extends React.Component<ViewCarouselProps> {

    private currentIndex = 0;
    private playItemSeconds: number[];
    private children: AdView[] = [];

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
        let adView = this.children[index] as any as AdView;
        return adView;
    }

    render(): React.ReactNode {
        return <ComponentRelateion.Provider value={{ parent: this, children: this.children }}>
            {this.props.children}
        </ComponentRelateion.Provider >
    }
}