import React from "react";
import VideoPlayer, { Props } from "../ad-players/video-player";
import { EditorPageContext } from "../common";

export default function VideoPlayerDesign(props: Props) {
    let player: VideoPlayer;
    return <EditorPageContext.Consumer>
        {args => {
            return <div style={{ width: "100%", height: "100%" }} onClick={() => {
                // componentSelected.fire({ id: props.id as string });
                args.setSelectedComponentId(props.id);
            }}>
                <VideoPlayer ref={e => player = e || player} {...props} />
            </div>
        }}
    </EditorPageContext.Consumer>
}