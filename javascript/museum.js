$(window).load(function(){
    var touch_x  = 0;      //最初にタップしたXの位置
    var touch_y  = 0;      //最初にタップしたYの位置
    var slide_x  = 0;      //移動したXの位置
    var slide_y  = 0;      //移動したYの位置
    var minus_x  = false;  //マイナス移動 X
    var minus_y  = false;  //マイナス移動 Y
    var main_top = 0;           //guide表示位置調整 top
    var slide_area_left = 0;    //guide表示位置調整 left
    var pict = ["IMG_20170409_143224646.jpg","IMG_6375.jpg","IMG_6382.JPG"]; //スライドショー写真
    var i = 0;              //写真ページ送り用
    var j = 0;              //ナビページ送り用

    /*
    * スライドショー
    */
    //初回
    $("#slide_area img").attr("src",'./flickrimg/'+pict[i]);
    $(".page_n").html( i+1 );
    $(".page_a").html( pict.length );
    $('.show img').attr('src', './flickrimg/'+pict[j]);
    $('.next img').attr('src', './flickrimg/'+pict[j+1]);
    //写真切り替え
    setInterval(slideshow, 10000);

    /*
    * guide表示
    */
    $('.btn').on('click',function(){
        $('.info-icon').toggle();
        $('#guide').toggle();
        $('#howto').toggle();
    
        main_top = $('#main').offset().top;
        slide_area_left = $('#slide_area').offset().left;
        
        $('#howto').offset({ top: main_top ,left: slide_area_left});
        $('#howto').width($('#slide_area').width());
        $('.howto_slide').height($('#slide_area').height());
    });
    //guide表示

    /*
    * 画像送り・戻し
    */
    $('.prv').click(function(){
        if(i == j){
            slideback();
        }else{
            i=j;
            slideback();
        }
    });
    $('.show').click(function(){
        if(i == j){
            i--;
            j--;
            slideshow();
        }else{
            i=j-1;
            j=i;
            slideshow();
        }
    });
    $('.next').click(function(){
        if(i == j){
            slideshow();
        }else{
            i=j+1;
            j=i;
            slideshow();
        }
    });
    // 画像送り・戻し

    /*
    * 検索結果移動
    */
    $('.b_btn').click(function(){
        j--;
        navi();
    });
    $('.n_btn').click(function(){
        j++;
        navi();
    });
    // 検索結果移動

    /*
    * モバイルでの情報表示・左右フリック
    */
    //タップ、スワイプ、指を離した時のイベントハンドラ
    //モバイル表示の時のみ
    if( $(window).width() < 551 ){
        $("body").bind("touchstart", TouchStart);
        $("body").bind("touchmove" , TouchMove);
        $("body").bind("touchend"  , TouchLeave);
    }

    /*
    * 関数定義
    */
    //ページ送り
    function slideshow(){
        
        if(i == j){
            j++;            
        }

        i++;
        if(i > pict.length -1 ) i = 0;

        $("#slide_area img").attr("src",'./flickrimg/'+pict[i]);
        $(".page_n").html(i+1);
        
        if( $(window).width() < 551 ){
            if(i != pict.length -1 ){
                $("<img>").attr("src", './flickrimg/'+pict[i+1] );
            }else{
                $("<img>").attr("src", './flickrimg/'+pict[0] );
            }
        }else{
            navi();
        }
    }
    //ページ戻し
    function slideback(){
        
        if(i == j){
            j--;            
        }
        
        i--;
        if(i < 0 ) i = pict.length - 1;

        $("#slide_area img").attr("src",'./flickrimg/'+pict[i]);

        if( $(window).width() > 551 ){
            navi();
        }
    }
    
    //navi表示
    function navi(){
        if(j > pict.length -1 ) j = 0;
        if(j < 0 ) j = pict.length -1;
        
        if(j == 0 ){
            $('.prv img').attr('src', './flickrimg/'+pict[pict.length -1]);
        }else{
            $('.prv img').attr('src', './flickrimg/'+pict[j-1]);
        }
        $('.show img').attr('src', './flickrimg/'+pict[j]);
        if(j != pict.length -1 ){
            $('.next img').attr('src', './flickrimg/'+pict[j+1]);
        }else{
            $('.next img').attr('src', './flickrimg/'+pict[0]);
        }
    }
    
    //タップの位置取得
    function TouchStart( event ) {
        var pos = Position(event);
        touch_x = pos.x;
        touch_y = pos.y;
    }
    
    //スワイプ位置・距離取得
    function TouchMove( event ) {

        var pos = Position(event); //X,Yを得る
    
        //移動した位置から最初の位置を引く
        var cal_x = pos.x - touch_x;
        var cal_y = pos.y - touch_y;
    
        //最初にタップした位置からマイナかプラスを判定
        if(cal_x < 0)
            minus_x = true;
        else
            minus_x = false;

        if(cal_y < 0)
            minus_y = true;
        else
            minus_y = false;
    
        //マイナスの値をプラスに変更
        slide_x = Math.sqrt(Math.pow(cal_x,2));
        slide_y = Math.sqrt(Math.pow(cal_y,2));
    }
    
    //スワイプ方向の検知・動作実行
    function TouchLeave( event ) {

        // 横の移動距離と縦の移動距離を比較して
        // 縦のほうが大きい場合は縦フリックを検知する
        if(slide_y > slide_x){
            if(minus_y === true){
                $("#info_container").slideDown();

            }else{
                $("#info_container").slideUp();

            }
        }else{
            if(minus_x === true){
                slideshow();

            }else{
                slideback();
            }
        }
    }
 
    //現在位置を得る
    function Position(e){
        var x   = e.originalEvent.touches[0].pageX;
        var y   = e.originalEvent.touches[0].pageY;
        x = Math.floor(x);
        y = Math.floor(y);
        var pos = {'x':x , 'y':y};
        return pos;
    }
 
});

