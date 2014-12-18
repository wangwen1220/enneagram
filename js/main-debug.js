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
        $swiper.data('swiper').swipeTo(0);
      }

      if (pagein.id === 'page-home') {
        $html.addClass('home');
      } else {
        $html.removeClass('home');
      }
    };

    // 初始化 Swiper
    tests.list = tests.list.splice(-3);
    $swiper[0].innerHTML = template('tests', tests);

    $swiper.swiper({
      // pagination: '.pagination',
      // paginationClickable: true,
      // noSwiping: true,
      simulateTouch: false,
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

        window.location.hash = '#&page-chart';

        // 初始化图表
        var ichart = echarts.init(document.getElementById('chart'));

        // 为图表对象加载数据
        ichart.setOption({
          title: {
            text: '某站点用户访问来源',
            // subtext: '纯属虚构',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['1号: ' + $checked.filter('[value=D]').length, '2号', '3号', '4号', '5号', '6号', '7号', '8号', '9号']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {
                show: true
              },
              dataView: {
                show: true,
                readOnly: false
              },
              magicType: {
                show: true,
                type: ['pie', 'funnel'],
                option: {
                  funnel: {
                    x: '25%',
                    width: '50%',
                    funnelAlign: 'left',
                    max: 1548
                  }
                }
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          // calculable: true,
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [{
              value: $checked.filter('[value=D]').length,
              label: 'xx',
              name: '1号: ' + $checked.filter('[value=D]').length
            }, {
              value: $checked.filter('[value=F]').length,
              label: 'label',
              name: '2号'
            }, {
              value: $checked.filter('[value=C]').length,
              label: 'label',
              name: '3号'
            }, {
              value: $checked.filter('[value=E]').length,
              label: 'label',
              name: '4号'
            }, {
              value: $checked.filter('[value=H]').length,
              label: 'label',
              name: '5号'
            }, {
              value: $checked.filter('[value=B]').length,
              label: 'label',
              name: '6号'
            }, {
              value: $checked.filter('[value=I]').length,
              label: 'label',
              name: '7号'
            }, {
              value: $checked.filter('[value=J]').length,
              label: 'label',
              name: '8号'
            }, {
              value: $checked.filter('[value=A]').length,
              label: 'label',
              name: '9号'
            }]
          }]
        });

        // var pieData = [{
        //   value: $checked.filter('[value=D]').length,
        //   color: '#E87C25',
        //   highlight: '#EEA366',
        //   // label: 'D'
        //   label: '1号'
        // }, {
        //   value: $checked.filter('[value=F]').length,
        //   color: '#FE8463',
        //   highlight: '#FEA891',
        //   // label: 'F'
        //   label: '2号'
        // }, {
        //   value: $checked.filter('[value=C]').length,
        //   color: '#FCCE10',
        //   highlight: '#FCDC57',
        //   // label: 'C'
        //   label: '3号'
        // }, {
        //   value: $checked.filter('[value=E]').length,
        //   color: '#27727B',
        //   highlight: '#679CA2',
        //   // label: 'E'
        //   label: '4号'
        // }, {
        //   value: $checked.filter('[value=H]').length,
        //   color: '#F3A43B',
        //   highlight: '#F6BF75',
        //   // label: 'H'
        //   label: '5号'
        // }, {
        //   value: $checked.filter('[value=B]').length,
        //   color: '#B5C334',
        //   highlight: '#CBD570',
        //   // label: 'B'
        //   label: '6号'
        // }, {
        //   value: $checked.filter('[value=I]').length,
        //   color: '#60C0DD',
        //   highlight: '#8FD2E7',
        //   // label: 'I'
        //   label: '7号'
        // }, {
        //   value: $checked.filter('[value=G]').length,
        //   color: '#28A428',
        //   highlight: '#68BF68',
        //   // label: 'G'
        //   label: '8号'
        // }, {
        //   value: $checked.filter('[value=A]').length,
        //   color: '#C1232B',
        //   highlight: '#D3656A',
        //   // label: 'A'
        //   label: '9号'
        // }];

        // var ctx = $('<canvas width="300" height="300"/>').appendTo($('#chart').empty())[0].getContext('2d');
        // // var ctx = $id('chart').getContext('2d');
        // // var chart = $id('chart');
        // // var ctx = chart.getContext('2d');
        // // ctx.clearRect(0, 0, chart.width, chart.height)
        // new Chart(ctx).Pie(pieData);

        return;
      }

      $this.parent().animate({
        'right': '-50px'
      }, 500, function() {
        $(this).css('right', 'auto');
        swiper.swipeNext();
        // $(this).animate({'right': 0}, 0, function() {
        //   swiper.swipeNext();
        // });
      });

      // setTimeout(function() {
      //   $swiper.data('swiper').swipeNext();
      // }, 300);
    });

    // 重置测试
    $('#page-chart').on('click', '.content > a', function() {
      $swiper.find(':radio').prop('checked', false);
      // window.location.reload();
    });
  });
})(jQuery);