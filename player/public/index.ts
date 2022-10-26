const second = 1000;
const playItemSeconds: number[] = [10, 15, 12];
const elementIdBase = "play-item";
let currentIndex = 0;

let playSeconds = 0;
setInterval(() => {
    playSeconds = playSeconds + 1;
    if (playSeconds == playItemSeconds[currentIndex]) {
        pause(currentIndex);
        playSeconds = 0;
        currentIndex = currentIndex + 1;
        if (currentIndex > playItemSeconds.length - 1) {
            currentIndex = 0;
        }

        play(currentIndex);
    }

}, second)

play(currentIndex);

function play(index: number) {
    let element = getPlayItemElement(index);
    element.style.display = "flex";
    element.querySelectorAll("video").forEach(videoElement => {
        videoElement.play();
    })
}

function pause(index: number) {
    let element = getPlayItemElement(index);
    element.style.display = "none";
    element.querySelectorAll("video").forEach(videoElement => {
        videoElement.pause();
    })
}

function getPlayItemElement(index: number) {
    let elementId = elementIdBase + index;
    let element = document.getElementById(elementId);
    console.assert(element != null);
    return element;
}