/**
 * 正の全角整数を半角整数に変換する。また、数値以外の文字や記号も取り除く。
 */
export const convertToInteger = (
  value: string | number,
  maxNumber: number,
  allowZero = true
): number | '' => {
  // 全角数値を半角数値に変換する
  const stringValue = String(value).replace(/[０-９]/g, (s: string) => {
    return String.fromCharCode(s.charCodeAt(0) - 65248).replace(/[^0-9]/g, '')
  })

  // 0以上の整数に合致するかどうかを判別する
  if (!stringValue.match(/^[1-9]\d*$|^0$/)) return ''

  // 値の検証を行う
  const integerValue = Number(stringValue)
  if (!allowZero && integerValue === 0) return ''
  if (integerValue > maxNumber) return maxNumber

  return integerValue
}

/**
 * 小数点を切り捨てる、また、nullや負の数には初期値を返していく
 */
export const numberToInt = (value: number | '', defaultValue = 0) => {
  if (value === '' || value < defaultValue) {
    return defaultValue
  } else {
    return Math.floor(Number(value))
  }
}

/**
 * 代入する値を検証して返す
 */
export const valueVerification = (value: number, max: number) => {
  if (value > max) return max
  if (value <= 0) return ''
  return Math.floor(value)
}
