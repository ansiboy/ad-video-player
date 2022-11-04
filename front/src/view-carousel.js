"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewCarouselContext = void 0;
const react_1 = __importDefault(require("react"));
const common_1 = require("./common");
const second = 1000;
exports.ViewCarouselContext = react_1.default.createContext({ views: [] });
/** 视图轮播 */
class ViewCarousel extends react_1.default.Component {
    playItemSeconds;
    children = [];
    constructor(props) {
        super(props);
        let children = (0, common_1.componentChildrenArray)(this.props.children);
        this.playItemSeconds = children.map(o => o.props).map(o => o.playSeconds);
        this.state = { currentIndex: props.activeIndex || 0 };
    }
    componentDidMount() {
        let currentIndex = this.state.currentIndex;
        let playSeconds = 0;
        setInterval(() => {
            playSeconds = playSeconds + 1;
            if (playSeconds == this.playItemSeconds[currentIndex]) {
                this.pause(currentIndex);
                playSeconds = 0;
                currentIndex = currentIndex + 1;
                if (currentIndex > this.playItemSeconds.length - 1) {
                    currentIndex = 0;
                }
                this.play(currentIndex);
            }
        }, second);
        this.play(currentIndex);
    }
    play(index) {
        let adView = this.getAdView(index);
        this.setState({ currentIndex: index });
        adView.play();
    }
    pause(index) {
        let adView = this.getAdView(index);
        adView.pause();
    }
    getAdView(index) {
        let adView = this.children[index];
        return adView;
    }
    render() {
        let children = (0, common_1.componentChildrenArray)(this.props.children);
        let { currentIndex } = this.state;
        return react_1.default.createElement(common_1.ComponentRelateion.Provider, { value: { parent: this, children: this.children } }, children.map((c, i) => react_1.default.createElement("div", { key: `${c.key}`, style: { display: currentIndex == i ? "" : "none" } }, c)));
    }
}
exports.default = ViewCarousel;
