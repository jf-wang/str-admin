/*
全局变量名占用：te
依赖：jquery-1.5以上版本。
兼容：≥ie9、≥chrome v49、≥firefox v36，API有额外声明除外。
*/

(function () {

    var $ = jQuery;

    /**
     * TE框架JS端
     * @version 0.8.0
     */
    var te = {};

//------------------------------General------------------------------

    /**
     * 框架配置
     * runningMode：运行模式，可选值包括：product、development，当为development 模式时，停止在线心跳、权限集更新、BDD更新。
     * corsServerUrl：跨域访问的服务器URL，为非空的有效服务器URL时，自动启动CORS，反之，禁止CORS。CORS功能不完全兼容IE，在IE下存在服务器端跨域Session跟踪失效，推荐使用非IE浏览器。
     * @type {{runningMode: string, corsServerUrl: string}}
     */
    te.config = {
        runningMode: "product",
        corsServerUrl: "",
        urlPre: "/do"
    };

    // te.config.runningMode = 'development ';
    // te.config.corsServerUrl = "http://andrew-y430p:8080";
    te.config.corsServerUrl = "http://zd-server-01:8080";

    /**
     * 设置跨域服务器URL
     * @param {string} url
     */
    te.setCorsServer = function (url) {
        if (te.notNOS(url)) {
            te.config.corsServerUrl = url;
        }
    };

    /**
     * 是否为产品模式
     */
    te.isProductMode = function () {
        return te.notNOS(te.config.runningMode) && te.config.runningMode === "product";
    };

    te.constants = {
        CHECK_RESULT_FAIL_FEEDBACK_FLAG: "__msgSecurity"
    };

    /**
     * <p>Ajax后端接口调用</p>
     * <p>前端至后端Ajax接口的参数形式为简单Object实例（无级联子对象），复杂参数需先经过JSON..stringify()序列化后，作为string类型传送。</p>
     * <p>后端Ajax接口返回数据格式为JSON反序列化后的复杂Object实例（可含级联对象），反序列化由jQuery完成。</p>
     * @param {string} url 与后台AjaxController的方法名对应，直接传入方法名即可。
     * @param {Object} data 参数，所有null或undefined属性值，将被忽略。
     * @param {function(Object):void} [action1=null] 正常调用后的回调函数
     * @param {boolean} [multipart=false] ContentType是否为multipart/form-data类型，通常为文件上载。
     * @param {function():void} [action2=null] RPC异常发生后的回调函数
     * @param {function(string):void} [action3=null] 安全性验证未通过后执行的回调函数，参数为安全验证失败反馈信息。
     */
    te.ajax = function (url, data, action1, multipart, action2, action3) {
        data = te.nvl(data, {});
        multipart = te.nvl(multipart, false);
        //null转undefined，jQuery把null值转为空子串发送至服务器端，这将造成后端语义上的歧义：无法区分空字串与null，故需转换
        // 为undefined，jQuery不在GET、POST请求中发送undefined值。
        for (var p in data) {
            if (data[p] === null) {
                data[p] = undefined;
            }
        }
        var ajaxParam = {
            type: "POST",
            data: data,
            dataType: "json",
            success: function (rv) {
                if (rv
                    && typeof rv === 'object'
                    && rv.hasOwnProperty(te.constants.CHECK_RESULT_FAIL_FEEDBACK_FLAG)) {
                    if (te.notNOU(action3)) {
                        action3(rv[te.constants.CHECK_RESULT_FAIL_FEEDBACK_FLAG]);
                    } else {
                        alert(rv[te.constants.CHECK_RESULT_FAIL_FEEDBACK_FLAG]);
                    }
                } else {
                    if (te.notNOU(action1)) action1(rv);
                }

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                if (te.notNOU(action2)) action2();
                //todo 异常处理
                console.log(xmlHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
        };
        if (te.notNOS(te.config.corsServerUrl)) {
            ajaxParam.crossDomain = true;
            ajaxParam.xhrFields = {withCredentials: true};
            ajaxParam.url = te.config.corsServerUrl.trim() + te.config.urlPre + url;
        } else {
            ajaxParam.url = te.config.urlPre + url;
        }
        if (multipart) {
            ajaxParam.processData = false;
            ajaxParam.contentType = false;
        }
        if (te.urm.hasLogin()) {
            te.urm.addToken(data);
        }
        $.ajax(ajaxParam);
    };

    /**
     * 判断是否为null、undefined、空字符串、空白字符串值，若是，返回true，反之，返回false。
     * <p>NOS为“null or space”简写。</p>
     * @param {string} str
     * @returns {boolean}
     */
    te.isNOS = function (str) {
        return typeof str === 'undefined' || str === null || (typeof str === "string" && /^\s*$/.test(str));
    };

    /**
     * 判断是否为null、undefined
     * @param {*} obj
     * @return {boolean}
     */
    te.isNOU = function (obj) {
        return typeof obj === 'undefined' || obj === null;
    };

    /**
     * 判断是否非null、非undefined
     * @param obj
     * @return {boolean}
     */
    te.notNOU = function (obj) {
        return !te.isNOU(obj);
    };

    /**
     * 判断是否非null、undefined、非空字符串、非空白字符串值，若是，返回false，反之，返回True。
     * <p>NOS为“null or space”简写。</p>
     * @param {string} str
     * @returns {boolean}
     */
    te.notNOS = function (str) {
        return !te.isNOS(str);
    };

    /**
     * null或undefined值转替换值
     * <p>若第一个参数为null或undefined，返回第二个参数值，反之，返回第一个参数原值。</p>
     * <p>“nvl”取名自Oracle nvl函数。</p>
     * @param {*} value
     * @param {*} defaultValue 替换值。
     * @returns {*}
     */
    te.nvl = function (value, defaultValue) {
        return (typeof value === 'undefined' || value === null) ? defaultValue : value;
    };

    /**
     * 判断是否为有效数字，null、undefined、无法通过isFinite()测试的字面量均视为无效数据。
     * @param {*} num
     * @returns {boolean}
     */
    te.isFinite = function (num) {
        return te.notNOU(num) && isFinite(num);
    };

    /**
     * 读取Cookie
     * @param {string} name
     * @return {*}
     */
    te.getCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';'); //把cookie分割成组
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i]; //取得字符串
            while (c.charAt(0) === ' ') { //判断一下字符串有没有前导空格
                c = c.substring(1, c.length); //有的话，从第二位开始取
            }
            if (c.indexOf(nameEQ) === 0) { //如果含有我们要的name
                return decodeURI(c.substring(nameEQ.length, c.length)); //解码并截取我们要值
            }
        }
        return null;
    };

    /**
     * 添加Cookie
     * @param {string} name
     * @param {*} value 转字符串字面量
     * @param {int} minutes Cookie时限，单位：分钟。
     */
    te.addCookie = function (name, value, minutes) {      //添加cookie
        var str = name + "=" + decodeURI(value + "");
        if (minutes > 0) {                               //为时不设定过期时间，浏览器关闭时cookie自动消失
            var date = new Date();
            var ms = minutes * 60 * 1000;
            date.setTime(date.getTime() + ms);
            str += "; expires=" + date.toGMTString();
        }
        document.cookie = str;
    };

    te.getUrlParam = function (paramName, url) {
        var URLParams = [];
        var params = [];
        if (te.isNOS(url)) {
            params = document.location.search.substr(1).split('&');
        } else {
            var index = url.indexOf("?");
            if (index > -1) {
                var search = url.substring(index + 1);
                params = search.split("&");
            }
        }
        for (i = 0; i < params.length; i++) {
            var aParam = params[i].split('=');
            if (aParam[0] === paramName) {
                return aParam[1];
            }
        }
        return null;
    };

    /**
     * 给URL增加参数值对
     * @param url URL，忽略以“&”结尾的URL，不作处理，并返回空字串。
     * @param paramName 参数名
     * @param {*} value 字面量转字符串
     * @return {string}
     */
    te.addUrlParam = function (url, paramName, value) {
        if (te.notNOS(url)) {
            if (url.charAt(url.length - 1) !== "&") {
                return encodeURI(url + "&" + paramName + "=" + value);
            }
        }
        return "";
    };

    /**
     * 使用临时生成表单的方式，从浏览器导航到指定URL，主要用作文件下载、非Ajax方式（临时表单）数据提交。
     * @param {string} url
     * @param {String, Object} data 字串或Object实例参数集
     * @param {string} [httpMethod="post"] http请求类型，二选一：post、get。
     * @param {string} [target="_self"] 等同于html form标签的target属性
     */
    te.navigateByForm = function (url, data, httpMethod, target) {
        if (url && data) {
            url = (te.isNOS(te.config.corsServerUrl) ? "" : te.config.corsServerUrl) + url;
            data = typeof data === 'string' ? data : $.param(data);
            var inputs = '';
            $.each(data.split('&'), function () {
                var pair = this.split('=');
                inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
            });
            $('<form action="' + url + '" method="' + (httpMethod || 'post') + '" target="' + (target || '_self') + '">'
                + inputs + '</form>').appendTo('body').submit().remove();
        }
    };

