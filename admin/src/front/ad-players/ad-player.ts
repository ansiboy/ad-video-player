import React from "react";
import { AdViewData } from "../ad-views/ad-view";

export interface AdPlayerProps {
    viewData: AdViewData
}

/** 广告播放器 */
export abstract class AdPlayer<P extends AdPlayerProps, S = any> extends React.Component<P, S> {
    /** 开始播放 */
    abstract play(): void;
    /** 停止播放 */
    abstract pause(): void;

    constructor(props: P) {
        super(props);

        props.viewData.players.push(this);
    }
}