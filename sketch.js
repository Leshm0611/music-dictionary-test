let inputField;
let searchButton;
let resultBox;
let searchMode;

let howToButton;　//この下の4つは使い方ボタンや表示画面の設定関連
let addWordButton;
let howToOverlay;
let howToWindow;

let addWordOverlay;　//この下の３つは+単語追加ボタンの設定関連
let addWordWindow;
let addWordInput;

let resultCountText;　//これはヒット件数ボタンを表示させる設定

// ==================================================
// 画面サイズ
// ==================================================

let canvasW;
let canvasH;
let isMobile;


// ==================================================
// アクセント記号を無視して検索するための処理
// ==================================================

function normalizeText(text) {

  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

}


// ==================================================
// 画面サイズを決定
// ==================================================

function setupLayout() {

  // 600px未満をスマホとする
  isMobile = windowWidth < 600;


  if (isMobile) {

    // ----------------------------------------------
    // スマホ
    // ----------------------------------------------

    canvasW = min(420, windowWidth - 20);

    canvasH = 600;

  }

  else {

    // ----------------------------------------------
    // PC
    // ----------------------------------------------

    canvasW = 600;

    canvasH = 750;

  }

}


// ==================================================
// 初期設定
// ==================================================

function setup() {

  setupLayout();

  createCanvas(canvasW, canvasH);


  // ==================================================
  // 入力欄
  // ==================================================

  inputField = createInput("");

  inputField.style("font-size", "16px");
  inputField.style("border", "2px solid #a0b2c6");
  inputField.style("border-radius", "20px");
  inputField.style("padding-left", "15px");
  inputField.style("outline", "none");
  inputField.style("box-sizing", "border-box");


  // ==================================================
  // 検索ボタン
  // ==================================================

  searchButton = createButton("検索/Procurar");

  searchButton.style(
    "background-color",
    "#4a76a8"
  );

  searchButton.style(
    "color",
    "#ffffff"
  );

  searchButton.style(
    "font-size",
    "14px"
  );

  searchButton.style(
    "font-weight",
    "bold"
  );

  searchButton.style(
    "border",
    "none"
  );

  searchButton.style(
    "border-radius",
    "20px"
  );

  searchButton.style(
    "cursor",
    "pointer"
  );

  searchButton.mousePressed(searchWord);


  // ==================================================
  // 検索方法
  // ==================================================

  searchMode = createRadio();

  searchMode.option(
    "exact",
    "完全一致"
  );

  searchMode.option(
    "prefix",
    "前方一致"
  );

  searchMode.option(
    "partial",
    "部分一致"
  );

  searchMode.selected("prefix");

  searchMode.style(
    "font-size",
    "14px"
  );


  // ==================================================
  // 「使い方」ボタン
  // ==================================================

    howToButton = createButton("？");

  howToButton.mousePressed(showHowTo);

  howToButton.style(
    "font-size",
    "14px"
  );

  howToButton.style(
    "background-color",
    "#ffffff"
  );

  howToButton.style(
    "color",
    "#4a76a8"
  );

  howToButton.style(
    "border",
    "1px solid #a0b2c6"
  );

  howToButton.style(
    "border-radius",
    "15px"
  );

  howToButton.style(
    "cursor",
    "pointer"
  );


  // ==================================================
  // 「＋単語追加」ボタン
  // ==================================================

  addWordButton = createButton("＋");

  addWordButton.mousePressed(showAddWord);

  addWordButton.style(
    "font-size",
    "14px"
  );

  addWordButton.style(
    "background-color",
    "#ffffff"
  );

  addWordButton.style(
    "color",
    "#4a76a8"
  );

  addWordButton.style(
    "border",
    "1px solid #a0b2c6"
  );

  addWordButton.style(
    "border-radius",
    "15px"
  );

  addWordButton.style(
    "cursor",
    "pointer"
  );


  // ==================================================
  // 検索結果ボックス
  // ==================================================

  resultBox = createDiv(

    "<br>" +
    
    "🔎 調べたい言葉を入力してください。<br>" +

    "日本語・ポルトガル語どちらでも検索できます。<br>" +

    "検索ボタンまたはEnterキーで検索♬<br>" +

    "例：テンポ、音程、som、cavaco<br><br>" +

    "🔎 Digite uma palavra para pesquisar.<br>" +

    "Pesquise em português ou japonês.<br>" +

    "Clique em Procurar ou pressione Enter♬<br>" +

    "Ex.: som、cavaco, テンポ、音程"

  );


  resultBox.style(
    "background-color",
    "#ffffff"
  );

  resultBox.style(
    "border",
    "1px solid #e2e8f0"
  );

  resultBox.style(
    "border-radius",
    "12px"
  );

  resultBox.style(
    "padding",
    "10px"
  );

  resultBox.style(
    "box-sizing",
    "border-box"
  );


  // スクロール可能
  resultBox.style(
    "overflow-y",
    "auto"
  );


  // 文字設定
  resultBox.style(
    "font-size",
    "16px"
  );

  resultBox.style(
    "font-family",
    "sans-serif"
  );

  resultBox.style(
    "color",
    "#333333"
  );

  resultBox.style(
    "line-height",
    "1.5"
  );


  // ==================================================
  // 各要素を配置
  // ==================================================

  adjustElements();

}


