let inputField;
let searchButton;
let resultBox;
let searchMode;


// ==============================
// 画面サイズ
// ==============================

let canvasW;
let canvasH;

let isMobile;


// ==============================
// 2. 初期設定
// ==============================

function setup() {

  setupLayout();

  createCanvas(canvasW, canvasH);

  // ------------------------------
  // 入力欄
  // ------------------------------

  inputField = createInput('');

  inputField.style('font-size', '16px');
  inputField.style('border', '2px solid #a0b2c6');
  inputField.style('border-radius', '20px');
  inputField.style('padding-left', '15px');
  inputField.style('outline', 'none');
  inputField.style('box-sizing', 'border-box');


  // ------------------------------
  // 検索ボタン
  // ------------------------------

  searchButton = createButton('検索');

  searchButton.style('background-color', '#4a76a8');
  searchButton.style('color', '#ffffff');
  searchButton.style('font-size', '16px');
  searchButton.style('font-weight', 'bold');
  searchButton.style('border', 'none');
  searchButton.style('border-radius', '20px');
  searchButton.style('cursor', 'pointer');

  searchButton.mousePressed(searchWord);


  // ------------------------------
  // 検索方法の選択
  // ------------------------------

  searchMode = createRadio();

  searchMode.option('exact', '完全一致');
  searchMode.option('prefix', '前方一致');
  searchMode.option('partial', '部分一致');

  // 最初は「前方一致」
  searchMode.selected('prefix');

  searchMode.style('font-size', '14px');


  // ------------------------------
  // 検索結果ボックス
  // ------------------------------

  resultBox = createDiv(
    "調べたい単語を入力して、<br>" +
    "検索ボタンかEnterキーを押してね♬<br>" +
    "(例: テンポ、音程)" +
    "<br><br>" +
    "Digite a palavra que deseja pesquisar e<br>" +
    "clique no botão de pesquisa ou pressione Enter ♬<br>" +
    "(Ex.: som, cavaco)"
  );

  resultBox.style('background-color', '#ffffff');
  resultBox.style('border', '1px solid #e2e8f0');
  resultBox.style('border-radius', '12px');

  resultBox.style('padding', '10px');
  resultBox.style('box-sizing', 'border-box');

  // スクロール
  resultBox.style('overflow-y', 'auto');

  // 文字
  resultBox.style('font-size', '16px');
  resultBox.style('font-family', 'sans-serif');
  resultBox.style('color', '#333333');
  resultBox.style('line-height', '1.5');


  // ------------------------------
  // レイアウト調整
  // ------------------------------

  adjustElements();
}


// ==============================
// 画面サイズを判定
// ==============================

function setupLayout() {

  // 600px未満をスマホとする
  isMobile = windowWidth < 600;


  if (isMobile) {

    // --------------------------
    // スマホ
    // --------------------------

    canvasW = min(420, windowWidth - 20);
    canvasH = 600;

  } else {

    // --------------------------
    // PC
    // --------------------------

    canvasW = 600;
    canvasH = 750;

  }

}


// ==============================
// 入力欄・ボタン・結果ボックス
// ==============================

