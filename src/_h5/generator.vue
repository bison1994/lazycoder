<template>
  <div style="position: absolute;">
    <div style="display: none" id="generator">
      <div class="container" :style="{ paddingTop: height / 750 * 100 + '%' }">
        <div class="wrapper">

          <!-- hover 图片 -->
          <img v-for="val in hoverPic"
            :src="val.hoverSrc"
            :width="val.width / 7.5 + '%'"
            :style="{
              position: 'absolute',
              left: val.left / 7.5 + '%',
              top: val.top / height * 100 + '%',
              zIndex: val.z
            }">

          <!-- 图片 -->
          <template v-for="val in image">
            <!-- 带超链接的图 -->
            <a v-if="val.href" 
              :href="'javascript:' + val.href + ';'"
              :style="{
                  display: 'block',
                  position: 'absolute',
                  width: val.width / 7.5 + '%',
                  height: val.height / height * 100 + '%',
                  left: val.left / 7.5 + '%',
                  top: val.top / height * 100 + '%',
                  zIndex: val.z
                }">
              <img :data-hover="!!val.hoverPic"
                :src="val.src"
                width="100%">
            </a>
            <!-- 不带超链接的图 -->
            <img v-else
              :data-hover="!!val.hoverPic"
              :src="val.src"
              :width="val.width / 7.5 + '%'"
              :style="{
                position: 'absolute',
                left: val.left / 7.5 + '%',
                top: val.top / height * 100 + '%',
                zIndex: val.z
              }">
          </template>

          <!-- 文本 -->
          <div v-for="val in text"
            v-html="val.text"
            :style="{
              position: 'absolute',
              width: val.width / 7.5 + '%',
              height: val.height / height * 100 + '%',
              left: val.left / 7.5 + '%',
              top: val.top / height * 100 + '%',
              lineHeight: val.lineHeight,
              zIndex: val.z
            }">
          </div>

          <!-- 容器 -->
          <div v-for="val in container"
            :data-name="val.name"
            :style="{
              position: 'absolute',
              width: val.width / 7.5 + '%',
              height: val.height / height * 100 + '%',
              left: val.left / 7.5 + '%',
              top: val.top / height * 100 + '%',
              zIndex: val.z,
              display: 'flex',
              flexDirection: val.dir,
              justifyContent: val.justify,
              alignItems: val.align
            }">
            <!-- 图片 -->
            <template v-for="item in val.image">
              <!-- 带超链接的图 -->
              <a v-if="item.href" 
                :href="item.href"
                :style="{
                  width: item.width / val.width * 100 + '%',
                  height: item.height / val.height * 100 + '%',
                }">
                <img :data-hover="!!item.hoverPic"
                  :src="item.src"
                  width="100%"
                  height="100%">
              </a>
              <!-- 不带超链接的图 -->
              <img v-else
                :data-hover="!!item.hoverPic"
                :src="item.src"
                :width="item.width / val.width * 100 + '%'"
                :height="item.height / val.height * 100 + '%'">
            </template>

            <!-- 文本 -->
            <div v-for="item in val.text"
              v-html="item.text"
              :style="{
                width: item.width / val.width * 100 + '%',
                height: item.height / val.height * 100 + '%',
                lineHeight: item.lineHeight,
                zIndex: item.z
              }">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 选择生成哪些代码 -->
    <popbox ref="popbox" title="选择需要复制的代码" @confirm="output">
      <div>
        <label>
          <input type="checkbox" name="which" value="head" v-model="contain">
          Head　
        </label>
        <label>
          <input type="checkbox" name="which" value="bridge" v-model="contain">
          JS Bridge　
        </label>
        <label>
          <input type="checkbox" name="which" value="body" v-model="contain">
          Body　
        </label>
        <label>
          <input type="checkbox" name="which" value="stats" v-model="contain">
          JS Stats
        </label>
      </div>
    </popbox>

    <!-- 用于复制代码 -->
    <textarea type="text" id="copy" style="height: 0; width: 0"></textarea>
  </div>
</template>