// ==================================================
// Canvas・各要素を配置
// ==================================================

function adjustElements() {

  // Canvasの中央位置
  let canvasX =
    (windowWidth - canvasW) / 2;


  // 画面より左にはみ出さない
  if (canvasX < 0) {

    canvasX = 0;

  }


  // ==================================================
  // Canvas
  // ==================================================

  let canvasElement =
    document.querySelector("canvas");


  if (canvasElement) {

    canvasElement.style.position =
      "absolute";

    canvasElement.style.left =
      canvasX + "px";

    canvasElement.style.top =
      "0px";

  }


  // ==================================================
  // スマホでの画面表示の設定
  // ==================================================

  if (isMobile) {

    // ----------------------------------------------
    // 入力欄
    // ----------------------------------------------

    let inputW =
      canvasW - 170;


    inputField.position(

      canvasX + 15,

      75

    );


    inputField.size(

      inputW,

      35

    );


    inputField.style(
      "font-size",
      "16px"
    );


    // ----------------------------------------------
    // 検索ボタン
    // ----------------------------------------------

    searchButton.position(

      canvasX + inputW + 25,

      75

    );


    searchButton.size(

      120,

      39

    );


    searchButton.style(
      "font-size",
      "16px"
    );


    // ----------------------------------------------
    // 検索方法
    // ----------------------------------------------

    searchMode.position(

      canvasX + 15,

      120

    );


    searchMode.style(
      "font-size",
      "14px"
    );


    // ----------------------------------------------
    // 使い方、「？」ボタン
    // ----------------------------------------------

    howToButton.position(

      canvasX + 15,

      150

    );


    howToButton.size(

      45,

      30

    );


    // ----------------------------------------------
    // ＋単語追加、「＋」ボタン
    // ----------------------------------------------

    addWordButton.position(

      canvasX + canvasW - 270,

      150

    );


    addWordButton.size(

      45,

      30

    );

  // ----------------------------------------------
  // ヒット件数
  // ----------------------------------------------

resultCountText.position(
  canvasX + canvasW - 55,
  150
);

resultCountText.size(
  50,
  30
);


    // ----------------------------------------------
    // 結果ボックス
    // ----------------------------------------------

    resultBox.position(

      canvasX + 10,

      190

    );


    resultBox.size(

      canvasW - 20,

      400

    );


    resultBox.style(
      "font-size",
      "16px"
    );

  }

  // ==================================================
  // スマホ画面ここまで？
  // ==================================================  


  // ==================================================
  // PC画面の設定、ここから
  // ==================================================

  else {

    // ----------------------------------------------
    // 入力欄
    // ----------------------------------------------

    inputField.position(

      canvasX + 35,

      90

    );


    inputField.size(

      350,

      42

    );


    inputField.style(
      "font-size",
      "18px"
    );


    // ----------------------------------------------
    // 検索ボタン
    // ----------------------------------------------

    searchButton.position(

      canvasX + 400,

      90

    );


    searchButton.size(

      150,

      46

    );


    searchButton.style(
      "font-size",
      "18px"
    );


    // ----------------------------------------------
    // 検索方法
    // ----------------------------------------------

    searchMode.position(

      canvasX + 35,

      145

    );


    searchMode.style(
      "font-size",
      "16px"
    );


    // ----------------------------------------------
    // 使い方、「？」ボタン
    // ----------------------------------------------

    howToButton.position(

      canvasX + 35,

      180

    );


    howToButton.size(

      45,

      32

    );


    // ----------------------------------------------
    // ＋単語追加、「＋」ボタン
    // ----------------------------------------------

    addWordButton.position(

      canvasX + canvasW - 450,

      180

    );


    addWordButton.size(

      45,

      32

    );

// ==================================================
// ヒット件数に関する設定、はここから
// ==================================================　

resultCountText.position(
  canvasX + canvasW - 60,
  180
);

resultCountText.size(
  50,
  32
);

resultCountText = createDiv("");

resultCountText.style("font-size", "14px");
resultCountText.style("color", "#4a76a8");
resultCountText.style("font-weight", "bold");
resultCountText.style("text-align", "center");
resultCountText.style("line-height", "30px");
resultCountText.style("white-space", "nowrap");

// ==================================================
// ヒット件数に関する設定、はここまで
// ==================================================　


    // ----------------------------------------------
    // 結果ボックス
    // ----------------------------------------------

    resultBox.position(

      canvasX + 25,

      220

    );


    resultBox.size(

      canvasW - 50,

      500

    );


    resultBox.style(
      "font-size",
      "18px"
    );

  }

}

  // ==================================================
  // PC画面の設定、ここまで？
  // ==================================================

