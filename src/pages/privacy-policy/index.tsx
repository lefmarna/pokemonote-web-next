import { Meta } from '@/components/organisms/Meta'
import { useEmotion } from '@/hooks/style/useEmotion'
import styled from '@emotion/styled'
import { Container } from '@mui/material'

const StyledUl = styled.ul`
  box-sizing: inherit;
  padding: 20px 5px 20px 20px;
  margin-top: 20px;
  background-color: #f2f2f2;
  border: 1px dashed #191919;
  box-shadow: 0 0 0 5px #f2f2f2;
`

const StyledLi = styled.li`
  margin: 6px 20px;
`

const StyledH1 = styled.h1`
  box-sizing: inherit;
  display: block;
  margin-block-start: 1.1em;
  margin-block-end: 0.7em;
  font-weight: bold;
  text-align: center;
`

const StyledH2 = styled.h2`
  position: relative;
  background: #1976d2;
  box-shadow: 0px 0px 0px 5px #1976d2;
  border: dashed 2px #dee2e6;
  padding: 0.4em 0.5em;
  color: white;
  box-sizing: inherit;
  display: block;
  margin-block-start: 1.1em;
  margin-block-end: 0.7em;
  font-weight: bold;

  &::after {
    position: absolute;
    content: '';
    left: -7px;
    top: -7px;
    border-width: 0 0 15px 15px;
    border-style: solid;
    border-color: #fff #fff #145ca4;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  }
`

const StyledH3 = styled.h3`
  padding: 15px;
  color: #191919;
  border-bottom: solid 1px #d8d8d8;
  border-left: solid 4px #1976d2;
  box-sizing: inherit;
  display: block;
  margin-block-start: 1.1em;
  margin-block-end: 0.7em;
  font-weight: bold;
`

const StyledH4 = styled.h4`
  position: relative;
  padding: 15px 5px;
  box-sizing: inherit;
  display: block;
  margin-block-start: 1.1em;
  margin-block-end: 0.7em;
  font-weight: bold;

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6px;
    content: '';
    background: repeating-linear-gradient(
      -45deg,
      #1976d2,
      #1976d2 2px,
      #d8d8d8 2px,
      #d8d8d8 4px
    );
  }
`

const StyledA = styled.a`
  color: #1976d2;
  text-decoration: underline;

  &:visited {
    color: #551a8b;
  }

  &:active {
    color: #ff0000;
  }
`

