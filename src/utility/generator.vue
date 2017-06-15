<template>
  <div style="position: absolute;">
    <div style="display: none" id="generator">

<div class="container" :style="{ paddingTop: height / 750 * 100 + '%' }">++  
  <div class="wrapper">

    +- hover 图片 -+
    <template v-for="val in hoverPic">
    <img :data-src="val.hoverSrc"
      :width="val.width / 7.5 + '%'"
      :style="{
        position: 'absolute',
        left: val.left / 7.5 + '%',
        top: val.top / height * 100 + '%',
        zIndex: val.z
      }" />++
    </template>
    +- 图片 -+
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
      }">**
      <img :data-hover="!!val.hoverPic"
        :data-src="val.src"
        :data-expire="val.expireSrc"
        width="100%">**
    </a>
    <!-- 不带超链接的图 -->
    <img v-else
      :data-hover="!!val.hoverPic"
      :data-src="val.src"
      :data-expire="val.expireSrc"
      :width="val.width / 7.5 + '%'"
      :style="{
        position: 'absolute',
        left: val.left / 7.5 + '%',
        top: val.top / height * 100 + '%',
        zIndex: val.z
      }">++
    </template>
    +- 文本 -+
    <template v-for="val in text">
    <div v-html="val.text"
      :style="{
        position: 'absolute',
        width: val.width / 7.5 + '%',
        height: val.height / height * 100 + '%',
        left: val.left / 7.5 + '%',
        top: val.top / height * 100 + '%',
        lineHeight: val.lineHeight,
        zIndex: val.z
      }">
    </div>++
    </template>
    +- 容器 -+
    <template v-for="val in container">
    <div :data-name="val.name"
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
      }">**
      <!-- 图片 -->
      <template v-for="item in val.image">
      <!-- 带超链接的图 -->
      <template v-if="item.href">
      <a :href="item.href"
        :style="{
          width: item.width / val.width * 100 + '%',
          height: item.height / val.height * 100 + '%',
        }">++
        <img :data-hover="!!item.hoverPic"
          :data-src="item.src"
          :data-expire="item.expireSrc"
          width="100%"
          height="100%" />++
      </a>++
      </template>
      <!-- 不带超链接的图 -->
      <template v-else>
      <img :data-hover="!!item.hoverPic"
        :data-src="item.src"
        :data-expire="item.expireSrc"
        :width="item.width / val.width * 100 + '%'"
        :height="item.height / val.height * 100 + '%'" />++
      </template>
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
      </div>**    </div>++
    </template>

</div>++</div>

    </div><!-- end of generator -->

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
  import popbox from '../components/popbox'
  import Stats from '../assets/stats.js'
  import Bridge from '../assets/bridge.js'
  export default {
    data () {
      return {
        height: 0,
        title: '',
        endTime: '',
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
        var page = this.$store.state.h5.page;

        this.title = page.title;
        this.height = page.height;
        this.endTime = page.endTime;
        this.hoverPic = this.$store.getters.hoverPic;
        this.image = image.filter(val => val.belong === 'page');
        this.text = text.filter(val => val.belong === 'page');
        this.container = this.$store.state.h5.container;

        // 将属于容器的图片和文本数据添加到容器对象中
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
        var title = this.title;
        var time = (new Date(this.endTime)).getTime();
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

        var bridge = this.contain.indexOf('bridge') > -1 ? Bridge : '';

        var body = this.contain.indexOf('body') > -1 ? 
          this.formatCode(document.getElementById('generator').innerHTML)
          :
          '';

        var js = 
`
<script>
  // 项目是否过期
  var isExpired = ${ time } + 24 * 3600 * 1000 < (new Date()).getTime();

  // 设置图片 src
  var imgs = document.getElementsByTagName('img');
  if (isExpired) {
    for (var i = 0; i < imgs.length; i++) {
      var src = imgs[i].getAttribute('data-src');
      var _src = imgs[i].getAttribute('data-expire');
      if (_src === '' || _src === undefined) {
        imgs[i].src = src;
      } else {
        imgs[i].src = _src;
      }
    }
  } else {
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].src = imgs[i].getAttribute('data-src');
    }
  }

\<\/script\>
`

        var stats = this.contain.indexOf('stats') > -1 ? Stats : '';

        var tail = this.contain.indexOf('head') > -1 && this.contain.indexOf('body') > -1 ?
`</body>
</html>`
:
'';

        var output = head + bridge + body + js + stats + tail;

        // 将代码复制到剪贴板
        this.copy(output);
      },

      formatCode (str) {
        // 为注释添加叹号
        str = str.replace(/\+\-/g, '<!--');
        str = str.replace(/\-\+/g, '-->');

        // 将 ++ 替换为换行符
        str = str.replace(/\+\+/g, '\n');

        // 将 ** 替换为回车符
        str = str.replace(/\*\*/g, '\r');

        return str
      },

      /**
       * 复制代码到剪贴板
       * 首先将模板字符串添加到 textarea 中
       * 再执行 document.execCommand('copy') 方法
       */
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

        setTimeout(() => {
          this.generate();
        }, 0)
      }
    }
  }
</script>