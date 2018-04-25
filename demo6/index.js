$(window).scroll(function () {
    $($('.test')).each(function(){
        if (isVisible($(this)) && ($(this).data('shown')) !== 'true') {
            // 如果元素在窗口可视范围，并且自定义属性shown 的值不为true的时候，说明之前没有出现过，可以打印true
            console.log($(this).text()+':true');
            $(this).data('shown','true') //  元素在窗口可视范围出现后，我们给她加个自定义属性，做个标记
        }
    });

});  //  每次滑动，函数都会执行

function isVisible($node) {
    var $nodePosition = $node.offset().top;
    var $scrollDistance = $(window).scrollTop();
    var $windowHeight = $(window).height();
    if (($nodePosition >= $scrollDistance) && ($nodePosition <= ($scrollDistance + $windowHeight))) {
        return true
    }
    return false
}


