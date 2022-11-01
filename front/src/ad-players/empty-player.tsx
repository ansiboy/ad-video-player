import React from "react";
import { AdPlayer, AdPlayerProps } from "./ad-player";

export default class Empty extends AdPlayer<AdPlayerProps>  {
    play(): void {
    }
    pause(): void {
    }
    render(): React.ReactNode {
        return <></>
    }
}