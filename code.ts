interface TranslationData {
  [key: string]: {
    ja: string;
    en: string;
    zhCN: string;
    zhTW: string;
  };
}

// プラグインの状態管理
const pluginState = {
  translationData: {} as TranslationData,
  currentLanguage: 'ja' as 'ja' | 'en' | 'zhCN' | 'zhTW'
};

// 非同期フォント読み込み関数
async function loadFontForTextNode(textNode: TextNode): Promise<boolean> {
  const fontName = textNode.fontName;
  
  // フォントが文字列（system fonts）でない場合のみ読み込み
  if (fontName !== figma.mixed) {
    try {
      await figma.loadFontAsync(fontName as FontName);
    } catch (error) {
      console.error('フォント読み込みエラー:', error);
      return false;
    }
  }
  
  return true;
}

// メイン処理
figma.showUI(__html__, {
  visible: true,
  width: 300,
  height: 540,
  position: { x: 0, y: 0 },
});

// メッセージハンドリング
figma.ui.onmessage = async (msg) => {
  try {
    switch (msg.type) {
      case 'import-translations':
        handleTranslationImport(msg.data);
        break;
      
      case 'replace-texts':
        await handleTextReplacement(msg.language);
        break;
      
      case 'extract-texts':
        handleTextExtraction();
        break;
    }
  } catch (error) {
    console.error('プラグイン処理中にエラーが発生:', error);
    figma.notify('処理中にエラーが発生しました');
  }
};

// 翻訳データのインポート
function handleTranslationImport(jsonData: string) {
  try {
    pluginState.translationData = JSON.parse(jsonData);
    figma.notify(`翻訳データをインポートしました：${Object.keys(pluginState.translationData).length}件`);
  } catch (error) {
    console.error('データインポートエラー:', error);
    figma.notify('データのインポートに失敗しました');
  }
}

// テキスト置換処理
async function handleTextReplacement(language: 'ja' | 'en' | 'zhCN' | 'zhTW') {
  const selection = figma.currentPage.selection;
  
  if (selection.length === 0) {
    figma.notify('フレームまたはレイヤーを選択してください');
    return;
  }

  let replacedCount = 0;
  for (const node of selection) {
    replacedCount += await replaceTextsInNode(node, language);
  }

  figma.notify(`${language}に${replacedCount}件のテキストを置き換えました`);
}

// ノード内のテキスト置換
async function replaceTextsInNode(node: SceneNode, language: 'ja' | 'en' | 'zhCN' | 'zhTW'): Promise<number> {
  let count = 0;

  // テキストノードの処理
  if (node.type === 'TEXT') {
    const textNode = node as TextNode;
    const translation = findTranslation(textNode.characters, language);
    
    if (translation) {
      // フォント読み込みを先に実行
      const fontLoaded = await loadFontForTextNode(textNode);
      
      if (fontLoaded) {
        textNode.characters = translation;
        count++;
      }
    }
  }

  // 子ノードがある場合の再帰処理
  if ('children' in node) {
    for (const child of node.children) {
      count += await replaceTextsInNode(child, language);
    }
  }

  return count;
}

// 翻訳検索
function findTranslation(text: string, language: 'ja' | 'en' | 'zhCN' | 'zhTW'): string | null {
  for (const key in pluginState.translationData) {
    const translationSet = pluginState.translationData[key];
    
    // 日本語テキストで検索
    if (translationSet.ja === text) {
      return translationSet[language];
    }

    // 英語テキストで検索
    if (translationSet.en === text) {
      return translationSet[language];
    }

    // 簡体字テキストで検索
    if (translationSet.zhCN === text) {
      return translationSet[language];
    }

    // 繁体字テキストで検索
    if (translationSet.zhTW === text) {
      return translationSet[language];
    }
  }
  return null;
}

// テキスト抽出
function handleTextExtraction() {
  const selection = figma.currentPage.selection;
  
  if (selection.length === 0) {
    figma.notify('フレームまたはレイヤーを選択してください');
    return;
  }

  const extractedTexts: string[] = [];
  
  // 選択されたノードのみを処理
  selection.forEach(node => {
    extractTextsFromNode(node, extractedTexts);
  });

  // UIにテキストを送信
  figma.ui.postMessage({
    type: 'extracted-texts',
    texts: Array.from(new Set(extractedTexts)) // 重複排除
  });
  
  figma.notify(`${extractedTexts.length}件のテキストを抽出しました`);
}

// ノードからのテキスト抽出
function extractTextsFromNode(node: SceneNode, collection: string[]) {
  if (node.type === 'TEXT') {
    const textNode = node as TextNode;
    collection.push(textNode.characters);
  }

  if ('children' in node) {
    node.children.forEach(child => {
      extractTextsFromNode(child, collection);
    });
  }
}