import React from "react";
import ImagePlayer, { Props } from "../ad-players/image-player";
import { EditorPageContext } from "../common";

export default function ImagePlayerDesign(props: Props) {
    let imagePlayer: ImagePlayer;
    return <EditorPageContext.Consumer>
        {args => {
            return <div style={{ width: "100%", height: "100%" }} onClick={() => {
                args.setSelectedComponentId(props.id);
            }}>
                <ImagePlayer ref={e => imagePlayer = e || imagePlayer} {...props} />
            </div>
        }}
    </EditorPageContext.Consumer>
}