    //フォームのEnter入力を無効
    document.onkeypress = enter;
    function enter(){
      if( window.event.keyCode == 13 ){
        return false;
      }
    }

    //出力先フォームのID
    var th_value1 = document.getElementById('th_value1');//管理番号
    var th_value2 = document.getElementById('th_value2');//タイトル
    var th_value4 = document.getElementById('th_value4');//商品説明(HTML)
    var th_value5 = document.getElementById('th_value5');//ストア検索用キーワード
    var th_value6 = document.getElementById('th_value6');//商品の状態
    var th_value7 = document.getElementById('th_value7');//開始価格
    var th_value8 = document.getElementById('th_value8');//即決価格
    var th_value25 = document.getElementById('th_value25');//配送方法・送料設定

    //文字数のカウントのリセット
    function countReset(){
        countLength(0,'countText');
        getLen(0,'fontCount');
        getLen(0,'countText2');
    }

    //文字数のカウント
    function countLength( text, field ) {
        var result = 0;
        for (var i = 0; i < text.length; i++) {
            result += 1;
        }

        document.getElementById(field).innerText = result;
        if (text.length > 20) {
            th_value1.style.backgroundColor = "red";
        }else{
            th_value1.style.backgroundColor = "";
        }
    }

    function getLen(text, field){
      var result = 0;
      for(var i=0;i<text.length;i++){
        var chr = text.charCodeAt(i);
        if((chr >= 0x00 && chr < 0x81) ||
           (chr === 0xf8f0) ||
           (chr >= 0xff61 && chr < 0xffa0) ||
           (chr >= 0xf8f1 && chr < 0xf8f4)){
          //半角文字の場合は0.5を加算
          result += 0.5;
        }else{
          //それ以外の文字の場合は1を加算
          result += 1;
        }
      }
      document.getElementById(field).innerText = result;

      if (field == 'fontCount' && result > 60 ) {
          th_value2.style.backgroundColor = "red";
      }else if (field == 'fontCount' && result <= 60 ){
          th_value2.style.backgroundColor = "";
      }

      if (field == 'countText2' && result > 20 ) {
          th_value5.style.backgroundColor = "red";
      }else if (field == 'countText2' && result <= 20 ){
          th_value5.style.backgroundColor = "";
      }
    }


    //起動時商品情報入力項目
    var defaultHTML = document.getElementById('itemText').innerHTML;
    var popup = document.getElementById('js-popup');
    popup.classList.add('is-show');

    var blackBg = document.getElementById('js-black-bg');
    var closeBtn = document.getElementById('js-close-btn');

    closePopUp(blackBg);
    closePopUp(closeBtn);

    function closePopUp() {
        closeBtn.addEventListener('click', function() {
            popup.classList.remove('is-show');
        });
    }
    //ここまで起動時商品情報入力項目


    function addpop() {
        popup.classList.add('is-show');
        document.getElementById('itemText').innerHTML = defaultHTML;
    }


    //ここから商品情報をテーブルに追加のコード
    function dateSub(){
        // ストア内商品検索キーワード
        codeS = document.getElementById('storeCode').value;
        if (codeS !== "") {
            th_value5.value = codeS;
            getLen( codeS, 'countText2');
        }else{
            alert('商品コードを入力してください');
            return false;
        }

        //店舗名(漢字)
        var storeSelect = document.getElementById('storeName');
        var selectOption = storeSelect.selectedIndex;
        var storeText = storeSelect.options[selectOption].text;

        //管理番号
        storeNameS = storeSelect.value;
        controlNumber = codeS.replace(/\s+/g, "") + storeNameS;
        th_value1.value = controlNumber;
        document.getElementById('itemCode').innerText = controlNumber;
        countLength( controlNumber, 'countText' );


        //開始価格
        var startPrice = document.getElementById('startPrice').value.replace(/\s+/g, "");
        if (startPrice !== "") {
            th_value7.value = startPrice;
        }else{
            alert('開始価格を入力してください');
            return false;
        }

        //終了価格
        var finishPrice = document.getElementById('finishPrice').value.replace(/\s+/g, "");
        if (finishPrice !== "") {
            th_value8.value = finishPrice;
        }

        //商品の状態を出力する
        var productStatus = document.getElementById('productStatus');
        var productOption = productStatus.selectedIndex;
        var productText = productStatus.options[productOption].text;
        if (productOption !== 0) {
            th_value6.value = productStatus.value;
            document.getElementById('itemRank').insertAdjacentHTML('beforeend',productText );
        }else{
            alert('状態(ランク)を選択してください。');
            return false;
        }

        //送料を出力する
        var ShippingMethod = document.getElementById('ShippingMethod');
        var ShpMtoOption = ShippingMethod.selectedIndex;
        if (ShpMtoOption !== 0) {
            var postageCode = ShippingMethod.options[ShpMtoOption].value; 
            th_value25.value = postageCode;
         
            for( key in postageImage ) {
                if( key == postageCode ) {
                    var postageImageSrc = postageImage[key];
                    document.getElementById('postage').innerHTML = '<IMG SRC=http://www.sutenaide.com/upload/save_image/' + postageImageSrc + '.jpg>';

                }
            }
        }else{
            alert('配送方法を指定してください');
            return false;
        }

        //ラジオボタンオブジェクトを取得する
        var radios = document.getElementsByName('setName');
        var radioId;

        //取得したラジオボタンオブジェクトから選択されたものを探し出す
        for(var i = 0; i < radios.length; i ++){
            if (radios[i].checked) {
              //選択されたラジオボタンのvalue値を取得する
              radioId = [i];
              var result = radios[i].value;
              break;
            }
        }
        if (radioId == null) {
            alert('商品の種類を選択してください');
            return false;
        }

        var titleArray = [];
        //ラジオボタンでホイールのみ、セットを選択した時
        if(radioId == 1 || radioId == 2){
            //フォームに入力したホイールのデータを変数に格納する
            wheelMaker = document.getElementById('wheelMaker').value.replace(/\s+/g, "");
            wheelBrand = document.getElementById('wheelBrand').value.replace(/\s+/g, "");
            wheelIn =  document.getElementById('wheelInti').value;
            wheelInti = wheelIn + 'インチ';
            wheelJ = document.getElementById('wheelJ').value + 'J';
            wheelOffpm = document.getElementById('wheelOffpm').value;
            wheelOffset = wheelOffpm + document.getElementById('wheelOffset').value;
            wheelPcd = document.getElementById('wheelPcd').value;
            wheelH = document.getElementById('wheelH').value + 'H';
            wheelPJ = wheelPcd + '/' + wheelH;

            //ホイールの情報を配列に格納する
            titleArray.push(wheelInti, wheelMaker, wheelBrand, wheelJ, wheelOffset, wheelPJ);

            document.getElementById('itemWhMaker').innerText = wheelMaker;
            document.getElementById('itemWhBrand').innerText = wheelBrand;
            document.getElementById('itemWhInti').innerText = wheelInti;
            document.getElementById('itemWhJ').innerText = wheelJ;
            document.getElementById('itemWhOffset').innerText = wheelOffset;
            document.getElementById('itemWhPcd').innerText = wheelPcd;
            document.getElementById('itemWhH').innerText = wheelH;

            if(radioId == 1){
                document.getElementById('tireTable').remove();

            }
        }
        
        //ラジオボタンでセットを選択した時
        if (radioId == 2) {
            titleArray.shift();
            titleArray[2] = wheelJ + '-' + wheelIn;        
        }

        //ラジオボタンでタイヤのみ、セットを選択した時
        if (radioId == 0 || radioId == 2) {
            //フォームに入力したタイヤのデータを変数に格納する
            var tireMaker = document.getElementById('tireMaker').value.replace(/\s+/g, "");        
            var tireBrand = document.getElementById('tireBrand').value.replace(/\s+/g, "");
            var tireSize = document.getElementById('tireSize').value;        
            var tireGroove = document.getElementById('tireGroove').value + '分山';        
            var tireBirth = document.getElementById('tireBirth').value + '年製';

            //タイヤの情報を配列に格納する
           titleArray.unshift(tireSize, tireMaker, tireBrand);

            document.getElementById('itemTrMaker').innerText = tireMaker;       
            document.getElementById('itemTrBrand').innerText = tireBrand;
            document.getElementById('itemTrSize').innerText = tireSize;
            document.getElementById('itemTrGroove').innerText = tireGroove;
            document.getElementById('itemTrBirth').innerText = tireBirth;

            if(radioId == 0){
                document.getElementById('wheelTable').remove();
            }
        }

            //適合車種を入力している場合出力する
             var carConform = document.getElementById('carConform').value.trim().replace(/　/g," ");
            if (carConform !== "") {
                carConform += '等';
                titleArray.push(carConform);
                document.getElementById('itemCaConform').innerText = carConform;
            }

            //備考を入力している場合出力する
            var remarks = document.getElementById('remarks').value.trim().replace(/　/g," ");
            if (remarks !== "") {
                 titleArray.push(remarks);
            }

            //店舗名を選択している場合出力する
            if (storeText !== ""){
                titleArray.push(storeText);
            }

            //セット名を入力している場合出力する
            if (result !== null) {
                titleArray.unshift(result);
            }

        var titleText = titleArray.join(" ");
        th_value2.value = titleText;
        document.getElementById('itemProduct').innerText = titleText;
        getLen(titleText, 'fontCount');
        

        //商品説明欄への出力(HTML形式)
        for( key in textJsStores ) {
            if( key == storeText ) {
                var itemstore = document.getElementById('itemStore');
                itemStore.innerHTML = (textJsStores[key]);
            }
        }

        //商品説明欄のHTMLを文字列に変換
        var itemText = document.getElementById('itemText');
        itemText = itemText.innerHTML.replace(/\r?\n/g,'').replace(/&lt;/g, "<").replace(/&gt;/g, ">");   
        th_value4.value = itemText;
    
        //送信後にポップアップを閉じる
        var submitClose = document.getElementById('js-popup');
        submitClose.classList.remove('is-show');
    }


     //ここから表の行追加のコード
    function add_line() {
        for(var i = 0; i < document.getElementsByName("table1_cell_value").length; i++){
            if(document.getElementsByName("table1_cell_value")[i].value ==""){
                alert("未入力項目があります。");
                return false;
            }else if(document.getElementsByName("table1_cell_value")[i].style.backgroundColor == "red"){
                alert("文字数がオーバーしています。");
                return false;
            }
        }

        var submitCheck = window.confirm( 'この内容で登録してよろしいですか？');
        if (submitCheck) {
            var table = document.getElementById('table1');//id=table1という要素を取得
            var row = table.insertRow(-1);//id=table1の中にtrタグを最後の子要素として追加
            var cells = new Array();
            for(var i = 0; i < table.rows[0].cells.length; i++){
                cells[i] = row.insertCell(-1);//新しく作ったrowの中にtrタグを最後の子要素として追加
                cells[i].innerText=document.getElementsByName("table1_cell_value")[i].value;
            }
            document.syohinData.reset();
            document.csvData.reset();
            document.getElementById('itemText').innerHTML = defaultHTML;
            popup.classList.add('is-show');
        }else{
            return false;
        }
    }
    //ここまで表の列追加のコード

    //ここからCSV出力＆ダウンロード
    function handleDownload() {
        var utf8Array = new Uint8Array([0xEF, 0xBB, 0xBF]);//文字コードをBOM付きUTF-8に指定
        var table = document.getElementById('table1');//id=table1という要素を取得
        var data_csv="";//ここに文字データとして値を格納していく

        for(var i = 0;  i < table.rows.length; i++){
          for(var j = 0; j < table.rows[i].cells.length; j++){
            data_csv += table.rows[i].cells[j].innerText;//HTML中の表のセル値をdata_csvに格納
            if(j == table.rows[i].cells.length-1) data_csv += "\n";//行終わりに改行コードを追加
            else data_csv += ",";//セル値の区切り文字として,を追加
          }
        }

        var blob = new Blob([ utf8Array, data_csv], { "type" : "auction/csv" });//data_csvのデータをcsvとしてダウンロードする関数
        if (window.navigator.msSaveBlob) { //IEの場合の処理
            window.navigator.msSaveBlob(blob, "auction.csv"); 
            window.navigator.msSaveOrOpenBlob(blob, "auction.csv");// msSaveOrOpenBlobの場合はファイルを保存せずに開ける
        } else {
            document.getElementById("download").href = window.URL.createObjectURL(blob);
        }

        delete data_csv;//data_csvオブジェクトはもういらないので消去してメモリを開放
    }
    //ここまでCSV出力＆ダウンロード
