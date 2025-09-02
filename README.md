ウマ娘全冠・因子厳選サポートツールのフロントエンドアプリケーション

## 概要

Next.js + TypeScriptで構築されたウマ娘育成支援Webアプリケーション。ウマ娘の登録管理、レース情報閲覧、因子計算、ジュエル管理などの機能を提供。

## 技術スタック

- **Framework**: Next.js 15.4.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Fetch API
- **Build Tool**: Turbopack

## 主要機能

### 認証機能
- ユーザーログイン・新規登録
- パスワード忘れ機能
- JWT認証による保護されたページアクセス

### ウマ娘管理
- ウマ娘登録・一覧表示
- ファン数管理・更新
- 適性情報表示（芝/ダート、距離、脚質）
- 残レース管理

### レース情報
- レース一覧表示（条件絞り込み機能付き）
- 馬場・距離別フィルタリング
- レース詳細情報表示

### 因子計算機
- 親因子計算機能
- 距離・馬場・脚質の組み合わせ計算
- 祖父母ウマ娘選択による計算結果表示

### その他機能
- ジュエル管理（日別登録・履歴表示）
- 声優情報一覧
- ライブ情報・出演ウマ娘表示

## プロジェクト構造

```
src/
├── app/
│   ├── components/           # UIコンポーネント
│   │   ├── auth/            # 認証関連コンポーネント
│   │   ├── common/          # 共通コンポーネント
│   │   ├── container/       # 各機能のメインコンポーネント
│   │   │   ├── characterList/      # ウマ娘一覧
│   │   │   ├── characterRegist/    # ウマ娘登録
│   │   │   ├── factorCalculator/   # 因子計算機
│   │   │   ├── jewelController/    # ジュエル管理
│   │   │   ├── raceList/          # レース一覧
│   │   │   ├── remainingRaceList/ # 残レース
│   │   │   ├── liveList/          # ライブ情報
│   │   │   └── acterList/         # 声優情報
│   │   ├── interface/       # TypeScript型定義
│   │   └── layout/          # レイアウトコンポーネント
│   ├── services/            # ビジネスロジック・API
│   │   ├── api/            # API呼び出し関数
│   │   ├── business/       # ビジネスロジック
│   │   └── util/           # カスタムフック
│   ├── globals.css         # グローバルスタイル
│   ├── layout.tsx          # ルートレイアウト
│   └── page.tsx            # メインページ
└── public/                 # 静的ファイル
    └── image/              # ウマ娘画像等
```

## コンポーネント設計

### アーキテクチャパターン
- **Container/Presentational Pattern**: ロジックと表示の分離
- **Custom Hooks**: 状態管理とビジネスロジックの抽象化
- **Service Layer**: API呼び出しとデータ変換の分離

### 主要コンポーネント

#### 認証系
- `Auth`: ログイン画面
- `Regist`: 新規登録画面
- `PasswordForget`: パスワード忘れ画面

#### ウマ娘管理系
- `CharacterList`: 登録済みウマ娘一覧
- `CharacterRegist`: ウマ娘新規登録
- `RemainingRaceList`: 残レース管理

#### 情報表示系
- `RaceList`: レース情報一覧
- `ActerList`: 声優情報一覧
- `LiveList`: ライブ情報一覧

#### ツール系
- `FactorCalculator`: 因子計算機
- `JewelController`: ジュエル管理

### カスタムフック

```typescript
// 認証管理
useAuth(onLogin: () => void)

// レース一覧管理
useRaceList()

// 因子計算管理
useFactorCalculator()

// ウマ娘登録管理
useCharacterRegist(token: string | null, state: UseCharacterRegistProps)
```

## API統合

### APIサービス層
```typescript
// 認証API
authApi.login(userName: string, password: string)
authApi.register(userData: RegisterData)

// ウマ娘API
characterApi.getRegistrableCharacters(token: string)
characterApi.registerCharacter(token: string, umamusumeId: number, raceIds: number[], fans: number)

// レースAPI
raceApi.getRaceList(state: number, distance: number)
raceApi.getRegistrableRaces(token: string)

// 因子計算API
factorApi.calculateFactor(distanceId: number, surfaceId: number, styleId: number, ...)
```

## 状態管理

### ローカル状態管理
- React Hooks (useState, useEffect) を使用
- コンポーネント間の状態共有は props drilling で実装
- 認証状態は localStorage でトークン管理

### データフロー
```
User Action → Component → Custom Hook → API Service → Backend API
                ↓
Component ← State Update ← Response Processing ← API Response
```

## スタイリング

### Tailwind CSS
- ユーティリティファーストのCSS
- レスポンシブデザイン対応
- カスタムカラーパレット使用

### デザインシステム
- 統一されたボタンスタイル
- 一貫したフォームデザイン
- テーブルレイアウトの標準化

## セットアップ

### 前提条件
- Node.js 18.x以上
- npm または yarn

### インストール

1. 依存関係のインストール
```bash
npm install
```

2. 開発サーバー起動
```bash
npm run dev
```

3. ビルド
```bash
npm run build
```

## 環境設定

### 環境変数
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### TypeScript設定
- 絶対パス import 設定 (`src` エイリアス)
- 厳密な型チェック有効
- JSX preserve モード

## 開発ガイドライン

### コーディング規約
- TypeScript strict mode 使用
- ESLint + Prettier による自動フォーマット
- コンポーネント名は PascalCase
- ファイル名は camelCase

### コメント規約
```typescript
/** 関数の説明
 * @param param パラメータの説明
 * @return 戻り値の説明
 */
```

### ディレクトリ命名
- コンポーネント: camelCase
- ファイル: camelCase + 拡張子
- 型定義: interface.tsx, props.tsx

## パフォーマンス最適化

- Next.js の自動コード分割
- 画像最適化 (Next.js Image コンポーネント)
- 不要な再レンダリング防止
- API レスポンスキャッシュ