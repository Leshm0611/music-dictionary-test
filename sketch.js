let inputField;
let searchButton;
let resultBox;
let searchMode;


// 2. 初期設定
function setup() {

  createCanvas(420, 600);

  // 入力欄
  inputField = createInput('');
  inputField.position(25, 75);
  inputField.size(240, 35);

  inputField.style('font-size', '16px');
  inputField.style('border', '2px solid #a0b2c6');
  inputField.style('border-radius', '20px');
  inputField.style('padding-left', '15px');
  inputField.style('outline', 'none');


  // 検索ボタン
  searchButton = createButton('検索');
  searchButton.position(285, 75);
  searchButton.size(110, 39);

  searchButton.style('background-color', '#4a76a8');
  searchButton.style('color', '#ffffff');
  searchButton.style('font-size', '16px');
  searchButton.style('font-weight', 'bold');
  searchButton.style('border', 'none');
  searchButton.style('border-radius', '20px');
  searchButton.style('cursor', 'pointer');

  searchButton.mousePressed(searchWord);

    // 検索方法の選択
  searchMode = createRadio();

  searchMode.option('exact', '完全一致');
  searchMode.option('prefix', '前方一致');
  searchMode.option('partial', '部分一致');

  // 最初は「前方一致」を選択
  searchMode.selected('prefix');

  searchMode.position(25, 120);

  searchMode.style('font-size', '14px');


  // 3. 検索結果のスクロールボックス
  resultBox = createDiv(
    "調べたい単語を入力して、<br>" +
    "検索ボタンかEnterキーを押してね♬<br>" +
    "(例: テンポ、音程)" +
    "<br>" +    "<br>" +
    "Digite a palavra que deseja pesquisar e<br>" +
    "clique no botão de pesquisa ou pressione Enter ♬<br>" +
    "(Ex.: som, cavaco)"
  );

  resultBox.position(35, 150);
  resultBox.size(350, 400);

  resultBox.style('background-color', '#ffffff');
  resultBox.style('border', '1px solid #e2e8f0');
  resultBox.style('border-radius', '12px');

  resultBox.style('padding', '10px');
  resultBox.style('box-sizing', 'border-box');

  // スクロール可能にする
  resultBox.style('overflow-y', 'auto');

  // 文字の設定
  resultBox.style('font-size', '16px');
  resultBox.style('font-family', 'sans-serif');
  resultBox.style('color', '#333333');
  resultBox.style('line-height', '1.5');
}


// 4. 画面描画
function draw() {

  background('#f4f6f9');

  // タイトル部分
  fill('#4a76a8');
  noStroke();
  rect(0, 0, width, 55);

  // タイトル
  fill('#ffffff');
  textSize(20);
  textAlign(LEFT, CENTER);

  text("📖 Português ⇄ 日本語 音楽辞書", 20, 27);
}


// 5. 検索
function searchWord() {

  // 入力された文字
  let word = inputField.value().trim().toLowerCase();


  // 空欄の場合
  if (word === "") {

    resultBox.html(
      "⚠️ 単語を入力してください。"
    );

    return;
  }


  // 選択された検索方法
  let mode = searchMode.value();

  // ポルトガル語・日本語の両方から検索
  let results = dictionary.filter(item => {

    let portuguese = item.portuguese.toLowerCase();
    let japanese = item.japanese.toLowerCase();

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


  // 検索結果が見つかった場合
  if (results.length > 0) {

    let html = "";


    results.forEach((item, index) => {

      // 単語
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

  } else {

    // 見つからなかった場合
    resultBox.html(
      "🔍 「" + word + "」は見つかりませんでした。" +
      "<br><br>" +
      "ポルトガル語または日本語で検索してみてね。"
    );
  }
}


// 6. Enterキー対応
function keyPressed() {

  if (keyCode === ENTER || key === 'Enter') {

    searchWord();

  }
}
