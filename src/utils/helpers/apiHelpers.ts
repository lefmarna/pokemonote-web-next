import { $axios } from '@/libs/axios'
import type { paths } from '@/types/openapi/autoGenerated'
import type {
  PathParameters,
  QueryParameters,
  RequestBody,
  Response,
} from '@/types/openapi/extractor'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

type CustomAxiosRequestConfig<
  Path extends keyof paths,
  Method extends keyof paths[Path],
> = Omit<AxiosRequestConfig, 'data'> & {
  url: Path
  method: Method
} & (paths[Path][Method] extends {
    requestBody: {
      content: {
        'application/json': RequestBody<Path, Method>
      }
    }
  }
    ? { data: RequestBody<Path, Method> }
    : paths[Path][Method] extends {
        requestBody?: {
          content: {
            'application/json': infer Data
          }
        }
      }
    ? { data?: Data }
    : paths[Path][Method] extends {
        requestBody: {
          content: {
            'multipart/form-data': object
          }
        }
      }
    ? { data: FormData }
    : paths[Path][Method] extends {
        requestBody?: {
          content: {
            'multipart/form-data'?: object
          }
        }
      }
    ? { data?: FormData }
    : { data?: undefined }) &
  (paths[Path][Method] extends {
    parameters: { path: PathParameters<Path, Method> }
  }
    ? { pathParameters: PathParameters<Path, Method> }
    : paths[Path][Method] extends {
        parameters: { path?: PathParameters<Path, Method> }
      }
    ? { pathParameters?: PathParameters<Path, Method> }
    : { pathParameters?: undefined }) &
  (paths[Path][Method] extends {
    parameters: { query: QueryParameters<Path, Method> }
  }
    ? { queryParameters: QueryParameters<Path, Method> }
    : paths[Path][Method] extends {
        parameters: { query?: QueryParameters<Path, Method> }
      }
    ? { queryParameters?: QueryParameters<Path, Method> }
    : { queryParameters?: undefined })

/**
 * 汎用APIコール関数
 */
export const requestApi = async <
  Path extends keyof paths,
  Method extends keyof paths[Path],
>(
  config: CustomAxiosRequestConfig<Path, Method>
) => {
  const { url, pathParameters, queryParameters, ...baseConfig } = config

  const requestConfig = {
    ...baseConfig,
    url: addUrlQueries(replaceUrlPaths(url, pathParameters), queryParameters),
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
  Method extends keyof paths[Path],
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

/**
 * URLのクエリパラメータを付与する
 */
const addUrlQueries = <
  Path extends keyof paths,
  Method extends keyof paths[Path],
>(
  url: string,
  queryParameters?: QueryParameters<Path, Method>
) => {
  if (!queryParameters) return url

  const queries = Object.entries(queryParameters)
    .filter(([, value]) => value !== null || value !== undefined)
    .map(([key, value]) => {
      return `${key}=${encodeURIComponent(String(value))}`
    })

  if (queries.length === 0) return url

  return `${url}?${queries.join('&')}`
}