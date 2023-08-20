/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/api/v2/init/login': {
    /** ログイン状態確認API */
    get: {
      responses: {
        200: components['responses']['CheckLoginDataResponse']
      }
    }
  }
  '/api/v2/init/fetch': {
    /** 静的データ取得API */
    get: {
      responses: {
        200: components['responses']['StaticDataResponse']
      }
    }
  }
  '/api/v2/login': {
    /** ログインAPI */
    post: {
      requestBody: components['requestBodies']['LoginRequestBody']
      responses: {
        200: components['responses']['LoginResponse']
      }
    }
  }
  '/api/v2/logout': {
    /** ログアウトAPI */
    post: {}
  }
  '/api/v2/register/tentative': {
    /** アカウント仮登録API */
    post: {
      requestBody: components['requestBodies']['RegisterTentativeRequestBody']
      responses: {
        201: components['responses']['RegisterTentativeResponse']
      }
    }
  }
  '/api/v2/register/resend': {
    /** 認証メール再送信API */
    post: {
      requestBody: components['requestBodies']['RegisterResendRequestBody']
    }
  }
  '/api/v2/register/fetch': {
    /** 認証メール情報取得API */
    get: {
      responses: {
        200: components['responses']['RegisterFetchResponse']
      }
    }
  }
  '/api/v2/register/verify/{id}': {
    /** アカウント本登録API */
    get: {
      parameters: {
        query?: {
          /** @description 有効期限 */
          expires?: string
          /** @description 署名 */
          signature?: string
        }
        path: {
          /** @description ユーザーID */
          id: string
        }
      }
      responses: {
        200: components['responses']['EmailVerifyResponse']
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
    /** ポケモン保存API */
    post: {
      requestBody: components['requestBodies']['PokemonStoreRequestBody']
      responses: {
        201: components['responses']['PokemonStoreResponse']
      }
    }
  }
  '/api/v2/pokemons/{id}': {
    /** ポケモン詳細API */
    get: {
      parameters: {
        path: {
          id: string
        }
      }
      responses: {
        200: components['responses']['PokemonShowResponse']
      }
    }
    /** ポケモン更新API */
    put: {
      parameters: {
        path: {
          id: string
        }
      }
      requestBody: components['requestBodies']['PokemonUpdateRequestBody']
    }
    /** ポケモン削除API */
    delete: {
      parameters: {
        path: {
          id: string
        }
      }
    }
  }
  '/api/v2/pokemons/{id}/edit': {
    /** ポケモン編集API */
    get: {
      parameters: {
        path: {
          id: string
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
    /** @description 認証ユーザー */
    AuthUser: {
      /**
       * @description ユーザーID
       * @example 1
       */
      id: number
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
      /**
       * @description メールアドレス
       * @example test@test.com
       */
      email: string
      /**
       * @description 認証済みかどうか
       * @example true
       */
      isAuthenticated: boolean
    }
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
      user: components['schemas']['User']
    }
    PokemonPostParams: {
      /**
       * @description ポケモン名
       * @example アーケオス
       */
      name: string
      /**
       * @description 性格名
       * @example がんばりや
       * @enum {string}
       */
      nature:
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
      /** @description 実数値 */
      realNumbers: {
        /**
         * @description HP
         * @example 182
         */
        hp: number
        /**
         * @description 攻撃
         * @example 180
         */
        attack: number
        /**
         * @description 防御
         * @example 86
         */
        defense: number
        /**
         * @description 特攻
         * @example 132
         */
        spAttack: number
        /**
         * @description 特防
         * @example 87
         */
        spDefense: number
        /**
         * @description 素早さ
         * @example 141
         */
        speed: number
      }
      /**
       * @description ポケモンの説明
       * @example ○○の××確定耐え
       */
      description: string
      /**
       * @description 公開設定
       * @example true
       */
      isPublic: boolean
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
    User: {
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
    EmailVerifyResponse: {
      content: {
        'application/json': {
          data: components['schemas']['AuthUser']
        }
      }
    }
    /** @description OK */
    LoginResponse: {
      content: {
        'application/json': {
          data: components['schemas']['AuthUser']
        }
      }
    }
    /** @description OK */
    RegisterTentativeResponse: {
      content: {
        'application/json': {
          data: {
            /**
             * @description メールアドレス
             * @example test@test.com
             */
            email: string
          }
        }
      }
    }
    /** @description OK */
    RegisterFetchResponse: {
      content: {
        'application/json': {
          data: {
            /**
             * @description メールアドレス
             * @example test@test.com
             */
            email: string
          }
        }
      }
    }
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
    CheckLoginDataResponse: {
      content: {
        'application/json': {
          /** @description 認証ユーザー */
          data: {
            /**
             * @description ユーザーID
             * @example 1
             */
            id: number
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
            /**
             * @description メールアドレス
             * @example test@test.com
             */
            email: string
            /**
             * @description 認証済みかどうか
             * @example true
             */
            isAuthenticated: boolean
          } | null
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
    PokemonStoreResponse: {
      content: {
        'application/json': {
          data: {
            /**
             * @description ID
             * @example 1
             */
            id: number
          }
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
            user: components['schemas']['User']
          }
        }
      }
    }
  }
  parameters: never
  requestBodies: {
    /** @description アカウント仮登録リクエストボディ */
    RegisterTentativeRequestBody: {
      content: {
        'multipart/form-data': {
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
          /**
           * @description メールアドレス
           * @example test@test.com
           */
          email: string
          /**
           * @description パスワード
           * @example test1234
           */
          password: string
          /**
           * @description パスワード確認用
           * @example test1234
           */
          password_confirmation: string
        }
      }
    }
    /** @description 認証メール再送信リクエストボディ */
    RegisterResendRequestBody: {
      content: {
        'application/json': {
          /**
           * @description メールアドレス
           * @example test@test.com
           */
          email: string
        }
      }
    }
    /** @description ログインリクエストボディ */
    LoginRequestBody: {
      content: {
        'application/json': {
          /**
           * @description メールアドレス
           * @example test@test.com
           */
          email: string
          /**
           * @description パスワード
           * @example test1234
           */
          password: string
        }
      }
    }
    /** @description ポケモン保存用リクエストボディ */
    PokemonStoreRequestBody: {
      content: {
        'application/json': components['schemas']['PokemonPostParams']
      }
    }
    /** @description ポケモン更新用リクエストボディ */
    PokemonUpdateRequestBody: {
      content: {
        'application/json': components['schemas']['PokemonPostParams']
      }
    }
  }
  headers: never
  pathItems: never
}

export type external = Record<string, never>

export type operations = Record<string, never>
