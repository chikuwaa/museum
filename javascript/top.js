$(window).ready(function(){
    $('.btn').click(function(){
        var info_y = $('#info').offset().top
        $('html,body').animate({scrollTop: info_y}, 'normal', 'swing');
    });
    //infoへ移動

    $('.return_top').click(function() {
        $('html,body').animate({scrollTop: 0}, 'normal', 'swing');
    });
    //topへ戻る

    var bk_pict = ["IMG_20170409_143224646.jpg","IMG_6375.jpg","IMG_6382.JPG"];
    var i = 0;
    $("#search_area").css("background-image","url('./flickrimg/"+bk_pict[i]+"')");
    $("<img>").attr("src", './flickrimg/'+bk_pict[i+1] );

    setInterval(function() {
        i++;
        if(i > bk_pict.length -1 ) i = 0;

        $("#search_area").css("background-image","url('./flickrimg/"+bk_pict[i]+"')");
        
        if(i != bk_pict.length -1 ){
            $("<img>").attr("src", './flickrimg/'+bk_pict[i+1] );
        }
        
    }, 10000
    //背景スライドショー
  );
});