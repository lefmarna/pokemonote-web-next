import axios, { AxiosError } from 'axios'

const $axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
})

export { $axios, AxiosError }
