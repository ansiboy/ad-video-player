import { Empty } from "antd";
import React from "react";
import { mediaPath } from "../utils/utils";
import { AdPlayer, AdPlayerProps } from "./ad-player";
import "./video-player.scss";

export interface Props extends AdPlayerProps {
    videoPath: string,
}

export default class VideoPlayer extends AdPlayer<Props> {

    private videoElement?: HTMLVideoElement = undefined;

    play() {
        if (!this.videoElement)
            throw new Error(`Video element is null.`);

        this.videoElement.play();
    }
    pause() {
        if (!this.videoElement)
            throw new Error(`Video element is null.`);

        this.videoElement.pause();
    }
    render() {
        if (!this.props.videoPath) {
            return <Empty description="暂无播放视频" />
        }
        return <video key={this.props.videoPath} className="player-video" src={mediaPath(this.props.videoPath)} loop ref={e => this.videoElement = e || this.videoElement}>
        </video>
    }

}