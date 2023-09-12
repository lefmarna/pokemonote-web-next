import { $axios } from '@/libs/axios'
import type {
  OpenApiMethod,
  OpenApiPath,
  ParameterProperties,
  PathParameter,
  QueryParameter,
  RequestBodyProperties,
  Response,
} from '@/types/openapi/extractor'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

type CustomAxiosRequestConfig<
  Path extends OpenApiPath,
  Method extends OpenApiMethod<Path>,
> = Omit<AxiosRequestConfig, 'data'> & {
  url: Path
  method: Method
} & RequestBodyProperties<Path, Method> &
  ParameterProperties<Path, Method, PathParameter<Path, Method>, 'path'> &
  ParameterProperties<Path, Method, QueryParameter<Path, Method>, 'query'>

/**
 * 汎用APIコール関数
 */
export const requestOpenApi = async <
  Path extends OpenApiPath,
  Method extends OpenApiMethod<Path>,
>(
  config: CustomAxiosRequestConfig<Path, Method>
) => {
  const { url, path, query, ...baseConfig } = config

  const requestConfig = {
    ...baseConfig,
    url: addUrlQueries(replaceUrlPaths(url, path), query),
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
export const replaceUrlPaths = <
  Path extends OpenApiPath,
  Method extends OpenApiMethod<Path>,
>(
  url: Path,
  path?: PathParameter<Path, Method>
) => {
  if (!path) return url

  return Object.entries(path).reduce((prevUrl, [key, value]) => {
    if (value === null) return prevUrl
    return prevUrl.replace(`{${key}}`, String(value))
  }, url as string)
}

/**
 * URLのクエリパラメータを付与する
 */
export const addUrlQueries = <
  Path extends OpenApiPath,
  Method extends OpenApiMethod<Path>,
>(
  url: string,
  query?: QueryParameter<Path, Method>
) => {
  if (!query) return url

  const queries = Object.entries(query)
    .filter(([, value]) => value !== null && value !== undefined)
    .map(([key, value]) => {
      return `${key}=${encodeURIComponent(String(value))}`
    })

  if (queries.length === 0) return url

  return `${url}?${queries.join('&')}`
}
