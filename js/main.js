!function(e){!!window.ActiveXObject&&!window.XMLHttpRequest;e(function(){var t=(e("html"),e("#swiper-responsive")),n=e("#js-counter");t[0].innerHTML=template("tests",tests),t.swiper({onFirstInit:function(t){var i=t.slides.length,r=t.activeIndex+1,l=i-r;n.children(".current").html(r),n.children(".left").html(l),n.children(".total").html(i),e(t.container).removeClass("fn-vh")},onSlideChangeEnd:function(e){var t=e.activeIndex+1,i=e.slides.length-t;n.children(".current").html(t),n.children(".left").html(i)}}).on("click",".swiper-nav a",function(t){e(t.delegateTarget).data("swiper").swipeNext()}).on("change","label",function(){var n=e(this),i=n.parents(".swiper-slide"),r=t.data("swiper");return r.activeIndex===r.slides.length-1?(console.log("submit"),void 0):(n.parent().animate({right:"-50px"},500,function(){i.animate({right:"auto"},0,function(){r.swipeNext()})}),void 0)})})}(jQuery);