export class Screen {
    type: string
    props: {
        playSeconds: number,
        children?: any[]
    }
}

interface ImagePlayer {
    type: "ImagePlayer",
    props: {
        imagePaths: string[]
    }
}