/*
思路： 将img的真实地址不放在src里，而是放到一个自定义属性里，比如： data-src
步骤：
1. 对于所有的img标签，把真实的地址放入自定义属性data-src
2. 当滚动页面时，检查页面所有的img标签，看看这个标签是否出现在我们的视野里；
  当出现在我们视野时，再去判断它是否已经加载过；
  如果没有加载过，加载它

注意点:
1. 在滚动之前，先做一次判断，否则的话刚进入页面没有滚动的时候，看到的是空白
2. 当scroll事件触发时，使用setTimeout，因为每滚动一点点，lazyLoad函数就要执行很多次，对性能有影响
3. 初始的img  的 src 最好设置为同一个src . src 缺失的时候可能有的浏览器会出现报错，影响用户体验

 */


lazyLoad(); // 在滚动之前，先做一次判断，否则的话刚进入页面没有滚动的时候，看到的是空白

var clock;
$(window).on('scroll', function () {
    if (clock) {
        clearTimeout(clock);
    }
    clock = setTimeout(function () {
        lazyLoad();
        console.log('load')
    }, 300)   //  使用setTimeout，是因为每滚动一点点，lazyLoad函数就要执行很多次，对性能有影响
});

function lazyLoad() {
    $('.ct img').each(function () {
<<<<<<< HEAD
        if (checkShow($(this)) && !isloaded($(this))) {
            loadImg($(this))
=======
        if (checkShow($(this)) && !isloaded($(this)) ) {
            loadImg($(this));
            console.log($(this).text()+'true')
>>>>>>> gh-pages
        }
    });
}

function checkShow($img) {
    var $scrollTop = $(window).scrollTop();
    var $windowHeight = $(window).height();
    var $imgPosition = $img.offset().top;
    if (($imgPosition >= $scrollTop) && ($imgPosition <= ($scrollTop + $windowHeight) )) {
        return true;
    }
    return false

}  // 判断图片是否已经出现在我们视野


function isloaded($img) {
    return $img.attr('data-src') === $img.attr('src');
} // 判断图片是否已经加载

function loadImg($img) {
    $img.attr('src', $img.attr('data-src'))
} // 加载图片





