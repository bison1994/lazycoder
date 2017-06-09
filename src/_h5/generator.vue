<template>
  <div style="opacity: 0; position: absolute;">
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
          <template v-for="(val, i) in image">
            <!-- 带超链接的图 -->
            <a v-if="val.href" 
              :href="val.href"
              :style="{
                  position: 'absolute',
                  left: val.left / 7.5 + '%',
                  top: val.top / height * 100 + '%',
                  zIndex: val.z,
                  width: val.width / 7.5 + '%'
                }">
              <img :data-hover="!!val.hoverPic"
                :src="val.url"
                :width="val.width / 7.5 + '%'">
            </a>
            <!-- 不带超链接的图 -->
            <img v-else
              :data-hover="!!val.hoverPic"
              :src="val.url"
              :width="val.width / 7.5 + '%'"
              :style="{
                position: 'absolute',
                left: val.left / 7.5 + '%',
                top: val.top / height * 100 + '%',
                zIndex: val.z
              }">
          </template>

          <!-- 文本 -->
          <div v-for="(val, i) in text"
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
          <div v-for="(val, i) in container"
            :data-name="val.name"
            :style="{
              position: 'absolute',
              width: val.width / 7.5 + '%',
              height: val.height / height * 100 + '%',
              left: val.left / 7.5 + '%',
              top: val.top / height * 100 + '%',
              zIndex: val.z
            }">
          </div>
        </div>
      </div>
    </div>

    <!-- 用于复制代码 -->
    <textarea type="text" id="copy" style="height: 0; width: 0"></textarea>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        height: 0,
        hoverPic: [],
        image: [],
        text: [],
        container: [],
        code: ''
      }
    },
    mounted () {
      document.addEventListener('keyup', (e) => {
        if (e.ctrlKey && e.keyCode === 67) {
          this.generate();
        }
      })
    },
    methods: {
      generate () {
        var page = this.$store.state.h5.page;
        var title = page.title;
        this.height = page.height;
        this.hoverPic = this.$store.getters.hoverPic;
        this.image = this.$store.state.h5.image;
        this.text = this.$store.state.h5.text;
        this.container = this.$store.state.h5.container;

        var head = 
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

  [data-hover="true"]:hover {
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
</style>
<body>
`

        var foot = 
`
<script>
  // 统计代码

\<\/script\>
</body>
</html>`

        setTimeout(() => {
          var body = document.getElementById('generator').innerHTML;
          body = this.formatCode(body);

          document.getElementById('copy').value = head + body + foot;
          document.getElementById('copy').select();

          try {
            if (document.execCommand('copy')) {
              this.$emit('notify', {
                info: 'Copied !',
                type: true
              })
            } else {
              throw new Error('failed')
            }
          } catch (e) {
            alert(e)
          }
        }, 0)
      },

      formatCode (str) {
        var arr = str.split('>');
        for (var i = 0, len = arr.length - 1; i < len; i++) {
          arr[i] += '>\n';
        }

        return arr.join('')
      }
    }
  }
</script>