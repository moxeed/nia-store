import {useEffect} from "react";

export const safeFetch = (url: string, body?: any): [Promise<any>, () => void] => {
    let active = true
    const request = body ?
        fetch(url, {
            body, method: "POST", headers: {
                ["Content-Type"]: "application/json",
                ["Cache-Control"]: "no-cache"
            }
        }) :
        fetch(url, {})

    const cancel = () => active = false;

    return [new Promise((resolve, reject) => {
        request
            .then(res => res.json())
            .then((res) => {
                if (active)
                    resolve(res)
            })
            .catch(reject)
    }), cancel]
}

export const useApi = ({
                           url,
                           body,
                           callback
                       }: { url: string, body?: any, callback: (res: any) => void }, deps: Array<any>) => {
    return useEffect(() => {
        const [result, cancel] = safeFetch(url, body)
        result.then(callback)
        return cancel
    }, deps)
}