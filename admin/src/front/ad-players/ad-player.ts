import React from "react";

export interface AdPlayerProps {
}

/** 广告播放器 */
export abstract class AdPlayer<P extends AdPlayerProps, S = any> extends React.Component<P, S> {
    /** 开始播放 */
    abstract play(): void;
    /** 停止播放 */
    abstract pause(): void;

    constructor(props: P) {
        super(props);

    }
}