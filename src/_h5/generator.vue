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
          <template v-for="val in image">
            <!-- 带超链接的图 -->
            <a v-if="val.href" 
              :href="val.href"
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
          this.getData();
          this.generate();
        }
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