export default function PrivacyPolicy() {
  const { StyledLink } = useEmotion()

  return (
    <>
      <Meta title="利用規約" />
      <Container>
        <StyledH1>利用規約</StyledH1>
        <p>
          本利用規約は、<StyledLink href="/">Pokemonote</StyledLink>
          （以下、「当サイト」とします。）の各種サービス（当サイトによる情報提供、各種お問い合わせの受付等）において、当サイトの訪問者（以下、「訪問者」とします。）の個人情報もしくはそれに準ずる情報を取り扱う際に、当サイトが遵守する方針を示したものです。
        </p>
        <StyledH2>基本方針</StyledH2>
        <p>
          当サイトは、個人情報の重要性を認識し、個人情報を保護することが社会的責務であると考え、個人情報に関する法令を遵守し、当サイトで取扱う個人情報の取得、利用、管理を適正に行います。当サイトで収集した情報は、利用目的の範囲内で適切に取り扱います。
        </p>
        <StyledH2>適用範囲</StyledH2>
        <p>本利用規約は、当サイトにおいてのみ適用されます。</p>
        <StyledH2>個人情報の取得と利用目的</StyledH2>
        <p>
          当サイトで取得する訪問者の個人情報と利用目的、保存期間等は下記の通りです。
        </p>
        <StyledH3>お問い合わせされた個人情報を取得します</StyledH3>
        <p>
          当サイトでは
          <StyledLink href="/lefmarna-otoiawase">
            お問い合わせフォーム
          </StyledLink>
          を設けています。
        </p>
        <p>
          訪問者がお問い合わせフォームから問い合わせをされた際に入力された、以下の個人情報を取得します。
        </p>
        <StyledUl>
          <StyledLi>お問い合わせフォームに入力されたお名前</StyledLi>
          <StyledLi>お問い合わせフォームに入力されたメールアドレス</StyledLi>
          <StyledLi>お問い合わせフォームに入力されたお問い合わせ内容</StyledLi>
        </StyledUl>
        <StyledH4>利用目的について</StyledH4>
        <p>
          お問い合わせ対応をするためと、訪問者の管理のためです。訪問者からのお問い合わせ情報を保存しておくことによって、同じ訪問者が別のお問い合わせをした際に、過去の問い合わせ内容を踏まえた対応をすることが出来、より的確な対応をすることが出来ます。
        </p>
        <p>
          また、当サイト内で「このようなお問い合わせがありました」と紹介させていただく場合もあります。
        </p>
        <StyledH4>保存期間について</StyledH4>
        <p>お問い合わせフォームに入力された個人情報は、3年間保存します。</p>
        <StyledH4>個人情報取得の同意について</StyledH4>
        <p>
          当サイトでは、お問い合わせフォームからお問い合わせをする前に、当利用規約をご一読いただくよう案内しています。
        </p>
        <p>
          お問い合わせをされた時点で、その訪問者は当利用規約に同意されたとみなします。
        </p>
        <StyledH3>Cookieによる個人情報の取得</StyledH3>
        <p>
          当サイトは、訪問者のコンピュータにCookieを送信することがあります。
        </p>
        <p>
          Cookie（クッキー）とは、ウェブサイトを利用したときに、ブラウザとサーバーとの間で送受信した利用履歴や入力内容などを、訪問者のコンピュータにファイルとして保存しておく仕組みです。
        </p>
        <StyledH4>利用目的について</StyledH4>
        <p>訪問者の当サイト閲覧時の利便性を高めるためです。</p>
        <p>
          たとえば、次回同じページにアクセスするとCookieの情報を使って、ページの運営者は訪問者ごとに表示を変えることができます。
        </p>
        <p>
          たとえばあるサイトを利用していて、初回はログインパスワードを入力する画面が表示されたけど、2回目以降はログイン画面は表示されずにアクセスできた、という経験ありませんか？それはCookieによるものです。
        </p>
        <p>
          訪問者がブラウザの設定でCookieの送受信を許可している場合、ウェブサイトは、訪問者のブラウザからCookieキーを取得できます。
        </p>
        <p>
          なお、訪問者のブラウザはプライバシー保護のため、そのウェブサイトのサーバーが送受信したCookieのみを送信します。
        </p>
        <StyledH4>保存期間について</StyledH4>
        <p>
          当サイトに残されたコメントの Cookie は、1年間保存されます<b>。</b>
        </p>
        <StyledH4>第三者によるCookie情報の取得について</StyledH4>
        <p>
          当サイトでは、グーグル株式会社やヤフー株式会社などをはじめとする第三者から配信される広告が掲載される場合があり、これに関連して当該第三者が訪問者のCookie情報等を取得して、利用している場合があります。
        </p>
        <p>
          当該第三者によって取得されたCookie情報等は、当該第三者の利用規約に従って取り扱われます。
        </p>
        <StyledH4>第三者へのCookie情報等の広告配信の利用停止について</StyledH4>
        <p>
          訪問者は、当該第三者のウェブサイト内に設けられたオプトアウト（個人情報を第三者に提供することを停止すること）ページにアクセスして、当該第三者によるCookie情報等の広告配信への利用を停止することができます。
        </p>
        <StyledH4>Cookie情報の送受信の許可・拒否について</StyledH4>
        <p>
          訪問者は、Cookieの送受信に関する設定を「すべてのCookieを許可する」、「すべてのCookieを拒否する」、「Cookieを受信したらユーザーに通知する」などから選択できます。設定方法は、ブラウザにより異なります。Cookieに関する設定方法は、お使いのブラウザの「ヘルプ」メニューでご確認ください。
        </p>
        <p>
          すべてのCookieを拒否する設定を選択されますと、認証が必要なサービスを受けられなくなる等、インターネット上の各種サービスの利用上、制約を受ける場合がありますのでご注意ください。
        </p>
        <StyledH2>個人情報の管理</StyledH2>
        <p>
          当サイトは、訪問者からご提供いただいた情報の管理について、以下を徹底します。
        </p>
        <StyledH3>情報の正確性の確保</StyledH3>
        <p>
          訪問者からご提供いただいた情報については、常に正確かつ最新の情報となるよう努めます。
        </p>
        <StyledH3>安全管理措置</StyledH3>
        <p>
          当サイトは、個人情報の漏えいや滅失又は棄損を防止するために、適切なセキリュティ対策を実施して個人情報を保護します。
        </p>
        <StyledH3>個人情報の廃棄</StyledH3>
        <p>個人情報が不要となった場合には、すみやかに廃棄します。</p>
        <StyledH3>個人情報の開示、訂正、追加、削除、利用停止</StyledH3>
        <p>
          訪問者ご本人からの個人情報の開示、訂正、追加、削除、利用停止のご希望の場合には、ご本人であることを確認させていただいた上、速やかに対応させていただきます。
        </p>
        <p>
          上記を希望される場合は、
          <StyledLink href="/lefmarna-otoiawase">
            お問い合わせフォーム
          </StyledLink>
          にてお問い合わせください。
        </p>
        <StyledH2>個人情報の第三者への提供について</StyledH2>
        <p>
          当サイトは、訪問者からご提供いただいた個人情報を、訪問者本人の同意を得ることなく第三者に提供することはありません。また、今後第三者提供を行うことになった場合には、提供する情報と提供目的などを提示し、訪問者から同意を得た場合のみ第三者提供を行います。
        </p>
        <StyledH2>未成年の個人情報について</StyledH2>
        <p>
          未成年者が当サイトにコメントをしたり、お問い合わせフォームから問い合わせをされたりする場合は必ず親権者の同意を得るものとし、コメントやお問い合わせをされた時点で、当利用規約に対して親権者の同意があるものとみなします。
        </p>
        <StyledH2>アクセス解析ツールについて</StyledH2>
        <p>
          当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
        </p>
        <p>
          このGoogleアナリティクスはアクセス情報の収集のためにCookieを使用しています。このアクセス情報は匿名で収集されており、個人を特定するものではありません。
        </p>
        <p>
          GoogleアナリティクスのCookieは、26ヶ月間保持されます。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
        </p>
        <p>
          Googleアナリティクスの利用規約に関して確認したい場合は、
          <StyledA
            href="https://www.google.com/analytics/terms/jp.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            ここをクリック
          </StyledA>
          してください。また、「ユーザーが
          Googleパートナーのサイトやアプリを使用する際のGoogleによるデータ使用」に関して確認したい場合は、
          <StyledA
            href="https://policies.google.com/technologies/partner-sites?hl=ja"
            target="_blank"
            rel="noopener noreferrer"
          >
            ここをクリック
          </StyledA>
          してください。
        </p>
        <StyledH2>
          第三者配信の広告サービスについて
          <br />
        </StyledH2>
        <p>
          当サイトは、第三者配信の広告サービス「Google
          Adsense（グーグルアドセンス）」を利用しています。
        </p>
        <p>
          Googleなどの第三者広告配信事業者は、訪問者の興味に応じた広告を表示するために、Cookie（当サイトの訪問者が当サイトや他のサイトにアクセスした際の情報など）を使用することがあります。
        </p>
        <p>
          訪問者は、広告設定で訪問者に合わせた広告（以下、「パーソナライズド広告」とします。）を無効にすることが出来ます。その設定をする場合は、
          <StyledA
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            こちらをクリック
          </StyledA>
          してください。また、
          <StyledA
            href="http://www.aboutads.info/choices/"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.aboutads.info
          </StyledA>
          にアクセスすれば、パーソナライズド広告に使われる第三者配信事業者のCookieを無効にできます。
        </p>
        <p>
          第三者配信による広告掲載を無効にしていない場合は、第三者配信事業者や広告ネットワークの配信する広告がサイトに掲載されることがあります。
        </p>
        <p>
          Googleによって広告の第三者配信が認められている広告配信事業者の詳細は、
          <a
            href="https://support.google.com/dfp_premium/answer/94149"
            target="_blank"
            rel="noopener noreferrer"
          >
            ここをクリック
          </a>
          してください。
        </p>
        <StyledH2>利用規約の変更について</StyledH2>
        <p>
          当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本利用規約の内容を適宜見直しその改善に努めます。修正された最新の利用規約は常に本ページにて開示されます。
        </p>
        <StyledH2>免責事項</StyledH2>
        <p>当サイトにおける免責事項は、下記の通りです。</p>
        <StyledH3>当サイトの情報の正確性について</StyledH3>
        <p>
          当サイトのコンテンツや情報において、可能な限り正確な情報を掲載するよう努めています。しかし、誤情報が入り込んだり、情報が古くなったりすることもあります。必ずしも正確性を保証するものではありません。また合法性や安全性なども保証しません。
        </p>
        <StyledH3>損害等の責任について</StyledH3>
        <p>
          当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますので、ご了承ください。
        </p>
        <p>
          また当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任も負いません。
        </p>
        <p>
          当サイトの保守、火災、停電、その他の自然災害、ウィルスや第三者の妨害等行為による不可抗力によって、当サイトによるサービスが停止したことに起因して利用者に生じた損害についても、何ら責任を負うものではありません。
        </p>
        <p>当サイトを利用する場合は、自己責任で行う必要があります。</p>
        <StyledH3>
          当サイトで掲載している画像の著作権や肖像権等について
        </StyledH3>
        <p>
          当サイトで掲載している画像の著作権や肖像権等は、各権利所有者に帰属します。万が一問題がある場合は、お問い合わせよりご連絡いただけますよう宜しくお願い致します。
        </p>
        <StyledH3>無断転載の禁止について</StyledH3>
        <p>
          当サイトに存在する、文章や画像、動画等の著作物の情報を無断転載することを禁止します。引用の範囲を超えるものについては、法的処置を行います。転載する際には、お問い合わせよりご連絡いただけますよう宜しくお願い致します。
        </p>
      </Container>
    </>
  )
}
