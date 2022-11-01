import React from "react";
import { AdView } from "../ad-views/ad-view";
import { componentChildrenArray, componentSelected, ComponentRelateion, EditorPageContext } from "../common";
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

    private children: AdView[] = [];

    constructor(props: ViewCarouselDesign["props"]) {
        super(props);

        this.state = { activeIndex: 0 }
    }

    activeItem(index: number) {
        this.children[this.state.activeIndex].setVisible(false);
        let view = this.children[index];
        view.setVisible(true);
        this.setState({ activeIndex: index });
        componentSelected.fire({ id: view.props.id, component: view });
    }

    nextScreen() {
        let activeIndex = this.state.activeIndex + 1;
        if (activeIndex > this.children.length - 1)
            activeIndex = 0;

        this.activeItem(activeIndex);
    }

    previousScreen() {
        let activeIndex = this.state.activeIndex - 1;
        if (activeIndex < 0)
            activeIndex = this.children.length - 1;

        this.activeItem(activeIndex);
    }

    get screensCount() {
        return this.children.length;
    }

    componentDidMount(): void {
        let child = this.children[this.state.activeIndex];
        if (child) {
            child.setVisible(true);
        }
    }

    render(): React.ReactNode {
        let children = componentChildrenArray(this.props.children);
        let { activeIndex } = this.state;

        return <ComponentRelateion.Provider value={{ parent: this, children: this.children }}>
            <div className="ant-carousel">
                <ul className="slick-dots slick-dots-bottom" style={{ display: "block", position: "unset" }}>
                    {children.map((c, i) => <li key={i} className={activeIndex == i ? "slick-active" : ""}>
                        <button onClick={() => this.activeItem(i)}>{i}</button>
                    </li>)}
                </ul>
            </div>
            {children.map((c, i) => <div key={c.key}>{c}</div>)}
            <EditorPageContext.Consumer>
                {args => {
                    if (args.setCarousel) {
                        args.setCarousel(this);
                    }
                    return <></>
                }}
            </EditorPageContext.Consumer>

        </ComponentRelateion.Provider>

    }
}