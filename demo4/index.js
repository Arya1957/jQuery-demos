var $tab = $('.tabs>li');
$tab.on('click',function(){
    var $clicked =$(this);
    var $index = $clicked.index();
    var $steps = $index * 720;
    var $panels = $('.panels');
    //  console.log(this);
    //  console.log($index);
    console.log(typeof($index));
    $clicked.siblings().removeClass('tab-active');
    $clicked.addClass('tab-active');
    $panels.animate({left: -$steps},1000)

});
