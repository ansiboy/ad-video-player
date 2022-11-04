import { message } from "antd";
import { baseUrl } from "./config";

type FetchApi = RequestInit & { parms?: { [key: string]: string }, headers?: any }



//参数转换
const queryString = (params: { [key: string]: string }) => '?' + Object
  .keys(params)
  .map((key) => `${key}=${encodeURIComponent(params[key])}`)
  .join('&');


const request = async <T>(url: string, config: FetchApi): Promise<T> => {
  url = baseUrl + url;
  if (config.method === "GET" && config.parms) url = url + queryString(config.parms)
  if (config.method === "POST" && config.body) config.body = JSON.stringify(config.body)

  config.headers = config.headers || {};

  if (localStorage.getItem("token")) config.headers["token"] = localStorage.getItem("token") as string

  config.headers["content-type"] = "application/json"

  return new Promise((resolve, reject) =>
    fetch(url, config).then(async (res: any) => {
      const data = await res.json()
      if (res.status !== 200) {
        message.error(data.message)
        return
      }
      resolve(data)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  )
}


export default request