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
export const numberToInt = (value: number | null, defaultValue = 0): number => {
  if (String(value) === '' || Number(value) < defaultValue) {
    return defaultValue
  } else {
    return Math.floor(Number(value))
  }
}
