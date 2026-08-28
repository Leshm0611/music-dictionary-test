let inputField;
let searchButton;
let resultBox;
let searchMode;


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

  searchButton = createButton("検索");

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
    "16px"
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


  // 初期設定：前方一致
  searchMode.selected("prefix");

  searchMode.style(
    "font-size",
    "14px"
  );


  // ==================================================
  // 検索結果ボックス
  // ==================================================

  resultBox = createDiv(

    "調べたい単語を入力して、<br>" +

    "検索ボタンかEnterキーを押してね♬<br>" +

    "(例: テンポ、音程)" +

    "<br><br>" +

    "Digite a palavra que deseja pesquisar e<br>" +

    "clique no botão de pesquisa ou pressione Enter ♬<br>" +

    "(Ex.: som, cavaco)"

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
// Canvas・検索欄・結果欄を配置
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
  // スマホ
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
    // 結果ボックス
    // ----------------------------------------------

    resultBox.position(

      canvasX + 10,

      150

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
  // PC
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
    // 結果ボックス
    // ----------------------------------------------

    resultBox.position(

      canvasX + 25,

      180

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

    textSize(20);

    text(

      "📖 Português ⇄ 日本語 音楽辞書",

      20,

      27

    );

  }

  else {

    textSize(26);

    text(

      "📖 Português ⇄ 日本語 音楽辞書",

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


  // アクセント記号を無視した検索用文字
  let word =
    normalizeText(originalWord);


  // ==================================================
  // 空欄
  // ==================================================

  if (word === "") {

    resultBox.html(
      "⚠️ 単語を入力してください。"
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


      // ----------------------------------------------
      // 辞書側の文字もアクセントを無視
      // ----------------------------------------------

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

      "<br><br>" +

      "ポルトガル語または日本語で検索してみてね。"

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
