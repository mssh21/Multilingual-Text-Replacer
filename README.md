# Multilingual Text Replacer - Figmaプラグイン

Figmaデザイン内のテキストを複数言語（日本語・英語・中国語）で切り替えることができるプラグインです。

## 主な機能

1. テキスト抽出
   - 選択したフレームやレイヤーから日本語テキストを抽出
   - 重複を自動的に除去

2. 翻訳データ管理
   - JSON形式での翻訳データのインポート
   - 日本語・英語・中国語の3言語対応

3. テキスト置換
   - 選択したフレームやレイヤー内のテキストを指定した言語に一括置換
   - フォントの自動読み込み対応

## 開発環境のセットアップ

1. Node.jsのインストール
   - [Node.js公式サイト](https://nodejs.org/)から最新のLTS版をダウンロードしてインストール

2. 依存パッケージのインストール
   ```bash
   npm install
   ```

3. 開発用の型定義ファイルのインストール
   ```bash
   npm install --save-dev @figma/plugin-typings
   ```

## 開発の始め方

1. Visual Studio Codeで開発することを推奨します
   - [Visual Studio Code](https://code.visualstudio.com/)をダウンロードしてインストール
   - このプロジェクトのフォルダをVSCodeで開く

2. TypeScriptのコンパイル
   - VSCodeで `Terminal > Run Build Task...` を選択
   - `npm: watch` を選択してコンパイラを起動
   - これにより、ファイルの保存時に自動的にJavaScriptにコンパイルされます

## 翻訳データの形式

翻訳データは以下のJSON形式で管理します：

```json
{
  "key1": {
    "ja": "こんにちは",
    "en": "Hello",
    "zh": "你好"
  },
  "key2": {
    "ja": "さようなら",
    "en": "Goodbye",
    "zh": "再见"
  }
}
```

## 参考リンク

- [Figmaプラグイン開発ドキュメント](https://www.figma.com/plugin-docs/)
- [TypeScriptドキュメント](https://www.typescriptlang.org/)

## ライセンス

このプロジェクトは[MITライセンス](LICENSE)の下で公開されています。
