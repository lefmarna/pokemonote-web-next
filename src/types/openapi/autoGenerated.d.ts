/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/api/v2/pokemons': {
    /** ポケモン一覧API */
    get: {
      responses: {
        200: components['responses']['PokemonIndexResponse']
      }
    }
  }
}

export type webhooks = Record<string, never>

export interface components {
  schemas: {
    PokemonSummary: {
      /**
       * @description ID
       * @example 1
       */
      id: number
      /**
       * @description ポケモン名
       * @example アーケオス
       */
      pokemonName: string
      /**
       * @description レベル
       * @example 50
       */
      lv: number | null
      /**
       * @description 性格名
       * @example がんばりや
       * @enum {string}
       */
      natureName:
        | 'いじっぱり'
        | 'うっかりや'
        | 'おくびょう'
        | 'おだやか'
        | 'おっとり'
        | 'おとなしい'
        | 'がんばりや'
        | 'きまぐれ'
        | 'さみしがり'
        | 'しんちょう'
        | 'すなお'
        | 'ずぶとい'
        | 'せっかち'
        | 'なまいき'
        | 'てれや'
        | 'のうてんき'
        | 'のんき'
        | 'ひかえめ'
        | 'まじめ'
        | 'むじゃき'
        | 'やんちゃ'
        | 'ゆうかん'
        | 'ようき'
        | 'れいせい'
        | 'わんぱく'
      /**
       * @description ステータス
       * @example 150-160-85-132-85-130
       */
      stats: string
      /**
       * @description 努力値の合計
       * @example 508
       */
      sumEffortValue: number
      user: components['schemas']['user']
    }
    /** @description ユーザー */
    user: {
      /**
       * @description ユーザー名
       * @example test
       */
      username: string
      /**
       * @description 表示名
       * @example テスト
       */
      nickname: string
    }
  }
  responses: {
    /** @description OK */
    PokemonIndexResponse: {
      content: {
        'application/json': {
          /** @description ポケモン一覧 */
          data: components['schemas']['PokemonSummary'][]
        }
      }
    }
  }
  parameters: never
  requestBodies: never
  headers: never
  pathItems: never
}

export type external = Record<string, never>

export type operations = Record<string, never>
