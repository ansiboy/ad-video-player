/**
 * 图片路径
 * @date 2022-11-07
 * @param {any} imagePath:string
 * @returns {any}
 */
export const imagePath = (imagePath: string): string => {
    if (imagePath.startsWith("/medias/"))
        return imagePath;

    return `/medias/${imagePath}`
}