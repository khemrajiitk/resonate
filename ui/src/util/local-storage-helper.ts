export const setDataInLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data))
}

export const getDataInLocalStorage = <T>(key: string, defaultReq: T): T => {
    const dataString = localStorage.getItem(key);
    if (dataString && dataString.length > 0) {
        const data = JSON.parse(dataString) as T
        return data
    }
    return defaultReq
}