// ==================================================
// 画面描画
// ==================================================

function draw() {

  background("#f4f6f9");


  // ==================================================
  // タイトル背景
  // ==================================================

  fill("#4a76a8");

  noStroke();

  rect(

    0,

    0,

    width,

    isMobile ? 55 : 70

  );


  // ==================================================
  // タイトル
  // ==================================================

  fill("#ffffff");

  textAlign(
    LEFT,
    CENTER
  );


  if (isMobile) {

    textSize(18);

    text(

      "📖 Português ⇄ 日本語 音楽用語辞典",

      20,

      27

    );

  }

  else {

    textSize(20);

    text(

      "📖 Português ⇄ 日本語 音楽用語辞典",

      30,

      35

    );

  }

}


// ==================================================
// 検索
// ==================================================

function searchWord() {

  // ==================================================
  // 入力された文字
  // ==================================================

  let originalWord =
    inputField.value().trim();


  // アクセント記号を無視
  let word =
    normalizeText(originalWord);


  // ==================================================
  // 空欄
  // ==================================================

  if (word === "") {

    resultBox.html(
      "⚠️ 単語を入力してください。<br>" +
      "⚠️ Digite uma palavra."
    );

    return;

  }


  // ==================================================
  // 選択された検索方法
  // ==================================================

  let mode =
    searchMode.value();


  // ==================================================
  // 辞書から検索
  // ==================================================

  let results =
    dictionary.filter(item => {

      let portuguese =
        normalizeText(
          item.portuguese
        );


      let japanese =
        normalizeText(
          item.japanese
        );


      

      // ----------------------------------------------
      // 完全一致
      // ----------------------------------------------

      if (mode === "exact") {

        return (

          portuguese === word ||

          japanese === word

        );

      }


      // ----------------------------------------------
      // 前方一致
      // ----------------------------------------------

      if (mode === "prefix") {

        return (

          portuguese.startsWith(word) ||

          japanese.startsWith(word)

        );

      }


      // ----------------------------------------------
      // 部分一致
      // ----------------------------------------------

      if (mode === "partial") {

        return (

          portuguese.includes(word) ||

          japanese.includes(word)

        );

      }


      return false;

    });

  // ヒット件数を表示
resultCountText.html(results.length + "件");
  
  // ==================================================
  // 検索結果あり
  // ==================================================

  if (results.length > 0) {

    let html = "";


    results.forEach(
      (item, index) => {

        html +=

          "<div style='margin-bottom:20px;'>" +


          // ------------------------------------------
          // ポルトガル語
          // ------------------------------------------

          "<div style='font-size:18px; font-weight:bold;'>" +

          item.portuguese +

          "</div>" +


          // ------------------------------------------
          // 日本語
          // ------------------------------------------

          "<div>" +

          item.japanese +

          "</div>" +


          // ------------------------------------------
          // 説明
          // ------------------------------------------

          "<div style='margin-top:5px; font-size:13px;'>" +

          "💡 " +

          item.descriptionJP +

          "<br>" +

          "💡 " +

          item.descriptionPT +

          "</div>" +


          "</div>";

      }

    );


    resultBox.html(html);

  }


  // ==================================================
  // 検索結果なし
  // ==================================================

  else {

    resultBox.html(

      "🔍 「" +

      originalWord +

      "」は見つかりませんでした。" +

      "<br>" +

      "ポルトガル語または日本語で検索してみてね。<br><br>" +

      "🔍 「" +

      originalWord +

      "」← Essa palavra não temos no dicionário." +

      "<br>" +

      "Digite outra palavra em português ou japonês."

    );

  }

}


