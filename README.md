![ヘッダー画像](画像のパス貼る)

<br />

## サービスのURL

サービスの説明

README編集中です



<br />

## サービスへの想い

サービスの説明

<br />

## アプリケーションのイメージ
![アプリケーションのイメージ](画像のパス貼る)

<br />

## 機能一覧
| トップ画面 |　ログイン画面 |
| ---- | ---- |
| ![Top画面](/docs/img/app-view/welcome_1.1.png) | ![ログイン画面](/docs/img/app-view/login_1.1.png) |
| 登録せずにサービスをお試しいただくためのトライアル機能を実装しました。 | ログインIDとパスワードでの認証機能を実装しました。 |

| 事業者選択画面 |　請求書作成画面 |
| ---- | ---- |
| ![事業者選択画面](/docs/img/app-view/select-business_1.1.png) | ![請求書作成画面](/docs/img/app-view/create-invoice_1.1.png) |
| 登録済みの複数の事業者の中から、請求書を作成したい事業者を選択する機能を実装しました。 | 請求書の作成機能・マスタデータの呼び出し機能・税率変更機能・税率別内訳の計算機能、合計金額の計算機能を実装しました。 |

| 請求書詳細画面 |　PDF出力画面 |
| ---- | ---- |
| ![請求書詳細画面](/docs/img/app-view/invoice-detail_1.1.png) | ![　PDF出力画面](/docs/img/app-view/print-invoice_1.1.png) |
| 請求書データの表示機能を実装しました。 | PDFでの請求書発行機能を実装しました。 |

| 登録するマスタの選択画面 |　マスタの登録画面 |
| ---- | ---- |
| ![請求書詳細画面](/docs/img/app-view/select-master_1.1.png) | ![　PDF出力画面](/docs/img/app-view/master-register-form_1.1.png) |
| 事業者情報と備考欄情報のマスタ登録機能を実装しました。 | マスタ情報の登録をすることで、請求書の作成時にデータを呼び出すことができます。 |

<br />

## 使用技術

| Category          | Technology Stack                                     |
| ----------------- | --------------------------------------------------   |
| Frontend          | TypeScript, Next.js, Storybook                       |
| Backend           | TypeScript, NestJS, Prisma                           |
| Infrastructure    | Amazon Web Services, Vercel                          |
| Database          | PostgreSQL                                           |
| Monitoring        | Sentry, UptimeRobot                                  |
| Environment setup | Docker                                               |
| CI/CD             | GitHub Actions                                       |
| Design            | Figma, Lucid                                         |
| etc.              | Stylelint, ESLint, Prettier, Husky Jest, Git, GitHub |

<br />

## システム構成図

![システム構成図](/docs/img/system-architecture/system-architecture_1.1.png)

<br />

## ER図

![ER図](/docs/img/entity-relationship-diagram/entity-relationship-diagram_1.6.png)

<br />

## 今後の展望