//------------------------------BDD------------------------------

    /**
     * BDD（业务字典）组件
     */
    te.bdd = {};
    /**
     * BDD组件参数默认值，属性包括：updatingTimerPeriod（更新计时器周期，默认值为10分钟）。
     * @type {{updatingTimerPeriod: number}}
     */
    te.bdd.constants = {
        updatingPeriod: 10 * 60 * 1000,
        POSITION_UNDER: 4,
        POSITION_BROTHER: 5
    };
    // te.bdd.constants = {updatingPeriod: 20 * 1000};
    te.bdd._topItemList = {};
    te.bdd._pattern_topItemPath = /^([\w-_]{1,300})(:[\w-_]{1,300})$/;
    te.bdd._pattern_subItemPath = /^([\w-_]{1,300})(:[\w-_]{1,300}(\/[\w-_]{1,300})+)$/;

    /**
     * 判断BDD item类型
     * @param {string} item Pah或item对象
     * @returns {int} 1为top item，2为sub item，0表示为无效item Path。
     */
    te.bdd.isTopOrSub = function (item) {
        if (typeof item === 'string' && te.notNOS(item)) {
            if (te.bdd._pattern_topItemPath.test(item)) {
                return 1;
            } else if (te.bdd._pattern_subItemPath.test(item)) {
                return 2
            }
        } else if (typeof item === 'object' && item !== null) {
            if (item.hasOwnProperty('key')
                && item.hasOwnProperty('title')
                && item.hasOwnProperty('path')) {
                return item.hasOwnProperty('updateTime') ? 1 : 2;
            }
        }
        return 0;
    };

    /**
     * 查询BDD item
     * @param {string} itemPath
     * @param {function(Object):void} action 查询到有效数据后执行的回调函数。
     * @param {boolean} [simply=true] 是否执行简化的查询，默认为true，sub item简化查询后返回属性：key、title、path、titlePath，
     * top item简化查询后的返回属性：key、title、updateTime、path。
     * @param {boolean} [cache=true] 后端Ajax接口有效数据返回后是否在前端缓存，默认为true。
     */
    te.bdd.queryItem = function (itemPath, action, simply, cache) {
        simply = te.nvl(simply, true);
        cache = te.nvl(cache, true);
        if (te.notNOS(itemPath)) {
            if (te.bdd._pattern_topItemPath.test(itemPath)) {
                te.bdd.queryTopItem(itemPath, action, simply, cache);
            } else if (te.bdd._pattern_subItemPath.test(itemPath)) {
                te.bdd.querySubItem(itemPath, action, simply, cache)
            }
        }
    };

    /**
     * 查询前端缓存的BDD item
     * @param {string} itemPath
     */
    te.bdd.queryLocalItem = function (itemPath) {
        if (te.notNOS(itemPath)) {
            if (te.bdd._pattern_topItemPath.test(itemPath)) {
                return te.bdd.queryLocalTopItem(itemPath);
            } else if (te.bdd._pattern_subItemPath.test(itemPath)) {
                return te.bdd.queryLocalSubItem(itemPath);
            }
        }
    };

    /**
     *查询BDD top item
     * @param itemPath path {string} item 路径。
     * @param {function(Object):void} action 查询到有效数据后执行的回调函数，当未能查询到有效top item时，不执行回调函数。
     * @param {boolean} [simply=true] 是否执行简化的查询，默认为true，sub item简化查询后返回属性：key、title、path、titlePath，
     * top item简化查询后的返回属性：key、title、updateTime、path。
     * @param {boolean} [cache=true] 后端Ajax接口有效数据返回后是否在前端缓存，默认为true。
     */
    te.bdd.queryTopItem = function (itemPath, action, simply, cache) {
        simply = te.nvl(simply, true);
        cache = te.nvl(cache, true);
        if (te.bdd.isTopOrSub(itemPath) === 1) {
            if (te.bdd._topItemList.hasOwnProperty(itemPath) && (te.bdd._topItemList[itemPath].hasOwnProperty("desc") || simply)) {
                action(te.bdd._topItemList[itemPath]);
            } else {
                te.ajax("/te/bdd/queryTopItem",
                    {path: itemPath, simply: simply},
                    function (topItem) {
                        if (topItem) {
                            if (cache) te.bdd._topItemList[itemPath] = topItem;
                            action(topItem);
                        }
                    });
            }
        }
    };

    /**
     * 查询前端缓存的top item
     * @param {string} itemPath item 路径。
     * @returns {Object}
     */
    te.bdd.queryLocalTopItem = function (itemPath) {
        if (te.bdd.isTopOrSub(itemPath) === 1) {
            if (te.bdd._topItemList.hasOwnProperty(itemPath)) {
                return te.bdd._topItemList[itemPath];
            }
        }
        return null;
    };

    /**
     *截取sub item path中的top item 路径。
     * @param {string} subItemPath BDD sub item path。
     * @returns {string}
     * @private
     */
    te.bdd._sliceTopItemPath = function (subItemPath) {
        var index = subItemPath.indexOf("/");
        return index === -1 ? subItemPath : subItemPath.substring(0, index);
    };

    /**
     *递归遍历sub item tree
     * @param {String} item Pah或item对象
     * @param {function(Object):boolean} action 处理每个sub item节点的回调函数，返回boolean值，若返回true，则终止递归
     * ，反之，继续迭代直至遍历整个sub item树。
     * @param {boolean} [simply=true] 是否执行简化的查询，默认为true，sub item简化查询后返回属性：key、title、path、titlePath，
     * top item简化查询后的返回属性：key、title、updateTime、path。
     * @param {boolean} [cache=true] 后端Ajax接口有效数据返回后是否在前端缓存，默认为true。
     */
    te.bdd.recurseInItem = function (item, action, simply, cache) {
        simply = te.nvl(simply, true);
        cache = te.nvl(cache, true);
        if (typeof item === 'string' && te.notNOS(item)) {
            var topOrSub = te.bdd.isTopOrSub(item);
            if (topOrSub === 1) {
                te.bdd.queryTopItem(item, function (topItem) {
                        if (topItem) {
                            te.bdd.recursiveInTopItem(topItem, action);
                        }
                    },
                    simply,
                    cache)
            } else if (topOrSub === 2) {
                te.bdd.querySubItem(item,
                    function (subItem) {
                        te.bdd.recursiveInSubItem(subItem, action);
                    },
                    simply,
                    cache)
            } else {
                //todo 异常处理：无效Path格式处理
            }
        } else if (typeof item === 'object' && item !== null) {
            if (te.bdd.isTopOrSub(item) === 1) {
                te.bdd.recursiveInTopItem(item, action);
            } else if (te.bdd.isTopOrSub(item) === 2) {
                te.bdd.recursiveInSubItem(item, action);
            }
        }

    };

    /**
     *递归遍历sub item tree
     * @param subItem {Object} sub item树的起点
     * @param action {function(Object):boolean} 处理每个sub item节点的回调函数，返回boolean值，若返回true，则终止递归
     * ，反之，继续迭代直至遍历整个sub item 树。
     * @returns {boolean}
     */
    te.bdd.recursiveInSubItem = function (subItem, action) {
        if (action(subItem)) return true;
        if (subItem.hasOwnProperty("subItems")) {
            var subItems = subItem.subItems;
            for (var i = 0; i < subItems.length; i++) {
                // te.bdd.recursiveInSubItem(subItems[i], action);
                if (te.bdd.recursiveInSubItem(subItems[i], action)) return true;
            }
        }
        return false;
    };

    /**
     *递归遍历top item tree所属sub item
     * @param topItem {Object} top item树的起点
     * @param action {function(Object):boolean} 处理每个sub item节点的回调函数，返回boolean值，若返回true，则终止递归
     * ，反之，继续迭代直至遍历整个sub item 树。
     * @return {boolean}
     */
    te.bdd.recursiveInTopItem = function (topItem, action) {
        if (topItem.hasOwnProperty("subItems")) {
            var subItems = topItem.subItems;
            for (var i = 0; i < subItems.length; i++) {
                // te.bdd.recursiveInSubItem(subItems[i], action);
                if (te.bdd.recursiveInSubItem(subItems[i], action)) return true;
            }
        }
        return false;
    };

    /**
     * 查询BDD sub item
     * @param {string} subItemPath sub item 路径.
     * @param action {function(Object):void} 查询到有效数据后执行的回调函数，当未能查询到有效sub item时，不执行回调函数。
     * @param {boolean} [simply=true] 是否执行简化的查询，默认为true，sub item简化查询后返回属性：key、title、path、titlePath，
     * top item简化查询后的返回属性：key、title、updateTime、path。
     * @param {boolean} [cache=true] 后端Ajax接口有效数据返回后是否在前端缓存。
     */
    te.bdd.querySubItem = function (subItemPath, action, simply, cache) {
        simply = te.nvl(simply, true);
        cache = te.nvl(cache, true);
        if (te.bdd.isTopOrSub(subItemPath) === 2) {
            var topItemPath = te.bdd._sliceTopItemPath(subItemPath);
            te.bdd.queryTopItem(
                topItemPath,
                function (topItem) {
                    var subItems = topItem.subItems;
                    for (var i = 0; i < subItems.length; i++) {
                        if (te.bdd.recursiveInSubItem(subItems[i], function (item) {
                                if (item.path === subItemPath) {
                                    action(item);
                                    return true;
                                }
                                return false;
                            })) break;
                    }
                },
                simply,
                cache);
        }
    };

    /**
     * 查询前端缓存的sub item数据.
     * @param {string} subItemPath sub item path.
     * @returns {Object} BDD sub item对象
     */
    te.bdd.queryLocalSubItem = function (subItemPath) {
        var targetItem = null;
        if (te.bdd.isTopOrSub(subItemPath) === 2) {
            var topItemPath = te.bdd._sliceTopItemPath(subItemPath);
            var topItem = te.bdd.queryLocalTopItem(topItemPath);
            if (topItem) {
                var subItems = topItem.subItems;
                for (var i = 0; i < subItems.length; i++) {
                    if (te.bdd.recursiveInSubItem(subItems[i], function (item) {
                            if (item.path === subItemPath) {
                                targetItem = item;
                                return true;
                            }
                            return false;
                        })) break;
                }
            }
        }
        return targetItem;
    };

    /**
     * BDD数据批量加载
     * <p>通过一次Ajax调用，从服务器加载多个top item。</p>
     * <p>BDD数据初始化：在页面加载后立即执行BDD数据批量加载，加载后完成后，所有已成功加载的BDD top item相关的代码，
     * 可由异步回调方式改为同步调用，从而简化客户端编程，同步调用函数包括：te.bdd.queryLocalItem、te.bdd.queryLocalTopItem、
     * te.bdd.queryLocalSubItem，注意：数据初始化后，非同步函数实际执行的逻辑也是同步的。</p>
     * <p>每次加载数据后，将刷新前端缓存数据。</p>
     * @param {string} topItemPaths 多个TopItem path子串，用英文逗号分隔。
     * @param {function(Object):void} action 数据加载成功后的回调函数，参数为返回的TopItem数组，当未能查询到有效数据时，不执行回调函数。
     * @param {boolean} [simply=true] 是否执行简化的查询，默认为true，sub item简化查询后返回属性：key、title、path、titlePath，
     * top item简化查询后的返回属性：key、title、updateTime、path。
     * @param {boolean} [cache=true] 后端Ajax接口有效数据返回后是否在前端缓存，默认为true。
     */
    te.bdd.loadData = function (topItemPaths, action, simply, cache) {
        simply = te.nvl(simply, true);
        cache = te.nvl(cache, true);
        te.ajax("/te/bdd/queryTopItemList",
            {topItemPaths: topItemPaths, simply: simply},
            function (topItems) {
                if (cache) {
                    for (var i = 0; i < topItems.length; i++) {
                        te.bdd._topItemList[topItems[i].path] = topItems[i];
                    }
                }
                action(topItems);
            });
    };

    /**
     * 更新制定top item，若前端缓存中无此top item，不执行更新操作。
     * @param {string} topItemPath
     * @param {function(Object):void} action 有更新数据返回后执行的回调函数。
     */
    te.bdd.updateTopItem = function (topItemPath, action) {
        if (te.notNOS(topItemPath) && te.bdd._topItemList.hasOwnProperty(topItemPath)) {
            te.ajax(
                "/te/bdd/queryTopItemToUpdate",
                {
                    path: topItemPath,
                    updateTs: te.bdd._topItemList[topItemPath].updateTs,
                    simply: !te.bdd._topItemList[topItemPath].hasOwnProperty('desc')
                },
                function (topItem) {
                    if (topItem) {
                        te.bdd._topItemList[topItem.path] = topItem;
                        action(topItem);
                    }
                });
        }
    };

    /**
     * 更新前端全部top item
     * @private
     */
    te.bdd._updateAll = function () {
        if (!te.bdd._topItemList && $.isEmptyObject(te.bdd._topItemList)) return;

        var topItemBriefs = [];
        for (var topItemPath in te.bdd._topItemList) {
            if (te.bdd._topItemList.hasOwnProperty(topItemPath))
                topItemBriefs.push({
                    path: te.bdd._topItemList[topItemPath].path,
                    updateTs: te.bdd._topItemList[topItemPath].updateTs,
                    simply: !te.bdd._topItemList[topItemPath].hasOwnProperty('desc')
                });
        }
        if (topItemBriefs.length > 0) {
            te.ajax("/te/bdd/queryUpdatedList",
                {topItemBriefs: JSON.stringify(topItemBriefs)},
                function (topItems) {
                    for (var i = 0; i < topItems.length; i++) {
                        te.bdd._topItemList[topItems[i].path] = topItems[i];
                    }
                });
        }
    };

    /**
     * 清除前端缓存中的top item
     * @param {string} [topItemPath] top item path，若为空，或未设置，清空全部前端缓存。
     */
    te.bdd.clear = function (topItemPath) {
        if (te.isNOS(topItemPath)) {
            te.bdd._topItemList = {};
        } else {
            if (te.bdd._topItemList.hasOwnProperty(topItemPath)) {
                delete te.bdd._topItemList[topItemPath];
            }
        }
    };

    /**
     * 周期更新计时器句柄
     * @type {number}
     */
    te.bdd.updatingTimer = -1;

    /**
     * 周期性更新，默认更新周期由te.bdd.constants.updatingPeriod设定，计时器句柄见te.bdd.updatingTimer。
     * @private
     */
    te.bdd._monitor = function () {
        if (te.bdd._updateTimer !== -1) clearInterval(te.bdd._updateTimer);

        te.bdd.updatingTimer = window.setInterval(function () {
            te.bdd._updateAll();
        }, te.bdd.constants.updatingPeriod);
    };
    te.bdd._stopMonitor = function () {
        if (te.bdd.updatingTimer !== -1) {
            clearInterval(te.urm.heartbeatTimer);
            te.bdd.updatingTimer = -1;
        }
    };

    //启动BDD监控：周期更新
    if (te.isProductMode()) te.bdd._monitor();


