import React from "react";
import { AdPlayer } from "../ad-players/ad-player";
import { ViewCarouselData } from "../view-carousel";

export abstract class AdView extends React.Component<AdViewProps, AdViewState> {

    abstract className: string;
    abstract renderChildren(): React.ReactNode;

    constructor(props: AdView["props"]) {
        super(props);

        this.props.carouselData.views.push(this);
        this.state = { visible: false };
    }

    setVisible(value: boolean) {
        this.setState({ visible: value })
    }

    play() {
        this.props.data.players.forEach(p => {
            p.play();
        })
    }

    pause() {
        this.props.data.players.forEach(p => {
            p.pause();
        })
    }

    render(): React.ReactNode {
        let { visible } = this.state;
        return <div className={this.className} style={{ display: visible ? "flex" : "none" }}>
            {this.renderChildren()}
        </div>

    }
}

export interface AdViewData {
    players: AdPlayer<any, any>[]
}

export interface AdViewProps {
    children: React.ReactNode,
    carouselData: ViewCarouselData,
    data: AdViewData,
    playSeconds: number,
}

export interface AdViewState {
    visible: boolean
}