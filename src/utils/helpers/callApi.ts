import { $axios } from '@/libs/axios'
import type { PathParameters, RequestBody, Response } from '@/types'
import type { paths } from '@/types/openapi/autoGenerated'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

type HttpMethod = {
  [K in keyof paths]: keyof paths[K]
}[keyof paths]

type CustomAxiosRequestConfig<
  Path extends keyof paths,
  Method extends keyof paths[Path] & HttpMethod
> = AxiosRequestConfig & {
  url: Path
  method: Method
  data?: RequestBody<Path, Method>
} & (paths[Path][Method] extends {
    parameters: {
      path: PathParameters<Path, Method>
    }
  }
    ? { pathParameters: PathParameters<Path, Method> }
    : { pathParameters?: undefined })

/**
 * 汎用APIコール関数
 */
export const apiRequest = async <
  Path extends keyof paths,
  Method extends keyof paths[Path] & HttpMethod
>(
  config: CustomAxiosRequestConfig<Path, Method>
) => {
  const { url, pathParameters, ...baseConfig } = config

  const requestConfig: AxiosRequestConfig = {
    ...baseConfig,
    url: replaceUrlPaths(url, pathParameters),
  }

  return await $axios.request<
    Response<Path, Method>,
    AxiosResponse<Response<Path, Method>>,
    CustomAxiosRequestConfig<Path, Method>['data']
  >(requestConfig)
}

/**
 * URLのパスパラメータを置換する
 */
const replaceUrlPaths = <
  Path extends keyof paths,
  Method extends keyof paths[Path] & HttpMethod
>(
  url: Path,
  pathParameters?: PathParameters<Path, Method>
) => {
  if (!pathParameters) return url

  return Object.entries(pathParameters).reduce((prevUrl, [key, value]) => {
    if (value === null) return prevUrl
    return prevUrl.replace(`{${key}}`, String(value))
  }, url as string)
}
