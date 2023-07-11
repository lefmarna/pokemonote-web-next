# Pokemonote

『[Pokemonote](https://pokemonote.com/)』は、『ポケットモンスター』シリーズのゲームを遊んでいるユーザーを対象とした Web サービスです。
ポケモンのステータスを計算し、みんなで投稿し合って、シェアできる場にすることを目的としています。

## Hope

『Pokemonote』は、ポケモンを育てる際に「努力値をどう振るのが正解なのかわからないよ〜！」という方の悩みを解決したいという想いのもと作られました。

そのため、「より簡単に分かりやすく、**効率的**に計算できる仕組みを提供しよう！」という部分に力を入れています。

投稿機能を設けたのは、他の人が投稿したポケモンを参考にできる環境も提供したいと考えたからです。どのポケモンがどういうステータスに調整されているのかを知ることは学びも多いはずです。

## Features

『Pokemonote』には、面倒なポケモンのステータス計算を簡単に行うための仕組みがたくさん詰まっています！

- ポケモンや性格の入力は、ひらがな・カタカナ・そして、**ローマ字**でも入力が可能となっています。
- **全ての値がリアルタイムに計算される**ため、各種パラメーターを確認しながら調整することが可能です。
- 努力値から実数値、実数値から努力値の双方向での計算に対応しています。
- 数値の入力を全角で行ってしまった場合でも、半角に修正する機能を導入しています。
- スマホにも PC にも対応した見やすい画面になっています。
- **耐久調整を 1 ボタンで行える機能**を搭載しています。（最も理想的な耐久値を割り出し、余った努力値を振り分けます）
- 耐久指数も確認できるため、細かいところまでこだわりたい方にもおすすめです。
- 登録したポケモンのステータスを簡単にコピーして貼り付けることもできます。
- ページの遷移がスムーズに行える仕組みを採用しています。

投稿機能以外にも、「素早さ計算機」や「種族値ランキング」といった『ポケットモンスター』シリーズのゲームを遊ぶ上で役立つツールを公開しているので、そちらも是非お試しください。

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
