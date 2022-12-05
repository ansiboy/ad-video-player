import { message } from "antd"
import { supportMediaTypes } from "../common"
import { ComponentData } from "../component-parse"
import request from "../utils/http"

/**
 * 登录
 * @date 2022-11-04
 * @param {string} values:{username:string, password:string}
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

export const uploadFile = async (file: any) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      let data = null;
      const res = await fetch('/api/media/upload', {
        method: 'POST',
        body: file
      })
      data = await res.json();
      if (res.status !== 200) {
        message.error(data.message)
        return
      }
      resolve(data);
    } catch (err: any) {
      message.error(err.massge)
      reject(err);
    }
  })

}

/** 
 * 获取页面数据 
 */
export const getPageData = async (): Promise<ComponentData> => {
  const data = await request<ComponentData>("/api/pageData/get", {});
  return data;
}

/**
 * 保存页面数据
 * @param pageData 页面数据
 */
export const savePageData = async (pageData: ComponentData) => {
  await request("/api/pageData/save", { method: "POST", body: { pageData } as any });
}

export const getRemoteControl = async () => {
  let r = await request<boolean>("/api/remoteControl/get", {});
  return r;
}

export const setRemoteControl = async (value: boolean) => {
  await request("/api/remoteControl/set", { body: { value } as any });
}


/**
 * 删除文件
 * @date 2022-11-09
 * @param {文件名称} value:string
 * @returns {any}
 */
export const deleteFile = async (value: string): Promise<{ status: number }> => {
  return request<{ status: number }>("/api/media/delete", { method: "POST", body: { name: value } as any });
}

/**
 * 开启远程控制
 * @date 2022-11-09
 * @returns {}
 */
export const startRemoteController = (): Promise<{ status: number }> => {
  return request<{ status: number }>("/api/remoteControl/start", { method: "GET" })
}

/**
 * 关闭远程控制
 * @date 2022-11-09
 * @returns {}
 */
export const stopRemoteController = (): Promise<{ status: number }> => {
  return request<{ status: number }>("/api/remoteControl/stop", { method: "GET" })
}