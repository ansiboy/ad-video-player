import React from "react";
import VideoPlayer, { Props } from "../ad-players/video-player";
import { componentSelected } from "../common";

export default function VideoPlayerDesign(props: Props) {
    let player: VideoPlayer;
    return <div style={{ width: "100%", height: "100%" }} onClick={() => {
        componentSelected.fire({ id: props.id as string, component: player });
    }}>
        <VideoPlayer ref={e => player = e || player} {...props} />
    </div>
}