<script>
  import popbox from '../widgets/popbox'
  export default {
    data () {
      return {
        height: 0,
        hoverPic: [],
        image: [],
        text: [],
        container: [],
        code: '',
        contain: ['head', 'bridge', 'body', 'stats']
      }
    },
    components: {
      popbox
    },
    mounted () {
      // 注册一个全局事件，方便 nav-var 组件里的按钮调用
      $communicator.$on('copy', () => {
        this.$refs.popbox.show = true;
      })
    },
    methods: {
      getData () {
        var image = this.$store.state.h5.image;
        var text = this.$store.state.h5.text;

        this.hoverPic = this.$store.getters.hoverPic;
        this.image = image.filter(val => val.belong === 'page');
        this.text = text.filter(val => val.belong === 'page');
        this.container = this.$store.state.h5.container;

        this.container.forEach(val => {
          val.image = [];
          val.text = [];

          for (var i = 0; i < image.length; i++) {
            if (image[i].belong === val.name) {
              val.image.push(image[i])
            }
          }

          for (var i = 0; i < text.length; i++) {
            if (text[i].belong === val.name) {
              val.text.push(text[i])
            }
          }
        })
      },

      generate () {
        var page = this.$store.state.h5.page;
        this.height = page.height;
        var title = page.title;     
        var head = this.contain.indexOf('head') > -1 ? 
`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${ title }</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
</head>
<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html,
  body {
    height: 100%;
    font-size: 14px;
  }
  body {
    -webkit-font-smoothing: antialiased;
    text-size-adjust: 100%;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  a:active,
  a:focus,
  a:hover {
    outline-width: 0;
    background-color: transparent;
  }
  ul, 
  ol {
    list-style-type: none;
  }
  img {
    border: 0;
  }
  [data-hover="true"]:active {
    opacity: 0;
  }
  .container {
    width: 100%;
    position: relative;
  }
  .wrapper {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
  }
  font[size="1"] {
    font-size: .85rem;
  }
  font[size="2"] {
    font-size: 1rem;
  }
  font[size="3"] {
    font-size: 1.14rem;
  }
  font[size="4"] {
    font-size: 1.286rem;
  }
  font[size="5"] {
    font-size: 1.71rem;
  }
  font[size="6"] {
    font-size: 2rem;
  }
  font[size="7"] {
    font-size: 2.29rem;
  }
</style>
<body>
`
: 
'';

        var bridge = this.contain.indexOf('bridge') > -1 ? 
`
<script>
  window.iTouziAPP = (function() {
    function _request(action, params) {
      var iframe = document.createElement("iframe");

      var url  = "itouzi://" + action + "";
      if (params) {
        url += "?";
        var pairs = [];

        for (var key in params) {
          pairs.push(key + "=" + params[key]);
        }
        url += pairs.join("&");
      };
      iframe.src = url;
      iframe.width = 1;
      iframe.height = 1;
      iframe.style.visibility = "hidden";

      iframe.onload = function() {
        document.body.removeChild(iframe);
      }

      iframe.onerror = function() {
        document.body.removeChild(iframe);
      }

      document.body.appendChild(iframe);
    }

    var imps = {
      /*打开登录页面，如需跳转回（刷新）wap页，要添加跳转目标的url*/
      login: function(url) {
        _request("login", {url: encodeURIComponent(url)});
      },
      /*打开注册页面*/
      register: function() {
        if (window.javaObj) {
            return javaObj.register();
        };
        _request("register");
      },
      /*判断是否登录*/
      hasLogged: function() {
        if (window.javaObj) {
          return javaObj.hasLogged();
        };
        return window.hasLogged;
      },
      /*获取App版本号*/
      getAppVersion: function() {
        if (window.javaObj) {
          return javaObj.getAppVersion();
        };
        return window.appVersion;
      },
      /*打开新的Webview页面, 新页面关闭与老页面没有影响*/
      openPage: function(url) {
        if (window.javaObj) {
          return javaObj.openPage(url);
        };
        _request("openPage", {url: encodeURIComponent(url)});
      },
      /*分享*/
      share: function(text, imageUrl, platform, flag, title, url) {
        if (platform instanceof Array) {
          platform = platform.join(",");
        }
                // 1.7.0新增java接口方式调用App分享功能，1.7.0及以上版本可用
        if (window.javaObj) {
            return javaObj.share(text, imageUrl, platform, flag, title, url);
        };
        _request("share", {
          "text" : text,
          "platform" : platform ,
          "imageurl" : imageUrl,
          "flag" : flag,
          "title" : title,
          "url" : url
        });
      },
      /*打开指定项目*/
      openInvestment: function(id) {
        if (window.javaObj) {
          return javaObj.openInvestment(id);
        };
        _request("openInvestment", {"id": id});
      },
      /*打开指定项目列表*/
      openInvestmentList: function() {
        if (window.javaObj) {
          return javaObj.openInvestmentList();
        };
        _request("openInvestmentList");
      },
      /*打开债券列表*/
      openDebtList: function() {
        if (window.javaObj) {
          return javaObj.openDebtList();
        };
        _request("openDebtList");
      },
      /*打开优惠券列表*/
      openCouponList: function() {
        if (window.javaObj) {
          return javaObj.openCouponList();
        };
        _request("openCouponList");
      },
      /*打开我的账户页面*/
      openMyAccountPage: function() {
        if (window.javaObj) {
          return javaObj.openMyAccountPage();
        };
        _request("openMyAccountPage");
      },
      /*打开账户设置页面 1.7.0*/
      openUserSetPage: function() {
        if (window.javaObj) {
          return javaObj.openMyAccountPage();
        };
        _request("openUserSetPage");
      },
      /*打开资产明细页面*/
      openCapitalPage: function() {
        if (window.javaObj) {
          return javaObj.openCapitalPage();
        };
        _request("openCapitalPage");
      },
      /*打开充值页面*/
      openRechargePage: function() {
        if (window.javaObj) {
          return javaObj.openRechargePage();
        };
        _request("openRechargePage");
      },
      /*打开提现页面*/
      openWithdrawPage: function() {
        if (window.javaObj) {
          return javaObj.openWithdrawPage();
        };
        _request("openWithdrawPage");
      },
      /*打开投资记录页面*/
      openInvestRecordsPage: function() {
        if (window.javaObj) {
          return javaObj.openInvestRecordsPage();
        };
        _request("openInvestRecordsPage");
      },
      /*打开交易记录页面*/
      openTradeList: function() {
        if (window.javaObj) {
          return javaObj.openTradeList();
        };
        _request("openTradeList");
      },
      /*打开还款日历页面*/
      openRepaymentPage: function() {
        if (window.javaObj) {
          return javaObj.openRepaymentPage();
        };
        _request("openRepaymentPage");
      },
      /*打开项目列表并指向某一类别, type值与直投列表筛选规则相同，2->担保，5->融租，6->保理，7->收藏，100->省心*/
      openInvestListByType: function(type) {
        if (window.javaObj) {
          return javaObj.openInvestListByType(type);
        };
        _request("openInvestListByType", {"type" : encodeURIComponent(type)});
      },
      /*获取设备OPEN-UDID号------iOS 专属*/ // -----------------1.6.0新加
      getDeviceUDID: function() {
        return window.deviceUDID;
      },
      /*获取设备IDFA号，优先使用------iOS 专属*/
      getDeviceIDFA: function() {
        return window.deviceIDFA;
      },
      /*获取设备IMEI号------Android 专属*/
      getDeviceIMEI: function() {
        if (window.javaObj) {
          return javaObj.getDeviceIMEI();
        };
      },
      /*获取设备AndroidID号，优先使用------Android 专属*/
      getDeviceAndroidID: function() {
        if (window.javaObj) {
          return javaObj.getDeviceAndroidID();
        };
      },
      /*打开邀请好友页面*/
      openInvitePage: function() {
        if (window.javaObj) {
          return javaObj.openInvitePage();
        };
        _request("openInvitePage");
      }
    };

    for (var key in imps) {
      if (window.javaObj && window.javaObj[key]) {
        imps[key] = (function(mn){
          return function(){
            return window.javaObj[mn].apply(window.javaObj, arguments);
          }
        })(key);
      }
    }

    return imps;

  })();
\<\/script\>
`
: 
'';

        var body = this.contain.indexOf('body') > -1 ? 
          this.formatCode(document.getElementById('generator').innerHTML)
          :
          '';

        var stats = this.contain.indexOf('stats') > -1 ? 
`
<script>
  // 统计代码

\<\/script\>
`
:
'';

        var tail = 
`</body>
</html>`

        var output = head + bridge + body + stats + tail;

        setTimeout(() => {
          this.copy(output);
        }, 0)
      },

      formatCode (str) {
        var arr = str.split('>');
        for (var i = 0, len = arr.length - 1; i < len; i++) {
          arr[i] += '>\n';
        }

        return arr.join('')
      },

      copy (output) {
        this.$refs.popbox.show = false;

        document.getElementById('copy').value = output;
        document.getElementById('copy').select();

        try {
          if (document.execCommand('copy')) {
            this.$emit('notify', {
              info: 'Copied to clipboard !',
              type: true
            })
          } else {
            throw new Error('failed')
          }
        } catch (e) {
          alert(e)
        }
      },

      output () {
        this.getData();
        this.generate();
      }
    }
  }
</script>