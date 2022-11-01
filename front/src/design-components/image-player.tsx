import React from "react";
import ImagePlayer, { Props } from "../ad-players/image-player";
import { componentSelected } from "../common";

export default function ImagePlayerDesign(props: Props) {
    let imagePlayer: ImagePlayer;
    return <div style={{ width: "100%", height: "100%" }} onClick={() => {
        componentSelected.fire({ id: props.id as string, component: imagePlayer })
    }}>
        <ImagePlayer ref={e => imagePlayer = e || imagePlayer} {...props} />
    </div>
}