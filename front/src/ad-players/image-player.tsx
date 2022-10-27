import React from "react";
import { AdPlayer, AdPlayerProps } from "./ad-player";
import { Carousel } from "./image-player/carousel";
import "./image-player.scss";

interface Props extends AdPlayerProps {
    imagePaths: string[]
}

export default class ImagePlayer extends AdPlayer<Props> {

    private carouselElement: HTMLElement;
    private carousel: Carousel;

    play() {
        if (!this.carousel)
            return;

        this.carousel.play();
    }

    pause() {
        if (!this.carousel)
            return;

        this.carousel.stop();
    }

    render() {
        let imagePaths = this.props.imagePaths;
        if (imagePaths.length == 0) {
            return <></>
        }
        if (imagePaths.length == 1) {
            return <img className="player-image" src={imagePaths[0]} />
        }
        return <div className="carousel slide" ref={e => {
            if (!e || this.carouselElement)
                return;

            this.carouselElement = e;
            this.carousel = new Carousel(this.carouselElement, { autoplay: true })
        }}>
            <ol className="carousel-indicators">
                {this.props.imagePaths.map((o, i) =>
                    <li key={i}></li>
                )}
            </ol>
            <div className="carousel-inner">
                {imagePaths.map((o, i) =>
                    <div key={i} className="item">
                        <img className="player-image" src={o} />
                    </div>)}
            </div>
        </div>
    }

}