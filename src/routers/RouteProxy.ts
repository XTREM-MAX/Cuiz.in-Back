import Route from './Route';
import fetch from "node-fetch";
import { AES } from "crypto-js";
import { resolve as resolveURL } from "url";

abstract class RouteProxy extends Route {
  
  protected async proxyPOSTRequest<RequestData, ResponseData>(path: string, payload: RequestData): Promise<ResponseData> {

    const res = await fetch(resolveURL("https://api.nutriwi.com/v1/", path), {
      method: "POST",
      headers: {
        "x-api-key": this.getAPIKey("post", "recipes/search"),
        "Origin": "https://www.nutriwi.com",
        "content-type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify(payload)
    });

    return await res.json()
  }

  protected async proxyGETRequest<ResponseData>(path: string): Promise<ResponseData> {
    
    const res = await fetch(resolveURL("https://api.nutriwi.com/v1/", path), {
      method: "GET",
      headers: {
        "x-api-key": this.getAPIKey("get", path),
        "Origin": "https://www.nutriwi.com",
        "content-type": "application/json;charset=UTF-8"
      }
    });
    return await res.json()
  }

  private getAPIKey(method: "post"|"get", url: string): string {
    const aesQuery = {
      timestamp: Date.now(),
      baseURL: "https://api.nutriwi.com/v1/",
      url: url,
      appId: "FlNma0ZUwyzYhADjheLm-Gmo9sE3OgibNLxEalwVv-lptOe9h4LkEFSoa1e958",
      method: method
    }
    return AES.encrypt(JSON.stringify(aesQuery), "sq5lxSsDyzxWla5G-UTSFATZskrxbJmHsimvKCr1uEB8-8j93WPaZiRdYFL3nwFA9k").toString()
  }

}

export default RouteProxy;