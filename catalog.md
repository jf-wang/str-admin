### 开发环境目录结构

`├──.node_modules	--------------------------项目的基础依赖包`
`├──build	----------------------------------webpack相关配置文件(配置好了，一般不需要再进行配置)`
   `├──build.js	----------------------------生产环境构建`
   `├──check-versions.js	--------------------版本检测(node,npm)`
   `├──setup-dev-server.js	------------------开发服务器的 热重载(用于实现页面的自动刷新)`
   `├──utils	--------------------------------构建相关工具`
   `├──vue-loader.conf.js	------------------vue文件css加载配置`
   `├──webpack.base.conf.js	----------------webpack的基础配置`
   `├──webpack.client.conf.js ---------------ssr渲染客户端配置`
   `├──webpack.dev.conf.js ------------------webpack开发环境配置`
   `├──webpack.prod.conf.js -----------------webpack生产环境配置`
   `├──webpack.server.conf.js ---------------ssr渲染服务端配置`
`├──dist	------------------------------------打包后的项目(index.html和static文件夹)`
`├──config	----------------------------------vue基本配置文件(我们可配置监听端口，打包输出等)`
   `├──dev.env.js ---------------------------项目开发环境的配置`
   `├──index.js	----------------------------项目主要的配置(端口的监听和打包路径代理配置等)`
   `├──prod.env.js --------------------------项目生产环境的配置`
`├──src	------------------------------------项目核心文件(我们缩写的代码放到这里)`
`├──static	----------------------------------静态资源(一般存放cdn，图片等资源)`
`├──test/unit	------------------------------vue组件karma单元测试用例`
   `├──specs`
   `├──karma.conf`
`├──.babelrc	--------------------------------babel编译参数`
`├──.editorconfig	--------------------------代码格式配置文件`
`├──.eslintignore	--------------------------代码格式忽略的文件`
`├──.gitignore	------------------------------git提交忽略的文件`
`├──.postcssrc.js	--------------------------转换css的工具配置`
`├──LICENSE	--------------------------------协议`
`├──README.md	------------------------------项目说明文档`
`├──index.html	------------------------------主页`
`├──package.json	----------------------------项目基本信息和依赖包的管理`
`├──server.js	------------------------------ssr渲染node服务`


### src源码目录结构

`├──api	------------------------------------ajax后台api接口`
`├──assets	----------------------------------图片资源存`
`├──components ------------------------------基础公共组件(avue核心源码，直接用无需理解)`
   `├──crud ---------------------------------crud和form快速开发组件`
   `├──datashow	----------------------------展示数据组件`
   `├──errorPage	----------------------------错误页面组件(404,500等)`
   `├──iframe -------------------------------第三方网站嵌套组件`
`├──config ----------------------------------项目全局变量配置文件`
   `├──env.js -------------------------------阿里巴巴图标库地址,项目api接口地址等`
`├──const	----------------------------------静态数据`
`├──directive	------------------------------vue全局自定义指令`
`├──docker	----------------------------------docker部署文件dockerfile`
`├──filters	--------------------------------vue全局过滤器`
`├──mock	------------------------------------mock.js模拟数据(项目没有与服务器交互api文件调用这里模拟数据)`
`├──page	------------------------------------登录页和主页的一些功能核心组件`
`├──router	----------------------------------项目的路由文件和ajax拦截器`
   `├──_import.js	--------------------------组件动态导入工具`
   `├──axios.js	----------------------------ajax拦截器配置`
   `├──router.js	----------------------------路由文件配置`
`├──store	----------------------------------vuex全局组件共享变量和方法`
`├──styles	----------------------------------全局样式文件存放`
   `├──btn.scss	----------------------------按钮样式`
   `├──common.scss	--------------------------基础样式`
   `├──element-ui.scss	----------------------覆盖ele的样式`
   `├──mixin.scss	--------------------------样式工具包(滚动条等)`
   `├──sidebar.scss	------------------------侧边menu菜单样式`
   `├──tags.scss	----------------------------选项标签样式`
   `├──top.scss	----------------------------顶部样式`
   `├──variables.scss	----------------------全局scss变量样式`
`├──util	------------------------------------全局工具包存放`
   `├──auth.js	------------------------------授权相关的工具包`
   `├──store.js		--------------------------本地存储缓存的工具包`
   `├──util.js	------------------------------基础工具包`
   `├──validate.js		------------------------验证工具包`
   `├──yun.js	------------------------------其他工具包`
`├──vendor	----------------------------------excel生成下载等第三方依赖包`
`├──views	----------------------------------业务逻辑页面存放`
`├──App.vue	--------------------------------vue主组件入口文件`
`├──entry-client.js	------------------------ssr客户端依赖配置`
`├──entry-server.js	------------------------ssr服务端依赖配置`
`├──errorLog.js	----------------------------全局错误日志文件配置`
`├──main.js	--------------------------------主文件入口`
`├──permission.js	--------------------------全局权限配置`

# page	--------------------------登录页和主页的一些功能核心组件
`├──errlog ---------------------------------错误页面`
`|  ├──errorPage -------------------------------404/403/500页面`
`|  ├──index -------------------------------错误日志`
`├──index-----------------------------------数据展示`
`|  ├──sidebar -----------------------------侧边导航`
`|  |   ├──index ---------------------------侧边导航背景` 
`|  |   ├──sidebarItem ---------------------侧边导航内容`
`|  ├──top ---------------------------------头部组建`
`|  |   ├──index ---------------------------头部主要内容`
`|  |   ├──top-lock ------------------------屏幕锁`
`|  |   ├──top-logo ------------------------头部logo`
`|  |   ├──top-menu ------------------------头部路由`
`|  ├──breadcrumb --------------------------面包屑`
`|  ├──tags --------------------------------面包屑关闭其他或全部`
`├──lock -----------------------------------屏幕锁页面`
`├──login-----------------------------------登录页面组件`
`|  ├──codelogin----------------------------手机号登录`
`|  ├──index--------------------------------主要内容`
`|  ├──thirdlogin---------------------------二维码登录`
`|  ├──userlogin----------------------------用户民登录`
`├──wel-------------------------------------首页默认页`

# src	--------------------------项目核心文件
`├──admin ---------------------------------设置`
  ``├──menu -------------------------------用户管理`
  ``├──role -------------------------------角色管理`
  ``├──user -------------------------------菜单管理 `
`├──exhibition-----------------------------数据展示`
`├──info-----------------------------------个人信息`
`├──role-----------------------------------权限检测接界面`

