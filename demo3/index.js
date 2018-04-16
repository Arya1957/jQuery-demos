
var $lists = $('.lists');
$lists.on('mouseenter','li',function(){
   $(this).find('.cover').show();
});
$lists.on('mouseleave','li',function(){
   $(this).find('.cover').hide();
});

var products = [
    {
        img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
        name: '珂兰 黄金手 猴哥款',
        price: '￥405.00'
    },{
        img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
        name: '珂兰 黄金转运珠 猴哥款',
        price: '￥100.00'
    },{
        img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
        name: '珂兰 黄金手链 3D猴哥款',
        price: '￥45.00'
    }
];

var $addBtn = $('.addBtn');
$addBtn.on('click',function(e){
    console.log(e);
    e.preventDefault();
    var $lists = $('.lists');
    $.each(products,function(idx,data){
        var html = appendData(data);
        $lists.append(html);
    })

});

function appendData(list){
    var html = '';
    html += '<li>';
    html +=   '<div class="cover">';
    html +=      '<a href="" class="btn">立即抢购</a>';
    html +=   '</div>' ;
    html +=  '<a href="">';
    html +=     '<img src=' + list.img + ' alt="">';
    html +=     '<p class="intro">' + list.name +'</p>';
    html +=     '<p class="price">'+ list.price + '</p>';
    html +=  '</a>';
    html += '</li>';
    return html;
}