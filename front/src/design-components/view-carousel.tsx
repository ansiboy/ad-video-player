import { Carousel, Col, Row, Tabs } from "antd";
import React from "react";
import { componentChildrenArray } from "../common";
import { ViewCarouselProps } from "../view-carousel";
import "./view-carousel.scss";

const contentStyle: React.CSSProperties = {
    height: '450px',
    // color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

interface State {
    activeIndex: number
}

export default class ViewCarouselDesign extends React.Component<ViewCarouselProps, State> {

    constructor(props: ViewCarouselDesign["props"]) {
        super(props);

        this.state = { activeIndex: 0 }
    }

    activeItem(index: number) {
        this.props.data.views[this.state.activeIndex].setVisible(false);
        this.props.data.views[index].setVisible(true);
        this.setState({ activeIndex: index });
    }

    componentDidMount(): void {
        setTimeout(() => {
            this.props.data.views[this.state.activeIndex].setVisible(true);
        }, 1000)
    }

    render(): React.ReactNode {
        let children = componentChildrenArray(this.props.children);
        let { activeIndex } = this.state;
        return <>
            <div className="ant-carousel">
                <ul className="slick-dots slick-dots-bottom" style={{ display: "block", position: "unset" }}>
                    {children.map((c, i) => <li key={i} className={activeIndex == i ? "slick-active" : ""}>
                        <button onClick={() => this.activeItem(i)}>{i}</button>
                    </li>)}
                </ul>
            </div>
            {children.map((c, i) => <div key={c.key}>{c}</div>)}
        </>;

    }
}