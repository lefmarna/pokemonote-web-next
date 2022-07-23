import { Autocomplete, FilterOptionsState, TextField } from '@mui/material'
import { SyntheticEvent } from 'react'

type Props<T extends { name: string }> = {
  options: T[]
  label: string
  itemName: string
  selectedItem: T | null
  disableClearable?: boolean
  onChange: (event: SyntheticEvent<Element, Event>, value: T | null) => void
}

export const SearchField = <T extends { name: string }>(props: Props<T>) => {
  const { options, label, itemName, selectedItem, onChange, disableClearable = false } = props

  /**
   * ローマ字の変換表
   */
  const romanConversionTable = {
    a: 'ア',
    i: 'イ',
    u: 'ウ',
    e: 'エ',
    o: 'オ',
    k: {
      a: 'カ',
      i: 'キ',
      u: 'ク',
      e: 'ケ',
      o: 'コ',
      y: { a: 'キャ', i: 'キィ', u: 'キュ', e: 'キェ', o: 'キョ' },
    },
    s: {
      a: 'サ',
      i: 'シ',
      u: 'ス',
      e: 'セ',
      o: 'ソ',
      h: { a: 'シャ', i: 'シ', u: 'シュ', e: 'シェ', o: 'ショ' },
      y: { a: 'キャ', i: 'キィ', u: 'キュ', e: 'キェ', o: 'キョ' },
    },
    t: {
      a: 'タ',
      i: 'チ',
      u: 'ツ',
      e: 'テ',
      o: 'ト',
      h: { a: 'テャ', i: 'ティ', u: 'テュ', e: 'テェ', o: 'テョ' },
      y: { a: 'チャ', i: 'チィ', u: 'チュ', e: 'チェ', o: 'チョ' },
      s: { a: 'ツァ', i: 'ツィ', u: 'ツ', e: 'ツェ', o: 'ツォ' },
    },
    c: {
      a: 'カ',
      i: 'シ',
      u: 'ク',
      e: 'セ',
      o: 'コ',
      h: { a: 'チャ', i: 'チ', u: 'チュ', e: 'チェ', o: 'チョ' },
      y: { a: 'チャ', i: 'チィ', u: 'チュ', e: 'チェ', o: 'チョ' },
    },
    q: {
      a: 'クァ',
      i: 'クィ',
      u: 'ク',
      e: 'クェ',
      o: 'クォ',
    },
    n: {
      a: 'ナ',
      i: 'ニ',
      u: 'ヌ',
      e: 'ネ',
      o: 'ノ',
      n: 'ン',
      y: { a: 'ニャ', i: 'ニィ', u: 'ニュ', e: 'ニェ', o: 'ニョ' },
    },
    h: {
      a: 'ハ',
      i: 'ヒ',
      u: 'フ',
      e: 'ヘ',
      o: 'ホ',
      y: { a: 'ヒャ', i: 'ヒィ', u: 'ヒュ', e: 'ヒェ', o: 'ヒョ' },
    },
    f: {
      a: 'ファ',
      i: 'フィ',
      u: 'フ',
      e: 'フェ',
      o: 'フォ',
      y: { a: 'フャ', u: 'フュ', o: 'フョ' },
    },
    m: {
      a: 'マ',
      i: 'ミ',
      u: 'ム',
      e: 'メ',
      o: 'モ',
      y: { a: 'ミャ', i: 'ミィ', u: 'ミュ', e: 'ミェ', o: 'ミョ' },
    },
    y: { a: 'ヤ', i: 'イ', u: 'ユ', e: 'イェ', o: 'ヨ' },
    r: {
      a: 'ラ',
      i: 'リ',
      u: 'ル',
      e: 'レ',
      o: 'ロ',
      y: { a: 'リャ', i: 'リィ', u: 'リュ', e: 'リェ', o: 'リョ' },
    },
    w: { a: 'ワ', i: 'ウィ', u: 'ウ', e: 'ウェ', o: 'ヲ' },
    g: {
      a: 'ガ',
      i: 'ギ',
      u: 'グ',
      e: 'ゲ',
      o: 'ゴ',
      y: { a: 'ギャ', i: 'ギィ', u: 'ギュ', e: 'ギェ', o: 'ギョ' },
    },
    z: {
      a: 'ザ',
      i: 'ジ',
      u: 'ズ',
      e: 'ゼ',
      o: 'ゾ',
      y: { a: 'ジャ', i: 'ジィ', u: 'ジュ', e: 'ジェ', o: 'ジョ' },
    },
    j: {
      a: 'ジャ',
      i: 'ジ',
      u: 'ジュ',
      e: 'ジェ',
      o: 'ジョ',
      y: { a: 'ジャ', i: 'ジィ', u: 'ジュ', e: 'ジェ', o: 'ジョ' },
    },
    d: {
      a: 'ダ',
      i: 'ヂ',
      u: 'ヅ',
      e: 'デ',
      o: 'ド',
      h: { a: 'デャ', i: 'ディ', u: 'デュ', e: 'デェ', o: 'デョ' },
      y: { a: 'ヂャ', i: 'ヂィ', u: 'ヂュ', e: 'ヂェ', o: 'ヂョ' },
    },
    b: {
      a: 'バ',
      i: 'ビ',
      u: 'ブ',
      e: 'ベ',
      o: 'ボ',
      y: { a: 'ビャ', i: 'ビィ', u: 'ビュ', e: 'ビェ', o: 'ビョ' },
    },
    v: {
      a: 'ヴァ',
      i: 'ヴィ',
      u: 'ヴ',
      e: 'ヴェ',
      o: 'ヴォ',
      y: { a: 'ヴャ', i: 'ヴィ', u: 'ヴュ', e: 'ヴェ', o: 'ヴョ' },
    },
    p: {
      a: 'パ',
      i: 'ピ',
      u: 'プ',
      e: 'ペ',
      o: 'ポ',
      y: { a: 'ピャ', i: 'ピィ', u: 'ピュ', e: 'ピェ', o: 'ピョ' },
    },
    x: {
      a: 'ァ',
      i: 'ィ',
      u: 'ゥ',
      e: 'ェ',
      o: 'ォ',
      y: {
        a: 'ャ',
        i: 'ィ',
        u: 'ュ',
        e: 'ェ',
        o: 'ョ',
      },
      t: {
        u: 'ッ',
        s: {
          u: 'ッ',
        },
      },
    },
    l: {
      a: 'ァ',
      i: 'ィ',
      u: 'ゥ',
      e: 'ェ',
      o: 'ォ',
      y: {
        a: 'ャ',
        i: 'ィ',
        u: 'ュ',
        e: 'ェ',
        o: 'ョ',
      },
      t: {
        u: 'ッ',
        s: {
          u: 'ッ',
        },
      },
    },
  } as const

  const filterOptions = <T extends { name: string }>(
    options: Array<T>,
    state: FilterOptionsState<T>
  ) => {
    return options.filter((option) => {
      const itemName = option.name.replace(/[ぁ-ん]/g, (t: string) =>
        String.fromCharCode(t.charCodeAt(0) + 96)
      )
      let katakana = state.inputValue
        .replace(/[ぁ-ん]/g, (t) => String.fromCharCode(t.charCodeAt(0) + 96))
        .replace(/[-]/g, 'ー')
        .replace(/[（]/g, '(')
        .replace(/[）]/g, ')')
      // 入力されたローマ字を全てカタカナに書き換える
      katakana = convertRomanToKana(katakana)
      // 部分一致でフィルタリングする
      return (itemName || '').includes(katakana)
    })
  }

  /**
   * ローマ字をカタカナに変換する関数
   */
  const convertRomanToKana = (text: string) => {
    const lowerCaseText = text.toLowerCase() // 大文字を小文字に変更
    let result = '' // 最終的に返すテキストを格納していく変数
    let tmp = '' // 子音のみが入力されている状態など、カタカナに変換できない場合に一時的に格納しておくための変数

    // FIXME: 適切な型をつけよう
    let node: any = romanConversionTable

    const push = (char: string, toRoot = true) => {
      result += char
      tmp = ''
      if (toRoot) {
        node = romanConversionTable
      }
    }

    for (let i = 0, len = lowerCaseText.length; i < len; i++) {
      const char = lowerCaseText.charAt(i) // i番目の文字をcharに格納する
      if (char.match(/[a-z]/)) {
        // charがアルファベットならばカタカナへの変換を行い、nextへ格納する
        if (char in node) {
          const next = node[char]
          if (typeof next === 'string') {
            push(next)
          } else {
            tmp += text.charAt(i)
            node = next
          }
          continue
        }
        const prev = lowerCaseText.charAt(i - 1)
        if (prev && (prev === 'n' || prev === char)) {
          // 促音やnへの対応
          push(prev === 'n' ? 'ン' : 'ッ', false)
        }
        if (node !== romanConversionTable && char in romanConversionTable) {
          // 今のノードがルート以外だった場合、仕切り直してチェックする
          push(tmp)
          i--
          continue
        }
      }
      push(tmp + char)
    }
    tmp = tmp.replace(/n$/, 'ン') // 末尾のnはンに変換する
    push(tmp)
    return result
  }

  return (
    <Autocomplete
      autoHighlight
      disableClearable={disableClearable}
      value={selectedItem}
      onChange={onChange}
      getOptionLabel={<T extends { name: string }>(option: T) => option.name}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      noOptionsText={`${itemName}が見つかりません。`}
      filterOptions={filterOptions}
      options={options}
      renderInput={(params) => <TextField {...params} label={label} variant="standard" />}
    />
  )
}
