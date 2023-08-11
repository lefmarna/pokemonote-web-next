/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/api/v2/init/fetch': {
    /** 静的データ取得API */
    get: {
      responses: {
        200: components['responses']['StaticDataResponse']
      }
    }
  }
  '/api/v2/pokemons': {
    /** ポケモン一覧API */
    get: {
      responses: {
        200: components['responses']['PokemonIndexResponse']
      }
    }
  }
  '/api/v2/pokemons/{id}': {
    /** ポケモン詳細API */
    get: {
      parameters: {
        path: {
          id: number
        }
      }
      responses: {
        200: components['responses']['PokemonShowResponse']
      }
    }
  }
  '/api/v2/pokemons/{id}/edit': {
    /** ポケモン編集API */
    get: {
      parameters: {
        path: {
          id: number
        }
      }
      responses: {
        200: components['responses']['PokemonEditResponse']
      }
    }
  }
}

export type webhooks = Record<string, never>

export interface components {
  schemas: {
    PokemonBasicInfo: {
      /**
       * @description 図鑑No
       * @example 194
       */
      no: number
      /**
       * @description ポケモン名
       * @example ウパー(パルデア)
       */
      name: string
      /**
       * @description フォルム
       * @example パルデアのすがた
       */
      form: string
      /**
       * @description 対戦の参加ランク
       * @example [
       *   "NotInPokedex",
       *   "sv"
       * ]
       */
      ranks: readonly (
        | 'legendary'
        | 'mythical'
        | 'mega'
        | 'sv'
        | 'NotInPokedex'
      )[]
      /**
       * @description 進化先の図鑑No
       * @example [
       *   980
       * ]
       */
      evolutions: readonly number[]
      /** @description 種族値 */
      baseStats: {
        /**
         * @description HP
         * @example 55
         */
        readonly hp: number
        /**
         * @description 攻撃
         * @example 45
         */
        readonly attack: number
        /**
         * @description 防御
         * @example 45
         */
        readonly defense: number
        /**
         * @description 特攻
         * @example 25
         */
        readonly spAttack: number
        /**
         * @description 特防
         * @example 25
         */
        readonly spDefense: number
        /**
         * @description 素早さ
         * @example 15
         */
        readonly speed: number
      }
    }
    PokemonDetail: {
      /**
       * @description ポケモン名
       * @example アーケオス
       */
      pokemonName: string
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
       * @description レベル
       * @example 50
       */
      level: number | null
      /** @description 個体値 */
      ivs: {
        /**
         * @description HP
         * @example 31
         */
        hp: number | null
        /**
         * @description 攻撃
         * @example 31
         */
        attack: number | null
        /**
         * @description 防御
         * @example 31
         */
        defense: number | null
        /**
         * @description 特攻
         * @example 31
         */
        spAttack: number | null
        /**
         * @description 特防
         * @example 31
         */
        spDefense: number | null
        /**
         * @description 素早さ
         * @example 31
         */
        speed: number | null
      }
      /** @description 努力値 */
      evs: {
        /**
         * @description HP
         * @example 252
         */
        hp: number | null
        /**
         * @description 攻撃
         * @example 156
         */
        attack: number | null
        /**
         * @description 防御
         * @example 4
         */
        defense: number | null
        /**
         * @description 特攻
         * @example 0
         */
        spAttack: number | null
        /**
         * @description 特防
         * @example 12
         */
        spDefense: number | null
        /**
         * @description 素早さ
         * @example 84
         */
        speed: number | null
      }
      /**
       * @description ポケモンの説明
       * @example ○○の××確定耐え
       */
      description: string
    }
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
      level: number | null
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
    Nature: {
      /**
       * @description 性格名
       * @example いじっぱり
       * @enum {string}
       */
      name:
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
       * @description 上方補正ステータス
       * @example attack
       * @enum {string|null}
       */
      increasedStat:
        | 'hp'
        | 'attack'
        | 'defense'
        | 'spAttack'
        | 'spDefense'
        | 'speed'
        | null
      /**
       * @description 下降補正ステータス
       * @example spAttack
       * @enum {string|null}
       */
      decreasedStat:
        | 'hp'
        | 'attack'
        | 'defense'
        | 'spAttack'
        | 'spDefense'
        | 'speed'
        | null
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
    StaticDataResponse: {
      content: {
        'application/json': {
          data: {
            pokemonBasicInfos: components['schemas']['PokemonBasicInfo'][]
            natures: components['schemas']['Nature'][]
          }
        }
      }
    }
    /** @description OK */
    PokemonEditResponse: {
      content: {
        'application/json': {
          data: components['schemas']['PokemonDetail']
        }
      }
    }
    /** @description OK */
    PokemonIndexResponse: {
      content: {
        'application/json': {
          /** @description ポケモン一覧 */
          data: components['schemas']['PokemonSummary'][]
        }
      }
    }
    /** @description OK */
    PokemonShowResponse: {
      content: {
        'application/json': {
          data: {
            /**
             * @description ポケモンの説明
             * @example ○○の××確定耐え
             */
            description: string
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
            level: number | null
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
