const baseUrl = 'http://127.0.0.1:5000/api'

interface ErrorType {
  message: string;
}

export async function api<T> (url: string, config: RequestInit): Promise<T> {
  return await fetch(baseUrl + url, config)
    .then(async response => {
      if (!response.ok) {
        return await response.json().then(async (val: ErrorType) => await Promise.reject(val.message));
      }
      return await (response.json() as Promise<T>)
    })
}
