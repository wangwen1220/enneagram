!function(e){!!window.ActiveXObject&&!window.XMLHttpRequest;e(function(){var a=e("html"),t=e("#username"),n=e("#swiper-responsive"),i=e("#js-counter"),l="webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";Mobilebone.callback=function(e){"page-tests"===e.id&&(n.data("swiper").reInit(),n.data("swiper").swipeTo(0)),"page-home"===e.id?a.addClass("home"):a.removeClass("home")},t.on("keyup",function(){var a=e(this).next("a"),t=e.trim(this.value);a[t?"removeClass":"addClass"]("disabled"),t?a.addClass("animated bounceInDown").one(l,function(){e(this).removeClass("animated bounceInDown")}):a.addClass("animated bounceOutUp").one(l,function(){e(this).removeClass("animated bounceOutUp")})}).on("blur",function(){this.value=e.trim(this.value)}).trigger("keyup"),e("#page-home").on("click","a.disabled",function(){return!1}),tests.list=tests.list.splice(-3),n[0].innerHTML=template("tests",tests),n.swiper({simulateTouch:!1,onFirstInit:function(a){var t=a.slides.length,n=a.activeIndex+1,l=t-n;i.children(".current").html(n),i.children(".left").html(l),i.children(".total").html(t),e(a.container).removeClass("fn-vh")},onSlideChangeEnd:function(e){var a=e.activeIndex+1,t=e.slides.length-a;i.children(".current").html(a),i.children(".left").html(t)}}).on("click",".swiper-nav a",function(a){e(a.delegateTarget).data("swiper").swipeNext()}).on("change","label",function(){var a=e(this),i=(a.parents(".swiper-slide"),n.data("swiper"));if(i.activeIndex===i.slides.length-1){var l=n.find("input:checked");window.location.hash="#&page-chart";var s=echarts.init(document.getElementById("chart")),o=t.val(),r={},c=["D","F","C","E","H","B","I","J","A"];return e.each(c,function(e,a){r[a]=l.filter("[value="+a+"]").length||0}),s.setOption({title:{text:o+"的九型人格测试图表",x:"center"},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"vertical",x:"left",data:["1号: "+r[c[1]],"2号: "+r[c[2]],"3号: "+r[c[3]],"4号: "+r[c[4]],"5号: "+r[c[5]],"6号: "+r[c[6]],"7号: "+r[c[7]],"8号: "+r[c[8]],"9号: "+r[c[9]]]},toolbox:{show:!0,feature:{mark:{show:!0},dataView:{show:!0,readOnly:!1},magicType:{show:!0,type:["pie","funnel"],option:{funnel:{x:"25%",width:"50%",funnelAlign:"left",max:1548}}},restore:{show:!0},saveAsImage:{show:!0}}},series:[{name:"详细测试结果",type:"pie",radius:"55%",center:["50%","50%"],data:[{value:r[c[1]],label:"xx",name:"1号: "+r[c[1]]},{value:r[c[2]],label:"label",name:"2号: "+r[c[2]]},{value:r[c[3]],label:"label",name:"3号: "+r[c[3]]},{value:r[c[4]],label:"label",name:"4号: "+r[c[4]]},{value:r[c[5]],label:"label",name:"5号: "+r[c[5]]},{value:r[c[6]],label:"label",name:"6号: "+r[c[6]]},{value:r[c[7]],label:"label",name:"7号: "+r[c[7]]},{value:r[c[8]],label:"label",name:"8号: "+r[c[8]]},{value:r[c[9]],label:"label",name:"9号: "+r[c[9]]}]}]}),void 0}a.parent().animate({right:"-50px"},500,function(){e(this).css("right","auto"),i.swipeNext()})}),e("#page-chart").on("click",".content > a",function(){n.find(":radio").prop("checked",!1)})})}(jQuery);