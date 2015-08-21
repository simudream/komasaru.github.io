// ページロード時
jQuery(document).ready(function(){
    // アクセスカウンター処理
    var referer = document.referrer;
    jQuery.ajax({
        type: 'GET',
        url: 'http://www.mk-mode.com/rails/json_blog?callback=?',
        dataType: 'json',
        data: {http_referer: referer},
        success: function(d){
            $("#uptime"      ).html(d.uptime);
            $("#pv-total"    ).text(insertComma(d.pv_total    ));
            $("#pv-today"    ).text(insertComma(d.pv_today    ));
            $("#pv-yesterday").text(insertComma(d.pv_yesterday));
        },
        error: function(d, s, t) {
            $("#uptime"      ).text('[ ERROR ]');
            $("#pv-total"    ).text('[ ERROR ]');
            $("#pv-today"    ).text('[ ERROR ]');
            $("#pv-yesterday").text('[ ERROR ]');
        }
    });

    // Scroll Top Buton 
    var topBtn = $('#page-top');
    topBtn.hide();

    // スクロールが100に達したらボタン表示
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            topBtn.fadeIn();
        } else {
            topBtn.fadeOut();
        }
    });

    // スクロールしてトップ
    topBtn.click(function () {
    $('body,html').animate({
        scrollTop: 0
        }, 500);
        return false;
    });

    // nav 固定
    var nav    = $('#nav'),
        offset = nav.offset();

    $(window).scroll(function () {
        if($(window).scrollTop() > offset.top - 2) {
            nav.addClass('fixed');
        } else {
            nav.removeClass('fixed');
        }
    });

    // 外部リンクを別窓で開く
    $("a[href^='http']:not([href*='" + location.hostname + "'])").attr('target', '_blank');
});

// カンマ挿入
function insertComma( str ) {
    var num = new String( str ).replace( /,/g, "" );
    while ( num != ( num = num.replace( /^(-?\d+)(\d{3})/, "$1,$2" ) ) );
    return num;
}

