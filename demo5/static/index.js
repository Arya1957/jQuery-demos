var $ct = $('.layout>.ct');
var $btn = $('.layout>.btn');
var curIndex = 3;
var length = 5;

$ct.on('mouseenter mouseleave', 'li', function (events) {
    if (events.type === 'mouseenter') {
        $(this).css('background-color', 'green')
    }
    if (events.type === 'mouseleave') {
        $(this).css('background-color', '')
    }
});


var isLoading = false; // 设置状态锁
$btn.on('click', function (e) {
    e.preventDefault();
    if (isLoading) {
        return;  // 如果正在加载数据，就什么都不做
    }
    isLoading = true;
<<<<<<< HEAD
    $btn.html('<img src="loading.gif"/>');
=======
    $btn.html('<img src="https://xiedaimala.com/s/36"/>');
>>>>>>> gh-pages
    $.ajax({
        url: '/loadmore',
        method: 'GET',
        data: {
            index: curIndex,
            length: 5
        },
        success: function (data){
            onSuccess(data);
        },
        error: function(){
            onError();
        }
    })
    });


    function onSuccess(e) {
        appendData(e);
        isLoading = false;  //数据到达之后解锁
        $btn.text('加载更多');
        console.log('e:'+e);
        curIndex = curIndex + length; //修改序号
    }

    function onError(){
        isLoading = false;
        $btn.text('加载更多');
        alert('系统异常')

    }
    
    function appendData(data) {
        data = JSON.parse(data);
        for(var i=0;i<data.length;i++){
            console.log('data[i]:'+ data[i]);
            $ct.append('<li>'+data[i]+ '</li>')
        }
    }