// ==================================================
// Enterキー対応
// ==================================================

function keyPressed() {

  if (

    keyCode === ENTER ||

    key === "Enter"

  ) {

    searchWord();

  }

}


// ==================================================
// 画面サイズ変更
// ==================================================

function windowResized() {

  setupLayout();

  resizeCanvas(

    canvasW,

    canvasH

  );

  adjustElements();

}

// ==================================================
// 使い方ウィンドウを表示
// ==================================================

function showHowTo() {

  // ----------------------------------------------
  // すでに開いていたら削除
  // ----------------------------------------------

  if (howToOverlay) {
    howToOverlay.remove();
    howToOverlay = null;
  }

  if (howToWindow) {
    howToWindow.remove();
    howToWindow = null;
  }


  // ==================================================
  // 外側のオーバーレイ
  // ==================================================

  howToOverlay = createDiv("");

  howToOverlay.style(
    "position",
    "fixed"
  );

  howToOverlay.style(
    "left",
    "0"
  );

  howToOverlay.style(
    "top",
    "0"
  );

  howToOverlay.style(
    "width",
    "100vw"
  );

  howToOverlay.style(
    "height",
    "100vh"
  );

  howToOverlay.style(
    "background-color",
    "rgba(0,0,0,0.25)"
  );

  howToOverlay.style(
    "z-index",
    "1000"
  );


  // ----------------------------------------------
  // 外側をクリックしたら閉じる
  // ----------------------------------------------

  howToOverlay.mousePressed(
    closeHowTo
  );


  // ==================================================
  // 使い方ウィンドウ
  // ==================================================

  howToWindow = createDiv(

    "<div style='font-size:20px; font-weight:bold; margin-bottom:15px;'>" +

    "📖 辞書の使い方" +

    "</div>" +


    "<div style='font-size:15px; line-height:1.7;'>" +

    "調べたい言葉を検索欄に入力してください。日本語でもポルトガル語でも検索できます。<br><br>" +


    "🔹 <b>完全一致</b><br>" +

    "入力した言葉と完全に一致する単語を検索します。<br><br>" +


    "🔹 <b>前方一致</b><br>" +

    "入力した文字から始まる単語を検索します。<br><br>" +


    "🔹 <b>部分一致</b><br>" +

    "入力した文字を含む単語を検索します。<br><br>" +
    
    "💡 「？」をクリックすると、辞書の使い方ページが開きます。<br>" +
    "💡 「＋」をクリックすると、辞書にない単語を追加リクエストできます。<br>" +
    "💡 ポルトガル語は、アクセント記号を付けずに入力しても検索できます。<br>" +
    "💡 大文字と小文字を区別しない設定になっています。" +

    "</div>" +


    "<br>" +

    "<hr>" +

    "<br>" +


    "<div style='font-size:20px; font-weight:bold; margin-bottom:15px;'>" +

    "📖 Como usar o dicionário" +

    "</div>" +


    "<div style='font-size:15px; line-height:1.7;'>" +

    "Digite a palavra que você quer pesquisar no campo de busca. " +

    "É possível pesquisar tanto em japonês quanto em português.<br><br>" +

    "*Da esquerda para a direita, a ordem é:<br>" +
    "🔹 <b>Correspondência exata</b><br>" +

    "Busca palavras que correspondem exatamente ao termo digitado.<br><br>" +


    "🔹 <b>Correspondência no início</b><br>" +

    "Busca palavras que começam com o termo digitado.<br><br>" +


    "🔹 <b>Correspondência parcial</b><br>" +

    "Busca palavras que contêm o termo digitado.<br><br>" +

    "💡 Clique em “?” para saber como usar o dicionário.<br>" +
    "💡 Clique em “＋” para solicitar a inclusão de uma palavra que não está no dicionário.<br>" +
    "💡 No português, você também pode pesquisar sem usar os acentos." +

    "</div>" +


    "<br>" +

    "<button id='closeHowTo' " +

    "style='padding:8px 20px; " +

    "border:1px solid #a0b2c6; " +

    "border-radius:15px; " +

    "background:#ffffff; " +

    "color:#4a76a8; " +

    "cursor:pointer;'>" +

    "閉じる" +

    "</button>"

  );


  // ==================================================
  // ウィンドウのサイズ
  // ==================================================

  let modalW =
    min(380, canvasW - 30);


  let modalH =
    min(500, windowHeight - 120);


  howToWindow.size(
    modalW,
    modalH
  );


  // ==================================================
  // ウィンドウの位置
  // ==================================================

  howToWindow.position(

    (windowWidth - modalW) / 2,

    60

  );


  // ==================================================
  // ウィンドウのデザイン
  // ==================================================

  howToWindow.style(
    "position",
    "fixed"
  );

  howToWindow.style(
    "background-color",
    "#ffffff"
  );

  howToWindow.style(
    "border",
    "2px solid #a0b2c6"
  );

  howToWindow.style(
    "border-radius",
    "15px"
  );

  howToWindow.style(
    "padding",
    "20px"
  );

  howToWindow.style(
    "box-sizing",
    "border-box"
  );

  howToWindow.style(
    "box-shadow",
    "0 5px 20px rgba(0,0,0,0.2)"
  );

  howToWindow.style(
    "z-index",
    "1001"
  );

  howToWindow.style(
    "overflow-y",
    "auto"
  );


  // ==================================================
  // ウィンドウ内部をクリックしても閉じない
  // ==================================================

  howToWindow.mousePressed(
    function(event) {

      event.stopPropagation();

    }
  );


  // ==================================================
  // 閉じるボタン
  // ==================================================

  let closeButton =
    select("#closeHowTo");


  closeButton.mousePressed(
    function(event) {

      event.stopPropagation();

      closeHowTo();

    }
  );

}


