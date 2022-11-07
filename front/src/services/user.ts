import { message } from "antd"
import { supportMediaTypes } from "../common"
import request from "../utils/http"

/**
 * 登录
 * @date 2022-11-04
 * @param {string} values:{username:string
 * @param {string} password:string}
 * @returns {token:string}
 */
export const login = async (values: { username: string, password: string }): Promise<{ token: string }> => {
  return request('/api/user/login', {
    method: 'POST',
    body: values as any
  })
}

/**
 * 获取所有上传列表
 * @date 2022-11-04
 * @param {"video"|"image"} type?:"video"|"image"
 * @returns {string[]}
 */
export const getAllList = async (type?: "video" | "image"): Promise<string[]> => {
  const res: string[] = await request('/api/media/list', {
    method: 'GET'
  })
  let data: string[] = []

  switch (type) {
    case "image":
      data = res.filter(item => {
        let arr = item.split(".");
        let fileType = arr[arr.length - 1];
        let r = supportMediaTypes.image.indexOf(fileType) >= 0;
        return r;
      });
      break;
    case "video":
      data = res.filter(item => {
        let arr = item.split(".");
        let fileType = arr[arr.length - 1];
        let r = supportMediaTypes.video.indexOf(fileType) >= 0;
        return r;
      });
      break
    default:
      data = []
      break
  }
  return data
}

export const uploadFile = async (file: any): Promise<{ token: string }> => {
  let data = null;
  try {
    const res = await fetch('/api/media/upload', {
      method: 'POST',
      body: file
    })
    data = await res.json()
  } catch (err: any) {
    message.error(err.massge)
  }
  return data
}