function adjustElements() {

  // ------------------------------
  // キャンバスを中央上部に配置
  // ------------------------------

  let canvas = document.querySelector('canvas');

  if (canvas) {

    canvas.style.position = 'absolute';

    canvas.style.left =
      (windowWidth - canvasW) / 2 + 'px';

    canvas.style.top = '0px';

  }


  // ------------------------------
  // スマホ
  // ------------------------------

  if (isMobile) {

    // 入力欄
    let inputW = canvasW - 170;

    inputField.position(
      15,
      75
    );

    inputField.size(
      inputW,
      35
    );


    // 検索ボタン
    searchButton.position(
      inputW + 25,
      75
    );

    searchButton.size(
      120,
      39
    );


    // 検索方法
    searchMode.position(
      15,
      120
    );


    // 結果ボックス
    resultBox.position(
      10,
      150
    );

    resultBox.size(
      canvasW - 20,
      400
    );

  }


  // ------------------------------
  // PC
  // ------------------------------

  else {

    // PCでは全体を大きくする

    // 入力欄
    inputField.position(
      35,
      90
    );

    inputField.size(
      350,
      42
    );

    inputField.style(
      'font-size',
      '18px'
    );


    // 検索ボタン
    searchButton.position(
      400,
      90
    );

    searchButton.size(
      150,
      46
    );

    searchButton.style(
      'font-size',
      '18px'
    );


    // 検索方法
    searchMode.position(
      35,
      145
    );

    searchMode.style(
      'font-size',
      '16px'
    );


    // 結果ボックス
    resultBox.position(
      25,
      180
    );

    resultBox.size(
      canvasW - 50,
      500
    );

    resultBox.style(
      'font-size',
      '18px'
    );

  }

}


// ==============================
// 4. 画面描画
// ==============================

function draw() {

  background('#f4f6f9');


  // タイトル部分

  fill('#4a76a8');

  noStroke();

  rect(
    0,
    0,
    width,
    isMobile ? 55 : 70
  );


  // タイトル

  fill('#ffffff');

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

  } else {

    textSize(26);

    text(
      "📖 Português ⇄ 日本語 音楽辞書",
      30,
      35
    );

  }

}


// ==============================
// 5. 検索
// ==============================

function searchWord() {

  // 入力された文字

  let word =
    inputField
      .value()
      .trim()
      .toLowerCase();


  // 空欄の場合

  if (word === "") {

    resultBox.html(
      "⚠️ 単語を入力してください。"
    );

    return;

  }


  // 選択された検索方法

  let mode =
    searchMode.value();


  // ポルトガル語・日本語の両方から検索

  let results =
    dictionary.filter(item => {

      let portuguese =
        item.portuguese.toLowerCase();

      let japanese =
        item.japanese.toLowerCase();


      // 完全一致

      if (mode === 'exact') {

        return portuguese === word ||
               japanese === word;

      }


      // 前方一致

      else if (mode === 'prefix') {

        return portuguese.startsWith(word) ||
               japanese.startsWith(word);

      }


      // 部分一致

      else if (mode === 'partial') {

        return portuguese.includes(word) ||
               japanese.includes(word);

      }

    });


  // ==============================
  // 検索結果
  // ==============================

  if (results.length > 0) {

    let html = "";


    results.forEach((item, index) => {

      html +=

        "<div style='margin-bottom:20px;'>" +

        "<div style='font-size:18px;'>" +
        " " + item.portuguese +
        "</div>" +

        "<div>" +
        " " + item.japanese +
        "</div>" +

        "<div style='margin-top:5px; font-size:13px;'>" +
        "💡 " + item.descriptionJP +
        "<br>" +
        "💡 " + item.descriptionPT +
        "</div>" +

        "</div>";

    });


    resultBox.html(html);

  }


  else {

    resultBox.html(

      "🔍 「" + word +
      "」は見つかりませんでした。" +

      "<br><br>" +

      "ポルトガル語または日本語で検索してみてね。"

    );

  }

}


// ==============================
// 6. Enterキー対応
// ==============================

function keyPressed() {

  if (keyCode === ENTER || key === 'Enter') {

    searchWord();

  }
}


// 画面サイズに合わせて各要素を配置
function updateLayout() {

  let canvasWidth = 420;

  // Canvasを中央に配置したときの左端
  let canvasX = (windowWidth - canvasWidth) / 2;

  // 画面より左にはみ出さないようにする
  if (canvasX < 0) {
    canvasX = 0;
  }

  inputField.position(canvasX + 25, 75);

  searchButton.position(canvasX + 285, 75);

  searchMode.position(canvasX + 25, 120);

  resultBox.position(canvasX + 35, 150);
}


// 画面の向き・サイズが変わったとき
function windowResized() {

  updateLayout();

}
