<template>
  <div style="width: 0">
    <div style="display: none" id="generator">

<div class="container" :style="{ paddingTop: height / 750 * 100 + '%' }">**
  <div class="wrapper">
    +- 背景图 -+
    <template v-for="val in bgImage">
    <img width="100%" :data-src="val.src">**
    </template>
    +- 图片 -+
    <div v-for="val in image"
      :style="{
        position: 'absolute',
        width: val.width / 7.5 + '%',
        height: val.height / height * 100 + '%',
        left: val.left / 7.5 + '%',
        top: val.top / height * 100 + '%',
      }">**
      <!-- hover 图片 -->
      <img 
        v-if="val.hoverPic"
        width="100%"
        :data-src="val.hoverSrc"
        :style="{
          position: 'absolute',
          left: '0',
          top: '0',
          zIndex: val.z
        }">**
      <!-- 带超链接的图 -->
      <a v-if="val.href" 
        :href="val.href"
        :style="{
          display: 'block',
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: val.z
        }">**
        <img 
          width="100%"
          :data-hover="!!val.hoverPic"
          :data-src="val.src"
          :data-expire="val.expireSrc">**
      </a>
      <!-- 不带超链接的图 -->
      <img v-else
        width="100%"
        :data-hover="!!val.hoverPic"
        :data-src="val.src"
        :data-expire="val.expireSrc"
        :style="{
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: val.z
        }">**
    </div>

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
        zIndex: val.z,
        fontSize: '1rem'
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
        backgroundColor: val.bgColor,
        borderStyle: 'solid',
        borderRadius: val.radius + 'px',
        borderColor: val.borderColor,
        borderWidth: val.borderWidth + 'px',
        flexDirection: val.dir,
        justifyContent: val.justify,
        alignItems: val.align
      }">**
      <!-- 图片 -->
      <template v-for="item in val.image">
      <div :style="{
          width: item.width / val.width * 100 + '%',
          height: item.height / val.height * 100 + '%',
          position: 'relative'
        }">**
        <!-- hover 图片 -->
        <template>
        <img v-if="item.hoverSrc"
          width="100%"
          height="100%"
          :data-src="item.hoverSrc"
          :style="{
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: item.z
          }" />++
        </template>
        <!-- 带超链接的图 -->
        <template v-if="item.href">
        <a :href="item.href"
          style="{
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
          }"
          :style="{
            zIndex: item.z
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
          width="100%"
          height="100%"
          :style="{
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: item.z
          }" />**
        </template>
      </div>++
      </template>
      <!-- 文本 -->
      <template v-for="item in val.text">
      <div v-html="item.text"
        :style="{
          width: item.width / val.width * 100 + '%',
          height: item.height / val.height * 100 + '%',
          lineHeight: item.lineHeight,
          zIndex: item.z,
          fontSize: '1rem'
        }">
      </div>**
      </template>
    </div>**
    </template>
    <template v-if="signup">
    +- 注册组件 -+
    <signup :data="signup" :height="height"></signup>
    </template>

</div>++</div>

    </div><!-- end of generator -->

    <!-- 选择生成哪些代码 -->
    <popbox ref="popbox" title="选择需要复制的代码" @confirm="generate">
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
  import Stats from './stats.js'
  import Bridge from './bridge.js'
  import Style from './style.js'
  import signup from '@/components/elements/signup/generator.vue'

  export default {
    data () {
      return {
        height: 0,
        title: '',
        endTime: '',
        bgImage: [],
        image: [],
        text: [],
        container: [],
        signup: null,
        contain: ['head', 'bridge', 'body', 'stats']
      }
    },

    components: {
      signup: signup
    },

    methods: {
      showDialog () {
        this.$refs.popbox.show = true;
      },

      // 点击确定，生成代码
      generate () {
        this.getData();

        setTimeout(() => {
          this.joinData();
        }, 0)
      },

      // 获取并处理源数据
      getData () {
        this.bgImage = this.$store.state.h5.bgImage;
        var image = this.$store.state.h5.image;
        var text = this.$store.state.h5.text;
        var page = this.$store.state.h5.page;
        var signup = this.$store.state.h5.signup;

        this.title = page.title;
        this.height = page.height;
        this.endTime = page.endTime;

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
        });

        // 判断注册组件是否存在
        if (signup) {
          this.signup = signup;

          // 将按钮图片设置为组件对象的属性
          this.signup.btn = image.filter(val => val.belong === 'signup')[0] || {};
        }
      },

      // 整合数据
      joinData () {
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
`
+ Style +
`
<body>
`
: '';

        var bridge = this.contain.indexOf('bridge') > -1 ? Bridge : '';

        var body = this.contain.indexOf('body') > -1  
          ? this.formatCode(document.getElementById('generator').innerHTML)
          : '';

        var signup = !this.signup 
        ? ''
        :
`
<script src="https://js1-itzcdn-com.alikunlun.com/static_res/js/third/jquery-1.9.1.js">\<\/script\>
<script>window.itz = {};window.itz.wap={}\<\/script\>
<script src="https://js1-itzcdn-com.alikunlun.com/static/wap/js/newreg.min.js">\<\/script\>
<script>
  new itz.wap.register({})
\<\/script\>

`
        var js = signup +
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
        this.copy2clipboard(output);
      },

      // 代码格式化
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
      copy2clipboard (output) {
        this.$refs.popbox.show = false;

        document.getElementById('copy').value = output;
        document.getElementById('copy').select();

        try {
          if (document.execCommand('copy')) {
            $communicator.$emit('notify', {
              info: 'Copied to clipboard !',
              type: true
            })
          } else {
            throw new Error('failed')
          }
        } catch (e) {
          alert(e)
        }
      }
    }
  }
</script>