// ==================================================
// 使い方ウィンドウを閉じる
// ==================================================

function closeHowTo() {

  if (howToWindow) {

    howToWindow.remove();

    howToWindow = null;

  }


  if (howToOverlay) {

    howToOverlay.remove();

    howToOverlay = null;

  }

}

// ==================================================
// 使い方ウィンドウを表示、はここまで
// ==================================================

// ==================================================
// +単語追加ボタンのウィンドウを表示、はここから
// ==================================================

function showAddWord() {

  // ----------------------------------------------
  // すでに開いていたら削除
  // ----------------------------------------------

  if (addWordOverlay) {
    addWordOverlay.remove();
    addWordOverlay = null;
  }

  if (addWordWindow) {
    addWordWindow.remove();
    addWordWindow = null;
  }


  // ==================================================
  // 外側のオーバーレイ
  // ==================================================

  addWordOverlay = createDiv("");

  addWordOverlay.style(
    "position",
    "fixed"
  );

  addWordOverlay.style(
    "left",
    "0"
  );

  addWordOverlay.style(
    "top",
    "0"
  );

  addWordOverlay.style(
    "width",
    "100vw"
  );

  addWordOverlay.style(
    "height",
    "100vh"
  );

  addWordOverlay.style(
    "background-color",
    "rgba(0,0,0,0.25)"
  );

  addWordOverlay.style(
    "z-index",
    "1000"
  );


  // ----------------------------------------------
  // 外側をクリックしたら閉じる
  // ----------------------------------------------

  addWordOverlay.mousePressed(
    closeAddWord
  );


  // ==================================================
  // 単語追加ウィンドウ
  // ==================================================

  addWordWindow = createDiv(

    "<div style='font-size:20px; font-weight:bold; margin-bottom:15px;'>" +

    "単語を追加/Adicionar palavra" +

    "</div>" +


    "<div style='font-size:15px; line-height:1.7;'>" +

    "検索しても見つからない単語を入力してください。次回アップデート時に追加いたします。<br><br>" +

    "Digite a palavra que você gostaria de adicionar ao dicionário. Será adicionada na próxima atualização." +

    "</div>" +


    "<br>" +

  // この下の行は単語追加ページに関する内容。
  "<textarea id='addWordInput' placeholder='単語を入力してください' style='width:100%; height:70px; box-sizing:border-box; padding:8px 10px; font-size:15px; border:1px solid #a0b2c6; border-radius:8px; resize:vertical; font-family:inherit;'></textarea>" +

    "<br><br>" +


    "<button id='sendAddWord' " +
    "style='padding:8px 18px; " +
    "margin-right:8px; " +
    "border:1px solid #a0b2c6; " +
    "border-radius:15px; " +
    "background:#ffffff; " +
    "color:#4a76a8; " +
    "cursor:pointer;'>" +

    "送信する" +

    "</button>" +


    "<button id='cancelAddWord' " +
    "style='padding:8px 18px; " +
    "border:1px solid #a0b2c6; " +
    "border-radius:15px; " +
    "background:#ffffff; " +
    "color:#4a76a8; " +
    "cursor:pointer;'>" +

    "キャンセルする" +

    "</button>"

  );


  // ==================================================
  // ウィンドウのサイズ
  // ==================================================

  let modalW =
    min(380, canvasW - 30);


  let modalH =
    300;


  // ==================================================
  // ウィンドウの位置
  // ==================================================

  addWordWindow.position(

    (windowWidth - modalW) / 2,

    150

  );


  // ==================================================
  // ウィンドウのサイズ
  // ==================================================

  addWordWindow.size(
    modalW,
    modalH
  );


  // ==================================================
  // ウィンドウのデザイン
  // ==================================================

  addWordWindow.style(
    "position",
    "fixed"
  );

  addWordWindow.style(
    "background-color",
    "#ffffff"
  );

  addWordWindow.style(
    "border",
    "2px solid #a0b2c6"
  );

  addWordWindow.style(
    "border-radius",
    "15px"
  );

  addWordWindow.style(
    "padding",
    "20px"
  );

  addWordWindow.style(
    "box-sizing",
    "border-box"
  );

  addWordWindow.style(
    "box-shadow",
    "0 5px 20px rgba(0,0,0,0.2)"
  );

  addWordWindow.style(
    "z-index",
    "1001"
  );


  // ==================================================
  // ウィンドウ内部をクリックしても閉じない
  // ==================================================

  addWordWindow.mousePressed(
    function(event) {

      event.stopPropagation();

    }
  );


  // ==================================================
  // 入力欄
  // ==================================================

  addWordInput =
    select("#addWordInput");


  // ==================================================
  // キャンセルボタン
  // ==================================================

  let cancelButton =
    select("#cancelAddWord");


  cancelButton.mousePressed(
    function(event) {

      event.stopPropagation();

      closeAddWord();

    }
  );


  // ==================================================
  // 送信ボタンと送信の設定ここから
  // ==================================================

  let sendButton =
    select("#sendAddWord");

sendButton.mousePressed(function(event) {

  event.stopPropagation();

  let word = addWordInput.value().trim();

  if (word === "") {

    alert("単語を入力してください。");

    return;

  }

  fetch(
    "https://leandroshimura.com/wp-json/music-dictionary/v1/add-word",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        word: word
      })
    }
  )

  .then(response => response.json())

  .then(data => {

    console.log("WordPressからの返答：", data);

    if (data.success) {

      alert(
        "ありがとうございます！\n" +
        "「" + word + "」を受け取りました。"
      );

      closeAddWord();

    } else {

      alert(
        "送信できませんでした。"
      );

    }

  })

  .catch(error => {

    console.error(error);

    alert(
      "送信中にエラーが発生しました。"
    );

  });

});

  //単語送信の設定ここまで
  
}


// ==================================================
// 単語追加ウィンドウを閉じる
// ==================================================

function closeAddWord() {

  if (addWordWindow) {

    addWordWindow.remove();

    addWordWindow = null;

  }


  if (addWordOverlay) {

    addWordOverlay.remove();

    addWordOverlay = null;

  }

}

// ==================================================
// +単語追加ボタンのウィンドウを表示、はここまで
// ==================================================


