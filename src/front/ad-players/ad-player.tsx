import React from "react";
import { ComponentRelateion } from "../common";
import { ComponentProps } from "../component-parse";

export interface AdPlayerProps extends ComponentProps {
}

/** 广告播放器 */
export abstract class AdPlayer<P extends AdPlayerProps, S = any> extends React.Component<P, S> {
    /** 开始播放 */
    abstract play(): void;
    /** 停止播放 */
    abstract pause(): void;

    constructor(props: P) {
        super(props);

        let originalRender = this.render.bind(this);
        this.render = function () {
            return <ComponentRelateion.Consumer>
                {args => {
                    if (args != null && args.children.indexOf(this) < 0) {
                        args.children.push(this);
                    }
                    return originalRender();
                }}
            </ComponentRelateion.Consumer>
        }
    }
}