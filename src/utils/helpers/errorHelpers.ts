import { isAxiosError } from 'axios'
import type { AxiosError } from 'axios'

/**
 * エラーメッセージ一覧（エラーメッセージ）
 */
const EXCEPTION_ERROR_MESSAGE =
  'システムエラーにより処理が失敗しました。時間を置いて再度お試しください。'

/**
 * try/catchのcatch内で使用。エラーメッセージを配列にして返す。
 */
export const exceptionErrorToArray = (
  error: unknown,
  expectedStatusCodes: number[] = []
) => {
  if (!isAxiosError(error)) return [EXCEPTION_ERROR_MESSAGE]

  if (
    expectedStatusCodes.length &&
    !expectedStatusCodes.includes(error.response?.status ?? 500)
  ) {
    return [EXCEPTION_ERROR_MESSAGE]
  }

  return formatAxiosError(error.response?.data.errors)
}

/**
 * Axiosのエラーを配列にして返す
 */
const formatAxiosError = (errorsResponse: AxiosError) => {
  const errorList: string[] = []
  if (!errorsResponse) return errorList
  Object.values(errorsResponse).forEach((errors) => {
    errorList.push(errors[0])
  })
  return errorList
}
