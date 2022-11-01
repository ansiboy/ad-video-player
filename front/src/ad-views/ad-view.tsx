import React from "react";
import { AdPlayer } from "../ad-players/ad-player";
import { ComponentRelateion } from "../common";
import { ViewCarouselData } from "../view-carousel";

export abstract class AdView extends React.Component<AdViewProps, AdViewState> {

    abstract className: string;
    abstract renderChildren(): React.ReactNode;

    protected children: AdPlayer<any>[] = [];

    constructor(props: AdView["props"]) {
        super(props);

        this.state = { visible: false };
    }

    setVisible(value: boolean) {
        this.setState({ visible: value })
    }

    play() {
        this.children.forEach(p => {
            p.play();
        })
    }

    pause() {
        this.children.forEach(p => {
            p.pause();
        })
    }

    render(): React.ReactNode {
        let { visible } = this.state;
        return <ComponentRelateion.Consumer>
            {args => {
                if (args != null && args.children.indexOf(this) < 0) {
                    args.children.push(this);
                }

                return <ComponentRelateion.Provider value={{ parent: this, children: this.children }}>
                    <div className={this.className} style={{ display: visible ? "flex" : "none" }}>
                        {this.renderChildren()}
                    </div>
                </ComponentRelateion.Provider>
            }}
        </ComponentRelateion.Consumer>
    }
}

export interface AdViewData {
    players: AdPlayer<any, any>[]
}

export interface AdViewProps {
    id: string,
    children: React.ReactNode,
    playSeconds: number,
}

export interface AdViewState {
    visible: boolean
}