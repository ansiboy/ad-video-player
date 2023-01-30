/**
 * 图片路径
 * @date 2022-11-07
 * @param {any} mediaPath:string
 * @returns {any}
 */
export const mediaPath = (mediaPath: string): string => {
    if (mediaPath.startsWith("/medias/")) {
        return mediaPath;
    }

    return `/medias/${mediaPath}`
}