//------------------------------ URM------------------------------

    /**
     * URM（用户与权限管理）组件
     * @type {{}}
     */
    te.urm = {};

    /**
     * URM组件参数默认值，属性包括：heartbeatPeriod（心跳计时器周期）、auUpdatingPeriod（权限集更新计时器周期，默认为300秒）。
     * @type {{heartbeatPeriod: number, auUpdatingPeriod: number}}
     */
    te.urm.default = {
        heartbeatPeriod: 25 * 1000,
        auUpdatingPeriod: 300 * 1000
    };

    // te.urm.default = {
    //     heartbeatPeriod: 30 * 1000,
    //     auUpdatingPeriod: 3 * 60 * 1000
    // };

    /**
     * URM组件常量集
     * @constant
     * @type {{}}
     */
    te.urm.constants = {TOKEN_PARAM_NAME: '__zdpToken'};
    /**
     * 客户端类别：PC端浏览器
     * @constant
     * @type {int}
     */
    te.urm.constants.CLIENT_TYPE_BROWSER_PC = 0;
    /**
     * 客户端类别：移动端浏览器
     * @constant
     * @type {int}
     */
    te.urm.constants.CLIENT_TYPE_BROWSER_MOBILE = 1;
    /**
     * 客户端类别：微信端浏览器
     * @constant
     * @type {int}
     */
    te.urm.constants.CLIENT_TYPE_BROWSER_WEIXIN = 2;
    /**
     * 客户端类别：移动端原生：Android
     * @constant
     * @type {int}
     */
    te.urm.constants.CLIENT_TYPE_MOBILE_ANDROID = 3;
    /**
     * 客户端类别：移动端原生：IOS
     * @constant
     * @type {int}
     */
    te.urm.constants.CLIENT_TYPE_MOBILE_IOS = 4;
    /**
     * 客户端类别：占位，扩展用。
     * @type {int}
     */
    te.urm.constants.CLIENT_TYPE_PLACEHOLDER_01 = 100;
    te.urm.constants.CLIENT_TYPE_PLACEHOLDER_02 = 101;
    te.urm.constants.CLIENT_TYPE_PLACEHOLDER_03 = 102;
    te.urm.constants.CLIENT_TYPE_PLACEHOLDER_04 = 103;
    te.urm.constants.CLIENT_TYPE_PLACEHOLDER_05 = 104;

    /**
     * 统一用户（Unified User）摘要，包含属性：token（令牌）、userId（统一用户ID）、auKeys（权限集）、auUpdateTime（权限集最后更新时间戳）、clientType（前端类别标识）。
     * @type {{}}
     */
    te.urm.brief = {};

    /**
     *检查前端登录标志，确定是否已登录验证通过。
     * <p></p><b>注意：此函数返回true时，并不意味着当前用户在服务器端为有效的已登录状态，仅代表前端状态。</b></p>
     * @returns {boolean}
     */
    te.urm.hasLogin = function () {
        return te.urm.brief.hasOwnProperty('loginResult') && te.urm.brief.loginResult;
    };

    /**
     * 当前已登录用户是否拥有指定的权限
     * @param {string} authorityKey 待测试的权限
     * @return {boolean}
     */
    te.urm.hasAuthority = function (authorityKey) {
        if (te.urm.hasLogin() && te.urm.brief.hasOwnProperty("auKeys") && Array.isArray(te.urm.brief.auKeys)
            && te.notNOS(authorityKey)) {
            for (var i = 0; i < te.urm.brief.auKeys.length; i++) {
                if (te.urm.brief.auKeys[i] === authorityKey) {
                    return true;
                }
            }
        }
        return false;
    };


    /**
     * 当前已登录用户拥有的权限集，与指定权限集是否有交集。
     * @param {*} authorityKeys 待测试的指定权限集，
     * @return {boolean}
     */
    te.urm.hasAuthorityIntersection = function (authorityKeys) {
        if (te.urm.hasLogin() && te.urm.brief.hasOwnProperty("auKeys") && Array.isArray(te.urm.brief.auKeys)
            && te.notNOU(authorityKeys)) {
            var keys = [];
            if (typeof authorityKeys === "string") {
                keys = authorityKeys.split(",");
            } else if (Array.isArray(authorityKeys)) {
                keys = authorityKeys
            }
            if (keys !== null) {
                for (var j = 0; j < keys.length; j++) {
                    for (var i = 0; i < te.urm.brief.auKeys.length; i++) {
                        if (te.urm.brief.auKeys[i] === keys[j]) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };

    te.urm.getToken = function () {
        var token = null;
        if (te.notNOS(token = te.getCookie("token"))) {
            return token;
        }
        if (te.notNOS(token = te.getUrlParam("token"))) {
            return token;
        }
    };

    /**
     * 已登录侦测
     * @private
     */
    te.urm._detectLogin = function () {
        te.ajax(
            "/te/urm/detectLogin",
            {},
            function (rs) {
                if (rs && rs.hasOwnProperty('loginResult') && typeof rs.loginResult === 'boolean' && rs.loginResult) {
                    te.urm.brief.loginResult = true;
                    te.urm.brief.auKeys = rs.auKeys;
                    te.urm.brief.auUpdateTime = rs.auUpdateTime;
                    te.urm.brief.clientType = rs.clientType;
                    if (te.isProductMode()) te.urm._actionAfterLogin();
                }
            });
    };
    te.urm._detectLogin();

    /**
     * 登录验证，每次登录成功后会刷新当前登录摘要，每次登录失败后不清空当前登录摘要。
     * @param {string} userId 统一用户ID。
     * @param {string} pwd 登录密码。
     * @param {function(Object):void} action1 验证通过回调函数，参数为验证返回数据集（Object）。
     * @param {function(Object):void} [action2=null] 验证失败回调函数，参数为验证返回数据集（Object）。
     * @param {int} [clientType=te.urm.constants.CLIENT_TYPE_BROWSER_PC] 前端类别，从组件常量集te.urm.constants中CLIENT_TYPE
     * 前缀的常量中选择。
     */
    te.urm.login = function (userId, pwd, action1, action2, clientType) {
        clientType = te.nvl(clientType, te.urm.constants.CLIENT_TYPE_BROWSER_PC);
        if (te.notNOS(userId) && te.notNOS(pwd) && te.notNOU(action1)) {
            te.ajax(
                "/te/urm/login",
                {userId: userId, pwd: pwd, clientType: clientType},
                function (rv) {
                    if (rv && rv.hasOwnProperty('loginResult') && typeof rv.loginResult === 'number') {
                        if (rv.loginResult === 1) {
                            te.urm.brief.loginResult = true;
                            te.urm.brief.auKeys = rv.auKeys;
                            te.urm.brief.auUpdateTime = rv.auUpdateTime;
                            te.urm.brief.clientType = clientType;
                            if (rv.hasOwnProperty(te.urm.constants.TOKEN_PARAM_NAME))
                                te.urm.brief.zdpToken = rv[te.urm.constants.TOKEN_PARAM_NAME];
                            if (te.isProductMode()) {
                                te.urm._actionAfterLogin();
                                te.bdd._monitor();
                            }
                            if (te.notNOU(action1)) action1(rv);
                        } else if (rv.loginResult === 2 || rv.loginResult === 3 || rv.loginResult === 4) {
                            if (te.notNOU(action2)) action2(rv);
                            console.log('返回码：' + rv.loginResult + '，' + rv.feedbackMsg);
                        }
                    } else {
                        console.log('登录返回异常');
                    }
                });
        }
    };

    /**
     * 更新当前已登录用户的权限集（AuKey），只用户权限集发生变更时返回有效数据。
     */
    te.urm.updateAuKeys = function () {
        if (te.urm.hasLogin()) {
            te.ajax(
                "/te/urm/updateAuKeys",
                {auUpdateTime: te.urm.brief.auUpdateTime},
                function (rs) {
                    if (rs && rs.hasOwnProperty('auKeys') && rs.hasOwnProperty('auUpdateTime')) {
                        te.urm.brief.auKeys = rs.auKeys;
                        te.urm.brief.auUpdateTime = rs.auUpdateTime;
                    }
                });
        }
    };

    /**
     * 更新计时器句柄
     * @type {number}
     */
    te.urm.auUpdatingTimer = -1;

    /**
     * 心跳计时器句柄
     * @type {number}
     */
    te.urm.heartbeatTimer = -1;

    /**
     * 在线心跳操作
     * @private
     */
    te.urm._heartbeat = function () {
        if (te.urm.hasLogin()) {
            te.ajax(
                "/te/urm/heartbeat",
                {},
                function (rs) {
                    console.log('Heartbeat：' + rs);
                    if (te.notNOU(rs) && typeof rs === 'boolean') {
                        if (rs) {
                        } else {
                            te.urm._loginOutLocal();
                        }
                    }
                });
        }
    };

    /**
     * 成功登录后的操作
     * @private
     */
    te.urm._actionAfterLogin = function () {
        if (te.urm.auUpdatingTimer !== -1)
            clearInterval(te.urm.auUpdatingTimer);
        if (te.urm.heartbeatTimer !== -1)
            clearInterval(te.urm.heartbeatTimer);

        //启动更新计时器
        te.urm.auUpdatingTimer = window.setInterval(function () {
            te.urm.updateAuKeys();
        }, te.urm.default.auUpdatingPeriod);
        //启动心跳计时器
        te.urm.heartbeatTimer = window.setInterval(function () {
            te.urm._heartbeat();
        }, te.urm.default.heartbeatPeriod);
    };

    te.urm._loginOutLocal = function () {
        te.urm.brief = {};
        if (te.urm.auUpdatingTimer !== -1) {
            clearInterval(te.urm.auUpdatingTimer);
            te.urm.auUpdatingTimer = -1;
        }
        if (te.urm.heartbeatTimer !== -1) {
            clearInterval(te.urm.heartbeatTimer);
            te.urm.heartbeatTimer = -1;
        }
    };

    /**
     * 登出，终止更新、心跳计时器，并清空登录摘要信息。
     */
    te.urm.logout = function () {
        if (te.urm.hasLogin()) {
            te.ajax(
                "/te/urm/logout",
                {token: te.urm.brief.token},
                function (rs) {
                    if (rs !== null && te.urm.hasLogin()) {
                        if (rs === true) {
                            console.log("Logout successfully.");
                        } else {
                            console.log("Logout failure.");
                        }
                        te.urm._loginOutLocal();
                        te.bdd._stopMonitor();
                    }
                });
        }
    };

    /**
     * 存储数据至服务器端ClientSession
     * @param userId
     * @param clientType
     * @param data
     * @param scope
     * @todo 存储数据至服务器端SessionManager、ClientSession
     */
    te.urm.setAttributeOnServer = function (userId, clientType, data, scope) {
    };

    /**
     * 给URL增加Token参数，或给Post查询参数增加Token值。
     * @param target
     * @return {*}
     */
    te.urm.addToken = function (target) {
        if (te.notNOU(target) && te.urm.hasLogin()
            && te.urm.brief.zdpToken) {
            if (typeof target === 'string') {
                return te.addUrlParam(target, te.urm.constants.TOKEN_PARAM_NAME, te.urm.brief.zdpToken);
            } else if (typeof target === 'object') {
                target[te.urm.constants.TOKEN_PARAM_NAME] = te.urm.brief.zdpToken;
                return target;
            }
        }
        return target;
    };

    te.urm.createTokenHiddenInput = function () {
        if (te.urm.hasLogin()) {
            return '<input type="hidden" name="token" value="' + te.urm.brief.token + '" />';
        }
        return "";
    };

//------------------------------ PAGINATION------------------------------

    /**
     * 分页组件
     * @type {{}}
     */
    te.pagination = {};

    /**
     * 分页默认参数值
     * @type {{pageNumber: number, pageCapacity: number}}
     */
    te.pagination.default = {pageNumber: 1, pageCapacity: 30};

    /**
     * 分页查询
     * @param {string} pageId 分页句柄
     * @param {function(Object):void} action 分页数据返回后的回调函数，参数为Object实例，包含属性：
     * pageCapacity（int，页面容量）、pageTotal（总页数）、pageNumber（页码）、rowCount（总行数）、beginRow（起始行编号）、
     * endRow（结束行编号）、currentPageData（当前页的数据集）、params（实际执行的查询参数）。
     * @param {Object} [params=null] 查询参数。
     * @param {int} [pageNumber=1] 页码，默认值由te.pagination.default.pageNumber设定。
     * @param {string} [sortIndicator] 排序字串，格式：&lt;字段名1&gt;,&lt;a/d&gt;[;&lt;字段名2&gt;,&lt;a/d&gt;[...[;&lt;字段名n&gt;,&lt;a/d&gt;]]]。
     * @param {int} [pageCapacity=30] 页容量，默认值由te.pagination.default.pageCapacity设定。
     */
    te.pagination.queryPage = function (pageId, action, params, pageNumber,
                                        sortIndicator, pageCapacity) {
        pageNumber = te.nvl(pageNumber, te.pagination.default.pageNumber);
        pageCapacity = te.nvl(pageCapacity, te.pagination.default.pageCapacity);
        if (te.notNOS(pageId) && te.notNOU(action) && te.isFinite(pageNumber) && te.isFinite(pageCapacity)) {
            te.ajax(
                "/te/pagination/paginate",
                {
                    paginationSql: pageId,
                    params: JSON.stringify(params),
                    sortIndicator: sortIndicator,
                    pageCapacity: pageCapacity,
                    pageNumber: pageNumber
                },
                function (rv) {
                    action(rv);
                });
        }
    };

//------------------------------ ATTACHMENT ------------------------------
    te.att = {};

    /**
     * 附件文件下载
     * @param {string} id 附件ID
     */
    te.att.download = function (id) {
        te.navigateByForm(te.config.urlPre + "/te/attachment/downloadFile", {id: id});
    };

    /**
     * 附件文件删除
     * @param id
     * @param {function():void} [action1] 删除成功后的回调函数
     * @param {function():void} [action2] 删除失败后的回调函数
     */
    te.att.delete = function (id, action1, action2) {
        te.ajax(
            "/te/attachment/deleteFile",
            {id: id},
            function (data) {
                if (typeof data === "boolean") {
                    if (data) {
                        if (te.notNOU(action1)) action1();
                    } else {
                        if (te.notNOU(action2)) action2();
                    }
                }
            });
    };

    /**
     * 上载multipart类型表单数据
     * 兼容性： >IE10
     * @param {FormData} formData HTML5中XMLHttpRequest Level2类型FormData，包装二进制（流）文件上载表单数据。
     * @param {function(Object):void} action1 下载完成回调函数，若无有效文件上载，忽略此回调函数。
     * @param {function(): void} [action2=null] 下载失败回调函数
     */
    te.att.upload = function (formData, action1, action2) {
        te.ajax("/te/attachment/uploadFile",
            formData,
            function (rv) {
                if (!$.isEmptyObject(rv)) {
                    if (te.notNOU(action1)) action1(rv);
                }
            },
            true, action2);
    };

//------------------------------ CRUD ------------------------------
    te.crud = {};

    te.crud.constants = {
        RETURN_KEY_RESULT: "__result",
        RETURN_KEY_MESSAGE: "__msg",
        RETURN_KEY_ACTION_BRIEF: "__brief",
        RETURN_KEY_ERRORS: "__errors",
        RETURN_KEY_DATA: "__data"
    };

    /**
     * 服务器端业务逻辑映射，属性值为Ajax URL的一部分，初始仅设置少量必要的actionKey，其余key从BDD动态加载，
     * 从BDD中动态加载的action映射若已存在于当前的映射集中，覆盖。
     * @type {{: string}}
     */
    te.crud.actionKeys = {
        sysAdmin_bdd_createItemSet: '/te/bdd/createItemSet',
        sysAdmin_bdd_updateItemSet: '/te/bdd/updateItemSet',
        sysAdmin_bdd_deleteItemSet: '/te/bdd/deleteItemSet',
        sysAdmin_bdd_createTopItem: '/te/bdd/createTopItem',
        sysAdmin_bdd_updateTopItem: '/te/bdd/updateTopItem',
        sysAdmin_bdd_deleteTopItem: '/te/bdd/deleteTopItem',
        sysAdmin_bdd_createSubItem: '/te/bdd/createSubItem',
        sysAdmin_bdd_updateSubItem: '/te/bdd/updateSubItem',
        sysAdmin_bdd_deleteSubItem: '/te/bdd/deleteSubItem',
        sysAdmin_bdd_moveSubItem: '/te/bdd/moveSubItem',
        xxx: '/xx/xx/xxx'
    };

    // te.crud._initActionKeys = ["TE:crud_action_keys/sysAdmin", "TE:crud_action_keys"];
    // te.crud._initActionKeys = ["TE:crud_action_keys/sysAdmin","TE:crud_action_keys/customer"];
    te.crud._initActionKeys = ["TE:crud_action_keys"];

    /**
     * 初始化Action Key
     * @private
     */
    te.crud._init = function () {
        for (var i = 0; i < te.crud._initActionKeys.length; i++) {
            te.bdd.queryItem(te.crud._initActionKeys[i], function (rv) {
                te.bdd.recurseInItem(rv, function (subItem) {
                    if (subItem) {
                        for (var i = 1; i < 11; i++) {
                            var keyStr = subItem["v" + i];
                            if (keyStr) {
                                var keyMaps = keyStr.split(";");
                                for (var j = 0; j < keyMaps.length; j++) {
                                    var keyValue = keyMaps[j].split(",");
                                    te.crud.actionKeys[keyValue[0]] = keyValue[1];
                                }
                            }
                        }
                    }
                    return false;
                });
            }, false);
        }
    };
    te.crud._init();

    /**
     * 查询Action key对应的URL
     * @param actionKey Action key
     * @return {string}
     */
    te.crud.queryURL = function (actionKey) {
        var url = te.crud.actionKeys[actionKey];

        if (te.notNOS(url)) {
            if (te.notNOS(te.config.corsServerUrl)) {
                url = te.config.corsServerUrl.trim() + te.config.urlPre + url;
            } else {
                url = te.config.urlPre + url;
            }
        }

        return url;
    };

    /**
     * 执行服务器端业务逻辑
     * <p>业务逻辑被正常调用，且返回值中的执行结果（属性te.crud.constants.RETURN_VALUE_RESULT）为true时，调用回调函数action1。
     * 业务逻辑被正常调用，且返回值中的执行结果（属性te.crud.constants.RETURN_VALUE_RESULT）为false时，调用回调函数action2。
     * 业务逻辑被正常调用，但无返回值，或返回值中无执行结果（属性te.crud.constants.RETURN_VALUE_RESULT）时，调用回调函数action3。
     * 远程调用异常时，执行回调函数action4</p>
     * @param {String} actionKey 业务逻辑Key
     * @param {Object} [params] 参数
     * @param {function(Object):void} [action1=null] 远程异步调用正常完成、业务逻辑执行结果为true后的回调函数，参数值为服务器端返回值。
     * @param {function(Object):void} [action2=null] 远程异步调用正常完成、业务逻辑执行结果为false后的回调函数，参数值为服务器端返回值。
     * @param {function(Object):void} [action3=null] 远程异步调用正常完成后的回调函数，参数值为服务器端返回值。
     * @param {boolean} [multipart=false] 提交的数据表单ContentType是否为multipart/form-data类型，通常为文件上载。
     * @param  {function(Object):void} [action4=null] 远程异步调用出现异常后的回调函数
     */
    te.crud.do = function (actionKey, params, action1, action2, action3, multipart, action4) {
        if (te.notNOS(actionKey) && te.crud.actionKeys.hasOwnProperty(actionKey)) {
            te.ajax(
                te.crud.actionKeys[actionKey],
                params,
                function (rv) {
                    if (te.notNOU(rv) && rv.hasOwnProperty(te.crud.constants.RETURN_KEY_RESULT)) {
                        if (rv[te.crud.constants.RETURN_KEY_RESULT] && te.notNOU(action1)) action1(rv);
                        if (!rv[te.crud.constants.RETURN_KEY_RESULT] && te.notNOU(action2)) action2(rv);
                    } else {
                        if (te.notNOU(action3)) action3(rv);
                    }
                },
                multipart, action4);
        }
    };

    /**
     * 上载multipart类型表单数据
     * 兼容性： >IE10
     * @param {string} url URL
     * @param {FormData} formData HTML5中XMLHttpRequest Level2类型FormData，包装二进制（流）文件上载表单数据。
     * @param {function(Object):void} action1 下载完成回调函数
     * @param {function(): void} action2 下载失败回调函数
     */
    te.crud.uploadMultipartForm = function (url, formData, action1, action2) {
        te.ajax(url, formData, action1, true, action2);
    };

    te.crud.getErrorMsg = function (errors, entityKey) {
        //todo

    };

    te.crud.eachError = function (errors, action, include, exclude) {
        //todo

    };

    te.crud.isSuccess = function (valueFromServer) {
        //todo

    };

//todo: ------------------------------ SEQUENCER ------------------------------
    te.sequencer = {};

//todo: ------------------------------TOKEN ------------------------------
    te.token = {};

//todo: ------------------------------ LOGGER ------------------------------
    te.logger = {};

//todo: ------------------------------ ERR ------------------------------
    te.err = {};

//todo: ------------------------------ DEBUG ------------------------------
    te.debug = {};
    te.debug.log = function (data) {
        console.log(data);
    };

    window.te = te;
})();