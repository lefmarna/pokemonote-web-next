import axios, { AxiosError, isAxiosError } from 'axios'

const $axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  withCredentials: true,
})

$axios.interceptors.request.use((config) => {
  const xsrfToken =
    document.cookie
      .split('; ')
      .find((row) => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1] ?? ''
  $axios.defaults.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken)

  return config
})

export { $axios, AxiosError, isAxiosError }
