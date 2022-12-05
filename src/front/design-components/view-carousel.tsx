import { Empty } from "antd";
import React from "react";
import { AdView } from "../ad-views/ad-view";
import { componentChildrenArray, ComponentRelateion, EditorPageContext, EditorPageContextValue, strings } from "../common";
import { ViewCarouselProps } from "../view-carousel";
import "./view-carousel.scss";
import Sortable from "sortablejs"

const contentStyle: React.CSSProperties = {
    height: '450px',
    // color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

interface State {
    // activeIndex: number
}

const SLICK_NORMAL = "slick-normal"

export default class ViewCarouselDesign extends React.Component<ViewCarouselProps, State> {

    private children: AdView[] = [];

    constructor(props: ViewCarouselDesign["props"]) {
        super(props);

        this.state = { activeIndex: 0 }
    }

    ref(element: HTMLElement | null, args: EditorPageContextValue) {
        if (!element) return

        new Sortable(element, {
            filter: `.${SLICK_NORMAL}`,
            onEnd: (evt) => {
                debugger
                args.changeScreenIndex(evt.oldIndex || 0, evt.newIndex || 0)
            }
        })
    }

    render(): React.ReactNode {
        let children = componentChildrenArray(this.props.children);
        if (children.length == 0) {
            return <Empty description="请点击“添加”按钮添加屏幕"></Empty>
        }
        return <EditorPageContext.Consumer>
            {args => {
                return <ComponentRelateion.Provider value={{ parent: this, children: this.children }}>
                    <div className="ant-carousel">
                        <ul className="slick-dots slick-dots-bottom" style={{ display: "block", position: "unset" }}
                            ref={e => this.ref(e, args)}>
                            {children.map((c, i) => <li key={i} className={args.screenIndex == i ? "slick-active" : SLICK_NORMAL}
                                title={args.screenIndex == i ? strings.tabSortable : ""}>
                                <button onClick={() => args.setActiveScreenIndex(i)}>{i}</button>
                            </li>)}
                        </ul>
                    </div>
                    {children.map((c, i) => <div key={`${c.key}`} style={{ display: args.screenIndex == i ? "" : "none" }}>{c}</div>)}
                </ComponentRelateion.Provider>
            }}
        </EditorPageContext.Consumer>


    }
}