var $imgCt = $('.img-ct');
var $imgs = $('.img-ct>li ');
var imgCount = $imgs.length;  //  先缓存起来，即使后面增加了，这里的个数还是原来的
var imgWidth = $imgs.width();
var $pre = $('.arrow.pre');
var $next = $('.arrow.next');
var $bullet = $('.bullet>li');
var pageIndex = 0;
var isAnimate = false;

$imgCt.append($imgs.first().clone());
$imgCt.prepend($imgs.last().clone());
$imgCt.width((imgCount + 2) * imgWidth);
$imgCt.css('left', -imgWidth);

$next.click(next);
$pre.click(pre);
$bullet.click(function(){
    var $index = $(this).index();
    $imgCt.css('left',-($index+1)*imgWidth);
    setBullet($index);
});

function pre() {
    if(isAnimate) return;
    isAnimate = true;  // 上锁
    $imgCt.animate({left: '+=' + imgWidth}, function () {
        pageIndex--;
        if(pageIndex < 0){
            pageIndex = imgCount -1;
            $imgCt.css('left',-imgCount*imgWidth)
        }
        setBullet(pageIndex);
        isAnimate = false;  // 解锁
    });

}

function next() {
    if(isAnimate) return;
    isAnimate = true;  // 上锁
    $imgCt.animate({left: '-=' + imgWidth}, function () {
        pageIndex++;
        if (pageIndex === imgCount) {
            pageIndex = 0;
            $imgCt.css('left', -imgWidth)
        }
        setBullet(pageIndex);
        isAnimate = false;  // 解锁
    });
}

function setBullet(index){
    $bullet.removeClass('active')
           .eq(index)
           .addClass('active');
}



