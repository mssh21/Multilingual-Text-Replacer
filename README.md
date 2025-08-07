# Multilingual Text Replacer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Figmaデザイン内のテキストを複数言語で切り替えることができるプラグインです。

## 主な機能

1. **テキスト抽出**
   - 選択したフレームやレイヤーからテキストを抽出
   - 重複を自動的に除去

2. **多言語対応**
   - 日本語・英語・簡体字・繁体字の4言語に対応
   - JSON形式での翻訳データのインポート

3. **テキスト置換**
   - 選択したフレームやレイヤー内のテキストを指定した言語に一括置換
   - リアルタイムでの言語切り替え

## 開発環境のセットアップ

1. Node.jsのインストール
   - [Node.js公式サイト](https://nodejs.org/)から最新のLTS版をダウンロードしてインストール

2. 依存パッケージのインストール
   ```bash
   npm install
   ```

3. TypeScriptのコンパイル
   ```bash
   npm run build
   ```

4. 開発モード（ファイル監視）
   ```bash
   npm run watch
   ```

## Figmaでのプラグインセットアップ

1. Figmaを開き、デスクトップアプリまたはブラウザでプラグイン開発モードを有効にする
2. Figma > Plugins > Development > New Plugin... を選択
3. "Link existing plugin" を選択し、`manifest-example.json`をコピーして`manifest.json`として保存
4. `manifest.json`内の`YOUR_PLUGIN_ID_HERE`を一意のIDに変更
5. プラグインを読み込み、開発を開始

## 開発の始め方

1. Visual Studio Codeで開発することを推奨
2. 開発時は `npm run watch` でファイル監視モードを起動
3. Figmaでプラグインを実行してテスト

## 翻訳データの形式

翻訳データは以下のJSON形式で管理します：

```json
{
  "greeting": {
    "ja": "こんにちは",
    "en": "Hello",
    "zhCN": "你好",
    "zhTW": "你好"
  },
  "farewell": {
    "ja": "さようなら",
    "en": "Goodbye",
    "zhCN": "再见",
    "zhTW": "再見"
  }
}
```

## 参考リンク

- [Figmaプラグイン開発ドキュメント](https://www.figma.com/plugin-docs/)
- [TypeScriptドキュメント](https://www.typescriptlang.org/)

## 使用方法

1. Figmaでデザインファイルを開く
2. プラグインを起動
3. 翻訳ファイル（JSON）をインポート（任意）
4. テキストを抽出して確認
5. 言語ボタンをクリックしてテキストを切り替え

## 技術スタック

- **言語**: TypeScript
- **プラットフォーム**: Figma Plugin API
- **ビルドツール**: TypeScript Compiler
- **リンター**: ESLint

## プロジェクト構造

```
├── code.ts          # メインプラグインロジック
├── ui.html          # プラグインUI
├── package.json     # プロジェクト設定
├── tsconfig.json    # TypeScript設定
└── manifest-example.json # Figmaプラグイン設定例
```

## 貢献

バグ報告や機能要求は[Issues](https://github.com/mssh21/Multilingual-Text-Replacer/issues)にお気軽にお寄せください。

## ライセンス

このプロジェクトは[MIT License](LICENSE)の下で公開されています。

## 作者

[mssh21](https://github.com/mssh21)
