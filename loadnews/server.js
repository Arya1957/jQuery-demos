var http = require('http');
var path = require('path');
var fs = require('fs'); //读写文件
var url = require('url');

var server = http.createServer(function (req, res) {

    var pathObj = url.parse(req.url, true);
    console.log(pathObj);
    if (pathObj.pathname === "/") {
         pathObj.pathname = 'index.html'
     }

    var news = [
        {
            link: 'http://new.qq.com/omn/20180416A1SHOF00',
            img: 'http://img1.gtimg.com/ninja/2/2018/04/ninja152391488011213.jpg',
            title: '人民日报评论：鸿茅药酒，神药还是神广告',
            brief: '先给诸位念一句广告词：“肾虚腰酸鸿茅酒，每天两口病喝走”。想必很多朋友对这个鸿茅药酒不陌生，它是广告中的“常客”，最近几天更是成为舆论焦点。广东一名医生在网上发表了一篇文章，质疑鸿茅药酒疗效。事后，内蒙古凉城县警方以“损害商品声誉罪”抓捕了这位医生。'
        },
        {
            link: 'https://news.qq.com/a/20180417/000111.htm',
            img: 'http://inews.gtimg.com/newsapp_ls/0/3288117339_150120/0',
            title: '国务院新机构密集挂牌 开局工作办了哪些大事？',
            brief: '根据《深化党和国家机构改革方案》列出的时间表，中央和国家机关机构改革要在2018年年底前落实到位。'
        },
        {
            link: 'https://news.qq.com/a/20180417/000575.htm',
            img: 'http://inews.gtimg.com/newsapp_ls/0/3288492120_150120/0',
            title: '金正恩观看中国艺术团演出芭蕾舞剧《红色娘子军》',
            brief: '新华社平壤4月16日电（记者李忠发刘艳霞）朝鲜劳动党委员长、国务委员会委员长金正恩和夫人李雪主16日在平壤观看了中国艺术团演出的芭蕾舞剧《红色娘子军》'
        },
        {
            link: 'http://new.qq.com/omn/20180417/20180417A02JJE00',
            img: 'http://img1.gtimg.com/ninja/2/2018/04/ninja152391472190242.jpg',
            title: '安倍今赴美会晤特朗普 拟建新框架劝美国重返TPP',
            brief: '　海外网4月17日电据日本共同社消息，日本首相安倍晋三将于17日飞赴美国，与特朗普在海湖庄园进行会晤，安倍欲提议新的贸易对话框架，以劝说美国重返TPP'
        },
        {
            link: 'http://new.qq.com/omn/20180417/20180417A0JE2K.html',
            img: 'http://inews.gtimg.com/newsapp_ls/0/3291828204_150120/0',
            title: '国家统计局：中美贸易摩擦难不倒中国经济',
            brief: '经济日报-中国经济网北京4月17日讯 针对中美贸易摩擦进一步发展会对中国经济带来怎样的影响，国家统计局国民经济综合统计司司长、新闻发言人邢志宏今天在国新办发布会上表示，当前中国经济稳中向好，中国经济稳定性、协调性、可持续性增强，经济韧性好、潜力足、回旋余地大，中美贸易摩擦难不倒中国经济，更改变不了中国经济持续健康发展的良好态势。'
        },
        {
            link: 'http://new.qq.com/omn/20180417/20180417A0HOC6.html',
            img: 'http://inews.gtimg.com/newsapp_ls/0/3291859820_150120/0',
            title: '农业农村部：合理安排种植结构 避免盲目扩张玉米生产',
            brief: '　经济日报-中国经济网北京4月17日讯 今日，农业农村部举行例行新闻发布会，通报今年一季度主要农产品市场运行形势，解读当前农产品市场热点问题，并回答记者提问。'
        },
        {
            link: 'http://view.inews.qq.com/a/20160830A02SEB00',
            img: 'http://inews.gtimg.com/newsapp_ls/0/531730377_150120/0',
            title: '中国轰6K研发险些被俄罗斯发动机厂商卡脖子',
            brief: '近日，轰6K＂战神＂轰炸机首次公开亮相。在中国...'
        },
        {
            link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
            img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
            title: '外媒称中国已经决心造出世界先进的航空发动机',
            brief: '资料图：2012年11月14日，第九届中国国际...'
        },
        {
            link: 'http://view.inews.qq.com/a/20160828A007LB00',
            img: 'http://inews.gtimg.com/newsapp_ls/0/531727868_150120/0',
            title: '传奇导弹专家冯·布劳恩：其实到美国后曾被当局忽视',
            brief: '小火箭出品本文作者：邢强博士原文标题：布劳恩博...'
        },
        {
            link: 'http://xw.qq.com/mil/20160830033420/MIL2016083003342001',
            img: 'http://inews.gtimg.com/newsapp_ls/0/531646423_150120/0',
            title: '中国空军演习加快反导能力建设 韩媒：或针对“萨德',
            brief: '中国空军演习加快反导能力建设 韩媒：或针对“萨德'
        },
        {
            link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
            img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
            title: '外媒称中国已经决心造出世界先进的航空发动机',
            brief: '资料图：2012年11月14日，第九届中国国际...'
        },
        {
            link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
            img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
            title: '为了喝酒，应该海军当年那些水兵也是蛮拼的……',
            brief: '嚣张（aggressive）这个词，腐国海军当...'
        },
        {
            link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
            img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
            title: '西媒臆断老挝“弃华投美” 认为现政府更亲越南',
            brief: '西媒臆断老挝“弃华投美” 认为现政府更亲越南'
        },
        {
            link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
            img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
            title: '中国武警2016年征兵宣传片震撼首发',
            brief: '中国武警2016年征兵宣传片震撼首发'
        },
        {
            link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
            img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
            title: '韩国多次宣称“一旦开战三天内消灭朝鲜空军”，靠谱吗？',
            brief: '韩国多次宣称“一旦开战三天内消灭朝鲜空军”，靠谱吗？'
        },
        {
            link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
            img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
            title: '韩促朝停止诋毁韩国元首 批其丧失最基本礼仪常识',
            brief: '韩促朝停止诋毁韩国元首 批其丧失最基本礼仪常识'
        },
        {
            link: 'http://xw.qq.com/mil/20160830033420/MIL2016083003342001',
            img: 'http://inews.gtimg.com/newsapp_ls/0/531646423_150120/0',
            title: '中国空军演习加快反导能力建设 韩媒：或针对“萨德',
            brief: '中国空军演习加快反导能力建设 韩媒：或针对“萨德'
        },
        {
            link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
            img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
            title: '外媒称中国已经决心造出世界先进的航空发动机',
            brief: '资料图：2012年11月14日，第九届中国国际...'
        },
        {
            link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
            img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
            title: '为了喝酒，应该海军当年那些水兵也是蛮拼的……',
            brief: '嚣张（aggressive）这个词，腐国海军当...'
        },
        {
            link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
            img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
            title: '西媒臆断老挝“弃华投美” 认为现政府更亲越南',
            brief: '西媒臆断老挝“弃华投美” 认为现政府更亲越南'
        },
        {
            link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
            img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
            title: '中国武警2016年征兵宣传片震撼首发',
            brief: '中国武警2016年征兵宣传片震撼首发'
        },
        {
            link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
            img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
            title: '韩国多次宣称“一旦开战三天内消灭朝鲜空军”，靠谱吗？',
            brief: '韩国多次宣称“一旦开战三天内消灭朝鲜空军”，靠谱吗？'
        },
        {
            link: 'http://xw.qq.com/mil/20160830028700/MIL2016083002870002',
            img: 'http://inews.gtimg.com/newsapp_ls/0/531644649_150120/0',
            title: '韩促朝停止诋毁韩国元首 批其丧失最基本礼仪常识',
            brief: '韩促朝停止诋毁韩国元首 批其丧失最基本礼仪常识'
        }
    ];

    switch (pathObj.pathname) {
        case '/getNews':
            var pageIndex = pathObj.query.page;
            var len = 3;
            var retNews = news.slice(pageIndex * len, pageIndex * len + len);
           // console.log(retNews);
            res.end(JSON.stringify(retNews));
            break;

        default:
            fs.readFile(path.join(__dirname, 'static', pathObj.pathname), function (err, data) {
                if (err) {
                    res.statusCode = 404;
                    res.end('Not Found')
                } else {
                    res.end(data)
                }
            })
    }
});

server.listen(8080);


