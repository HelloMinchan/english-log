import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const instance: AxiosInstance = axios.create({
  timeout: 3000,
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log(error)
  }
)

export default async function <T>(args: AxiosRequestConfig): Promise<T> {
  const { data } = await instance(args)
  return data
}
