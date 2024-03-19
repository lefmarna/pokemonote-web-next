import { exec as execCallback } from 'child_process'
import { access, unlink, writeFile } from 'fs/promises'
import { promisify } from 'util'
import axios from 'axios'
import dotenv from 'dotenv'

// .env.localの環境変数を参照する
dotenv.config({ path: '.env.local' })

/**
 * Dockerのコンテナ内であればtrue、そうでなければfalseを返す
 */
const isDockerEnvironment = async () => {
  try {
    await access('/.dockerenv')
    return true
  } catch {
    return false
  }
}

/**
 * サーバーのopenapi.jsonをからフロントのopenapi.d.tsを作成するスクリプト
 */
const generateOpenapi = async () => {
  const exec = promisify(execCallback)
  const tempJsonFile = 'openapi.json'

  const baseURL = (await isDockerEnvironment())
    ? process.env.NEXT_PUBLIC_NGINX_BASE_URL
    : process.env.NEXT_PUBLIC_BACKEND_BASE_URL

  try {
    const response = await axios.get('/openapi', {
      baseURL: baseURL,
    })
    await writeFile(tempJsonFile, JSON.stringify(response.data))

    await exec('npm run openapi-typescript')
    await exec('npm run fix:openapi')
    console.log('型定義ファイルの生成が完了しました。')
  } catch (error) {
    console.error('エラーが発生しました:', error)
  } finally {
    unlink(tempJsonFile)
  }
}

generateOpenapi()
