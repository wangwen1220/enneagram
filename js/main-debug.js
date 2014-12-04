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
    // var $header = $('header');
    // var $main = $('main');
    var $swiper = $('#swiper-responsive');
    var $counter = $('#js-counter');

    // Mobilebone
    Mobilebone.callback = function(pagein, pageout) {
      if (pagein.id === 'page-tests') {
        $swiper.data('swiper').reInit();
      }

      if (pagein.id === 'page-home') {
        $html.addClass('home');
      } else {
        $html.removeClass('home');
      }
    };

    // 初始化 Swiper
    tests.list = tests.list.splice(-5);
    $swiper[0].innerHTML = template('tests', tests);

    $swiper.swiper({
      // pagination: '.pagination',
      // paginationClickable: true,
      onFirstInit: function(swiper) {
        var total = swiper.slides.length;
        var index = swiper.activeIndex + 1;
        var left = total - index;

        $counter.children('.current').html(index);
        $counter.children('.left').html(left);
        $counter.children('.total').html(total);

        $(swiper.container).removeClass('fn-vh');
      },
      onSlideChangeEnd: function(swiper) {
        var index = swiper.activeIndex + 1;
        var left = swiper.slides.length - index;

        $counter.children('.current').html(index);
        $counter.children('.left').html(left);
      }
    }).on('click', '.swiper-nav a', function(e) {
      // console.log($(this))
      $(e.delegateTarget).data('swiper').swipeNext();
    }).on('change', 'label', function(e) { // 这里有一个坑，用 click 事件，input 会冒泡，会导致触发两次
      var $this = $(this);
      var $slide = $this.parents('.swiper-slide');
      var swiper = $swiper.data('swiper');

      if (swiper.activeIndex === swiper.slides.length - 1) {
        var $checked = $swiper.find('input:checked');

        var pieData = [{
          value: $checked.filter('[value=A]').length,
          color: '#C1232B',
          highlight: '#D3656A',
          label: 'A'
        }, {
          value: $checked.filter('[value=B]').length,
          color: '#B5C334',
          highlight: '#CBD570',
          label: 'B'
        }, {
          value:$checked.filter('[value=C]').length,
          color: '#FCCE10',
          highlight: '#FCDC57',
          label: 'C'
        }, {
          value: $checked.filter('[value=D]').length,
          color: '#E87C25',
          highlight: '#EEA366',
          label: 'D'
        }, {
          value: $checked.filter('[value=E]').length,
          color: '#27727B',
          highlight: '#679CA2',
          label: 'E'
        }, {
          value: $checked.filter('[value=F]').length,
          color: '#FE8463',
          highlight: '#FEA891',
          label: 'F'
        }, {
          value: $checked.filter('[value=G]').length,
          color: '#9BCA63',
          highlight: '#B9D991',
          label: 'G'
        }, {
          value: $checked.filter('[value=H]').length,
          color: '#F3A43B',
          highlight: '#F6BF75',
          label: 'H'
        }, {
          value: $checked.filter('[value=I]').length,
          color: '#60C0DD',
          highlight: '#8FD2E7',
          label: 'I'
        }];

        window.location.hash = '#&page-chart';
        var ctx = document.getElementById('chart').getContext('2d');
        new Chart(ctx).Pie(pieData);

        return;
      }

      $this.parent().animate({'right': '-50px'}, 500, function() {
        $slide.animate({'right': 'auto'}, 0, function() {
          swiper.swipeNext();
        });
      });

      // setTimeout(function() {
      //   $swiper.data('swiper').swipeNext();
      // }, 300);
    });

    // 重置测试
    $('#page-chart').on('click', '.content > a', function() {
      $swiper.data('swiper').swipeReset();
      $swiper.find(':radio').prop('checked', false);
      // window.location.reload();
    });
  });
})(jQuery);