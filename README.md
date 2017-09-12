# 基于Vue2.0仿豆瓣电影web app

> 本人做的第一个真正意义上的Vue开源项目。学了1个多月的Vue，从看官方文档到试写demo，本想把demo当小项目却被同学诟病没有主题，想了想觉得挺有道理，就去找主题，最后决定用Vue仿豆瓣电影写一个web app。

## 项目地址
[demo](https://github.com/gyt95/vue2.0-douban-movie)

## 技术栈

vue2 + vue-router + vuex + axios + ES6 + scss + flex

## 项目运行

``` 
git clone git@github.com:gyt95/vue2.0-douban-movie.git

cd vue2.0-douban-movie

npm install  //安装依赖包

npm run dev  //开启本地服务器localhost:8090

npm run server:api  //开启api服务器，并将index.html中的ip地址改为你的本地ip地址(模拟数据用于购票部分)

npm run build //发布环境
```

## 功能
- [x] 电影详情页 -- 完成
- [x] 影人详情页 -- 完成
- [x] 电影榜单页 -- 完成
- [x] 影评列表页 -- 完成
- [x] 短评列表页 -- 完成
- [x] 个人中心    -- 完成
- [x] 电影票列表页 -- 完成
- [x] 电影信息页 -- 完成
- [x] 影人信息页 -- 完成
- [x] 首页图片轮播 -- 完成
- [x] 滑动切换模块 -- 完成
- [x] 城市简单定位 -- 完成
- [x] 搜索功能     -- 完成
- [x] 观看视频功能 -- 完成
- [x] 用户登录、退出 -- 完成
- [x] 用户收藏功能(想看、看过) -- 完成
- [x] 模块切换时滚动条相互独立 -- 完成
- [x] 3s欢迎页(即广告页) -- 完成
- [x] 图片懒加载 -- 完成
- [ ] 购票相关页面及功能(选影院、选场次、选座) -- 正在进行中...
- [ ] 影评详情页 -- 未完成
- [ ] 选择城市 -- 未完成
- [ ] 下拉刷新 -- 未完成
...

## 说明
>  开发过程中尽量还原豆瓣电影官方移动端界面及功能，但由于api文档缺少部分接口，导致部分页面效果暂时无法实现。

>  record.txt用于开发记录。本项目从6.20开始制作，到7.4初版完成。后续也会把更新记录写入此文档。

>  本人初接触MVVM前端框架，写得不够好，很多地方没来得及复用，代码可能比较乱，望见谅！我会继续优化代码并完善其他功能，大家如有什么问题或好的建议不妨提交issue或PR给我。

>  如果对您有帮助，欢迎"Star"一下，非常感谢！

## 主题选择理由
1、个人十分喜欢看电影  
2、豆瓣公开了较为友好的api文档  
3、网上有很多用Vue写的仿豆瓣的web app，但感觉内容较宽泛，读书电影音乐日记等等。。而用Vue写的仿豆瓣电影项目一般以PC端居多  
4、豆瓣电影移动端页面比较简洁，没有太复杂的效果，较适合新手  

## 项目结构
```
.
├─ build                              //webpack配置文件
│    ...
│  
├─ config                             //项目打包路径
│    ...
│  
├─ screen                             //项目截图
│    ...
│  
├─ server                             //api服务器
│    ...
│  
├─ src
│  ├─ assets                          //静态资源文件
│  │    ...
│  │  
│  ├─ components                      //组件
│  │  ├─ board                        //榜单组件
│  │  │    ...
│  │  |
│  │  ├─ footer                       //底部组件
│  │  │    ...        
│  │  |
│  │  ├─ star                         //评分组件
│  │  │    ...
│  │  |
│  │  ├─ actor.vue                    //影人信息组件
│  │  ├─ content.vue      			  //首页tab组件            
│  │  ├─ lazyImg.vue                  //图片懒加载组件
│  │  ├─ movieInfo.vue                //电影信息组件
│  │  └─ record.vue                   //用户收藏组件
│  │ 
│  ├─ config                          //基本配置
│  │  ├─ rem.js                       //px转换rem
│  │  └─ utils.js                     //一些js方法
│  │ 
│  ├─ pages
│  │  ├─ actors.vue                   //影人详情页
│  │  ├─ billboard.vue                //榜单页
│  │  ├─ chooseCinema.vue             //选择影院页
│  │  ├─ chooseEvent.vue              //选择场次页
│  │  ├─ details.vue                  //电影详情页
│  │  ├─ find.vue                     //发现页
│  │  ├─ home.vue                     //首页
│  │  ├─ login.vue                    //登录页
│  │  ├─ my.vue                       //个人中心页
│  │  ├─ order.vue                    //订单页      
│  │  ├─ reviews.vue                  //影评详情页(待完成)
│  │  ├─ search.vue                   //搜索页
│  │  ├─ searchList.vue               //搜索结果页
│  │  ├─ start.vue                    //欢迎页
│  │  └─ ticket.vue                   //查看电影票页
│  │
│  ├─ router                          //路由配置
│  │    ...
│  │ 
│  ├─ store                           //vuex状态管理
│  │    ...
│  │ 
│  ├─ App.vue                         //页面主组件
│  └─ main.js                         //程序入口文件，用于初始化vue实例等
│
├─ static                             //放置图标
│    ...
│ 
├─ .babelrc
├─ .editorconfig
├─ .gitignore
├─ .postcssrc.js
├─ README.md
├─ debug.log
├─ index.html                         //入口html文件
├─ package.json
└─ record.txt                         //本项目的开发记录


```

## 项目部分截图
### 首页
<img src="https://github.com/gyt95/vue2.0-douban-movie/blob/master/screen/index.gif" width="365" height="619"/>

### 电影详情页
<img src="https://github.com/gyt95/vue2.0-douban-movie/blob/master/screen/details.gif" width="365" height="619"/>

### 影人详情页
<img src="https://github.com/gyt95/vue2.0-douban-movie/blob/master/screen/actors.gif" width="365" height="619"/>

### 榜单页
<img src="https://github.com/gyt95/vue2.0-douban-movie/blob/master/screen/board.gif" width="365" height="619"/>

### 登录页
<img src="https://github.com/gyt95/vue2.0-douban-movie/blob/master/screen/login.gif" width="365" height="619"/>

### 登出页、查看电影票页
<img src="https://github.com/gyt95/vue2.0-douban-movie/blob/master/screen/logOut&myTicket.gif" width="365" height="619"/>

### top250页
<img src="https://github.com/gyt95/vue2.0-douban-movie/blob/master/screen/top250.gif" width="365" height="619"/>

## 感谢
感谢两个开源项目[elm](https://github.com/liangxiaojuan/eleme)和[vue2-elm](https://github.com/bailicangdu/vue2-elm)，对我本次项目开发有很大帮助。     
感谢[豆瓣官方api](https://developers.douban.com/wiki/?title=movie_v2)和[非官方api](https://github.com/jokermonn/-Api/blob/master/DoubanMovie.md)。
