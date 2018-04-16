var $tabBtn = $('.tab-category');
$tabBtn.on('click','li',function(){
    var $cur = $(this);
    console.log($cur);
    var $index = $cur.index();
    console.log($index);
    $cur.siblings().removeClass('active');
    $cur.addClass('active');  // 导航栏背景色
    var $panels = $cur.parents('.ct').find('.panel'); // 这一步是关键，要先找到导航栏和panels的共同父元素，
    // 然后再找panel，只有这样目录才是对的
    console.log($cur.parents('.ct').find('.panel'));

    $panels.eq($index).siblings().removeClass('active');
    $panels.eq($index).addClass('active');

}); //事件代理