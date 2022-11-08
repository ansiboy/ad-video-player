import React from "react";
import { AdView, AdViewProps } from "./ad-views/ad-view";
import { componentChildrenArray, ComponentRelateion } from "./common";

const second = 1000;

export interface ViewCarouselData {
    views: AdView[]
}

export interface ViewCarouselProps {
    id: string,
    children: React.ReactNode
    activeIndex: number,
}

export const ViewCarouselContext = React.createContext({ views: [] as AdView[] });

export interface ViewCarouselState {
    currentIndex: number
}

/** 视图轮播 */
export default class ViewCarousel extends React.Component<ViewCarouselProps, ViewCarouselState> {

    private playItemSeconds: number[];
    private children: AdView[] = [];

    constructor(props: ViewCarousel["props"]) {
        super(props);

        let children = componentChildrenArray(this.props.children);
        this.playItemSeconds = children.map(o => o.props as AdViewProps).map(o => o.playSeconds);
        this.state = { currentIndex: props.activeIndex || 0 }
    }

    componentDidMount(): void {

        let currentIndex = this.state.currentIndex;
        let playSeconds = 0;
        setInterval(() => {
            playSeconds = playSeconds + 1;
            if (playSeconds == this.playItemSeconds[currentIndex]) {
                this.pause(currentIndex);
                playSeconds = 0;
                currentIndex = currentIndex + 1;
                if (currentIndex > this.playItemSeconds.length - 1) {
                    currentIndex = 0;
                }

                this.play(currentIndex);
            }

        }, second)

        this.play(currentIndex);
    }

    play(index: number) {
        let adView = this.getAdView(index);
        this.setState({ currentIndex: index });
        adView.play();
    }

    pause(index: number) {
        let adView = this.getAdView(index);
        adView.pause();
    }

    getAdView(index: number): AdView {
        let adView = this.children[index] as any as AdView;
        return adView;
    }

    render(): React.ReactNode {
        let children = componentChildrenArray(this.props.children);
        let { currentIndex } = this.state;
        return <ComponentRelateion.Provider value={{ parent: this, children: this.children }}>
            {children.map((c, i) => <div key={`${c.key}`} style={{ display: currentIndex == i ? "" : "none" }}>{c}</div>)}
        </ComponentRelateion.Provider >
    }
}