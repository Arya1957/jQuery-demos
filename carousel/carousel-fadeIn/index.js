var $imgs = $('.img-ct>li');
var imgCount = $imgs.length;
// console.log(imgCount);
var $pre = $('.arrow.pre');
var $next = $('.arrow.next');
var $bullet = $('.bullets>li');
var curIndex = 0;
var isAnimate = false;
var $ct = $('.carousel-fadein');

play(0);

$pre.on('click', function () {
    pre()
});
$next.on('click', function () {
    next()
});

$bullet.on('click', function () {
    var $index = $(this).index();
    play($index)
});

function pre() {  // 播放上一帧
    play((curIndex - 1 + imgCount) % imgCount)
}

function next() { //播放下一帧
    play((curIndex + 1) % imgCount);  // 这种取当前目录的方式比一个个判断更加简洁
}

function play(idx) {
    if (isAnimate) return;
    isAnimate = true;
    $imgs.eq(curIndex).fadeOut(800);
    $imgs.eq(idx).fadeIn(800, function () {
        isAnimate = false;
        setBullet(idx)
    });
    curIndex = idx;
    console.log('curIndex' + curIndex);
}

function setBullet($index) {
    $bullet.removeClass('active');
    $bullet.eq($index).addClass('active')
}

var clock ;
function autoPlay(){
   clock = setInterval(function(){
        next()
    },1500)
}

function stopPlay(){
    clearInterval(clock)
}
$('.autoPlay').click(function(){
    autoPlay();
    $ct.mouseenter(function(){
        stopPlay()   // 鼠标进入的时候停止轮播
    }).mouseleave(function(){
        autoPlay()
    });
});
$('.stopPlay').click(stopPlay);

