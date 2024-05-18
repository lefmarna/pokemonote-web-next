import axios, { AxiosError, isAxiosError } from 'axios'

const $axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
})

export { $axios, AxiosError, isAxiosError }
