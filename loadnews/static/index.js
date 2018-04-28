/*
新闻懒加载思路：
在页面埋入一个节点，设置对用户不可见（用`visibility: hidden`而不是 `display: none`，因为 display: none`高度计算会出现问题 ），当该节点出现在可视范围内时，向后台发送ajax请求。
*/

var $loadmore = $('#load-more');
var $news = $('.news');
var $ct = $('ct');
var pageIndex = 0;
var isOver = false;
var isNewsArrive = true;


getNews();

$(window).on('scroll', function () {
    if (isVisible($loadmore) && !isOver && isNewsArrive) {
        getNews();
        console.log(isOver);
    }
});


function isVisible($node) {
    var $scrollTop = $(window).scrollTop(); // 窗口滚动的距离
    var $windowHeight = $(window).height();   // 窗口高度
    var $nodePosition = $node.offset().top;

    if (($nodePosition >= $scrollTop) && ($nodePosition <= $windowHeight + $scrollTop)) {
        return true
    } else {
        return false;
    }
}


function getNews() {
    isNewsArrive = false;
    $.get('/getNews', {page: pageIndex}).done(function (ret) {
        isNewsArrive = true;
        var news = JSON.parse(ret);
        console.log(typeof news);  //  obj
        appendData(news);
        pageIndex++;
        console.log(pageIndex);
        if (isVisible($loadmore) && !isOver && isNewsArrive) {
            getNews();
        }
}).fail(function () {
    alert('系统出错')
});
}


function appendData(news) {
    if (news.length === 0) {
        isOver = true;
        $ct.append('<p>没有更多数据了</p>');
        return
    }
    var newshtml = '';
    $.each(news, function () {
        newshtml += '<li>';
        newshtml += '<a class="clearfix" href="' + this.link + '">';
        newshtml += '<img src=" ' + this.img + ' " alt="">';
        newshtml += '<h3>' + this.title + '</h3>';
        newshtml += '<p>' + this.brief + '</p>';
        newshtml += '</a>';
        newshtml += '</li>';
        return newshtml
    });
    $news.append(newshtml)
}

