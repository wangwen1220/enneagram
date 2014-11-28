////////////////////////////////////////////////////////////////////////////////
// 名称: 主程序
// 作者: Steven
// 说明: Require jQuery
// 更新: 2014-8-1
////////////////////////////////////////////////////////////////////////////////

// Main
(function($) {
  // Helpers
  var isIE6 = !!window.ActiveXObject && !window.XMLHttpRequest;

  function isString(val) {
    return Object.prototype.toString.call(val) === '[object String]';
  }

  function $id(id) {
    // return 'string' === typeof id ? document.getElementById(id) : id;
    // return $.type('test') === 'string' ? document.getElementById(id) : id;
    return isString(id) ? document.getElementById(id) : id;
  }

  // 文档加载完执行
  $(function() {
    // 通用变量
    var $html = $('html');
    var $header = $('header');
    var $main = $('main');

    // 初始化 Swiper
    $('.swiper-responsive').swiper({
      // pagination: '.pagination',
      // paginationClickable: true,
      onFirstInit: function(swiper) {
        $('.swiper-responsive').removeClass('fn-vh');
      }
    }).on('click', '.swiper-nav a', function(e) {
      $(e.delegateTarget).data('swiper').swipeNext();
    }).on('click', 'label', function(e) {
      $(e.delegateTarget).data('swiper').swipeNext();
    });
  });
})(jQuery);