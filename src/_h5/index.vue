<template>
  <div class="holder">
    <!-- 整体布局 -->
    <div flex class="container">
      <!-- 顶栏 -->
      <div class="navbar">
        <nav-bar @copy="copy"></nav-bar>
      </div>

      <!-- 中腰 -->
      <div flex class="body">
        <div flex class="body-inner">
          <!-- 左侧元件菜单 -->
          <ul class="menu-bar" @mousedown="updateSrollTop">
            <li class="menu-item" @click="addImage">
              <i class="material-icons">wallpaper</i>
              <p class="menu-caption">图片</p>
            </li>
            <li class="menu-item" @click="addText">
              <i class="material-icons">translate</i>
              <p class="menu-caption">文本</p>
            </li>
            <li class="menu-item" @click="addContainer">
              <i class="material-icons">inbox</i>
              <p class="menu-caption">容器</p>
            </li>
            <!-- <li class="menu-item">
              <i class="material-icons">web</i>
              <p class="menu-caption">布局</p>
            </li> -->
          </ul>

          <!-- 中央编辑区 -->
          <div class="viewport">
            <div class="viewport-inner" id="viewport">
              <!-- 画布 -->
              <div class="screen"  
                :style="{height: height + 'px', transform: 'scale(' + zoom / 100 + ')'}"
                @dblclick="replaceImage">

                <!-- 元件的自定义属性 -->
                <!-- data-type 元件类型 image | text | container | 组件名称 -->
                <!-- data-index 元件编号，根据数组顺序自动生成 -->
                <!-- data-draggle 元件可否拖动，{ Boolean } -->
                <!-- 同时具备 data-type 和 data-index 表示元件可被选中 -->
                <!-- 同时具备以上三个属性的元件可由鼠标直接拖动 -->
                
                <!-- hover 图片 -->
                <hover :height="height"></hover>

                <!-- 图片 -->
                <pic v-for="(val, i) in image"
                  :key="i"
                  :val="val"
                  :height="height" 
                  :width="750" 
                  :type="type" 
                  :index="index" 
                  :belong="'page'">
                </pic>

                <!-- 文本 -->
                <txt v-for="(val, i) in text"
                  :key="i"
                  :val="val"
                  :height="height" 
                  :width="750" 
                  :type="type" 
                  :index="index" 
                  :belong="'page'"
                  @resize="handleResize">
                </txt>

                <!-- 容器 -->
                <container v-for="(val, i) in container"
                  :key="i"
                  :val="val"
                  :i="i"
                  :height="height" 
                  :type="type" 
                  :index="index" 
                  @resize="handleResize">
                </container>

                <!-- 布局 -->

                <!-- 参考线 -->
                <guides :moving="moving"></guides>
              </div>
            </div>

            <!-- 页面缩放 -->
            <div class="zoom-wrap">
              <slider v-model="zoom" :step="1" />
              <div class="zoom-value">{{ zoom }}%</div>
            </div>
          </div>

          <!-- 右侧参数面板 -->
          <div class="control-panel">
            <panel></panel>
          </div>
        </div>
      </div>

      <!-- 底栏 -->
      <div class="bottom-zone" :style="{height: panelHeight + 'px'}">
        <!-- 伸缩控件 -->
        <!-- <div class="stretch-controller" @mousedown.stop="handlePanelResize"></div> -->
        <!-- 动画组件 -->
        <animation></animation>
      </div>
    </div>
    
    <!-- 上传图片组件 -->
    <uploader :top="scrollTop"></uploader>

    <!-- 提示信息组件 -->
    <toast ref="toast"></toast>

    <!-- 代码生成组件 -->
    <generator ref="generator" @notify="notify"></generator>
  </div>
</template>
<script>
  import guides from './guides'
  import uploader from './uploader'
  import panel from './panel'
  import navbar from './nav-bar'
  import toast from '../widgets/toast'
  import generator from './generator'
  import animation from './animation'

  import hover from './hover-pic'
  import pic from './widget-image'
  import txt from './widget-text'
  import container from './widget-container'

  export default {
    components: {
      guides,               // 参考线
      uploader,             // 上传图片
      panel,                // 元件参数面板
      'nav-bar': navbar,    // 顶部导航
      toast,                // 提示框
      generator,            // 复制-生成代码
      animation,            // 动画面板
      hover,                // hover 图片
      pic,                // 图片元件
      txt,                  // 文本元件
      container             // 容器元件
    },
    data () {
      return {
        zoom: 64,           // 画布缩放
        originX: 0,         // 选中元件的横向初始值
        originY: 0,         // 选中元件的纵向初始值
        startX: 0,          // 鼠标摁下时的横坐标
        startY: 0,          // 鼠标摁下时的纵坐标
        moving: false,      // 是否正在移动元件（参考线仅在移动元件时显示）
        moveType: 'move',   // move - 移动元件 | resize - 调节尺寸
        scrollTop: '',      // 画布向上滚动的距离
        panelHeight: 0      // 动画面板高度
      }
    },
    mounted () {
      // 处理选中、移动元件的操作
      // 注册在捕获阶段，尽早执行元件选中操作
      document.getElementById('viewport').addEventListener('mousedown', this.handleSelection, true)

      document.addEventListener('click', () => {
        document.removeEventListener('mousemove', this.handlemousemove, true);
        this.moving = false;
      }, false);

      // delete 键删除选中元素
      document.addEventListener('keyup', (e) => {
        e.stopPropagation();
        if (e.keyCode === 46) {
          this.$store.commit('delete')
        }
      }, false);

      // 初始化选中元件（将页面作为初始选中元件）
      this.$store.commit('initActive')
    },
    methods: {
      /**
       * 用于所有与 mousemove 相关的操作
       * @return dx - 鼠标横向移动距离 | dy - 鼠标纵向移动距离
       */
      handlemousemove (e) {
        e.stopPropagation();
        e.preventDefault();

        var _this = this;
        var dx = e.pageX - this.startX;
        var dy = e.pageY - this.startY;

        _this[this.moveType](dx, dy);
      },

      // 选中元件与取消选中，触发事件：mousedown
      handleSelection (e) {
        var target = e.target;
        var type = target.getAttribute('data-type');
        var node = target.nodeName;

        // 文本元件编辑状态下点中编辑框子元素时
        if (node === 'FONT' || node === 'B' || node === 'SPAN' || target.parentNode.id.indexOf('text') === 0) return;

        if (type) {
          var index = target.getAttribute('data-index');
          var draggable = target.getAttribute('data-draggable');

          // 设置选中元素
          if (!(type == this.type && index == this.index)) {
            this.$store.commit('select', {
              type: type,
              index: index
            });
          }

          if (draggable) {
            // 设置移动状态初始值
            var src = this.$store.state.h5.activeElement;
            this.originX = src.left;
            this.originY = src.top;
            this.startX = e.pageX;
            this.startY = e.pageY;
            this.moving = true;
            this.moveType = 'move';

            // 绑定鼠标移动事件
            document.addEventListener('mousemove', this.handlemousemove, true)
          }
        } else {
          // 取消选中元素
          this.$store.commit('select', {
            type: '',
            index: 0
          })
        }
      },

      // 移动元件
      move (dx, dy) {
        var left = this.originX + Math.floor(dx * 100 / this.zoom);
        var top = this.originY + Math.floor(dy * 100 / this.zoom);

        this.$store.commit('move', {
          dx: left,
          dy: top
        })
      },

      // 元件尺寸调节控件，触发事件：mousedown
      handleResize (e) {
        var src = this.$store.state.h5.activeElement;

        // 设置移动状态初始值
        this.startX = e.pageX;
        this.startY = e.pageY;
        this.originX = src.width;
        this.originY = src.height;
        this.moveType = 'resize';

        // 绑定鼠标移动事件
        document.addEventListener('mousemove', this.handlemousemove, true)
      },

      // 调节元件尺寸
      resize (dx, dy) {
        var width = this.originX + Math.floor(dx * 100 / this.zoom);
        var height = this.originY + Math.floor(dy * 100 / this.zoom);

        this.$store.commit('resize', {
          dx: width,
          dy: height
        })
      },

      // 动画面板尺寸调节，触发事件：mousedown
      handlePanelResize (e) {
        e.stopPropagation();

        // 设置移动状态初始值
        this.startX = e.pageX;
        this.startY = e.pageY;
        this.originY = this.panelHeight;
        this.moveType = 'stretch';

        // 绑定鼠标移动事件
        document.addEventListener('mousemove', this.handlemousemove, true)
      },

      // 拉伸动画面板
      stretch (dx, dy) {
        var y = this.originY - dy;
        y = y > 500 ? 500 : y < 100 ? 100 : y;
        this.panelHeight = y;
      },

      //添加图片
      addImage () {
        $communicator.$emit('upload')
      },

      // 替换图片
      replaceImage () {
        if (this.type === 'image') {
          $communicator.$emit('upload', 1)
        }
      },

      // 添加文本
      addText () {
        this.$store.commit('addText', {
          top: this.scrollTop
        });

        // 设置选中
        this.$store.commit('select', {
          type: 'text',
          index: this.$store.state.h5.text.length - 1
        });
      },

      // 添加容器
      addContainer () {
        this.$store.commit('addContainer', {
          top: this.scrollTop
        });

        // 设置选中
        this.$store.commit('select', {
          type: 'container',
          index: this.$store.state.h5.container.length - 1
        });
      },

      /**
       * 提示信息
       * option.info { String } 内容
       * option.type { Boolean } 成功/失败
       */
      notify (option) {
        this.$refs.toast.notify(option.info, option.type)
      },

      // 为确保添加的元件出现在可视区内，获取画布向上滚动距离作为元件初始 top 值
      updateSrollTop () {
        this.scrollTop = document.getElementById('viewport').scrollTop / this.zoom * 100
      },

      // 生成并复制代码到剪贴板
      copy () {
        this.$refs.generator.generate()
      }
    },
    computed: {
      // 画布高度
      height () {
        return this.$store.state.h5.page.height
      },

      // 选中元素类型
      type () {
        return this.$store.state.h5.type
      },

      // 选中元素索引
      index () {
        return this.$store.state.h5.index
      },

      // 文本
      text () {
        return this.$store.getters.text.filter(val => val.belong === 'page')
      },

      // 图片
      image () {
        return this.$store.getters.image.filter(val => val.belong === 'page')
      },

      // 容器
      container () {
        return this.$store.state.h5.container
      }
    }
  }
</script>

<style scoped>
  .holder {
    height: 100%;
  }
  .container {
    width: 100%;
    height: 100%;
    flex-direction: column;
  }
  .navbar {
    height: 50px;
    flex-shrink: 0;
    background-color: var(--main);
    padding-left: 10px;
  }
  .body {
    flex-grow: 1;
  }
  .bottom-zone {
    height: 150px;
    flex-shrink: 0;
    border-top: 1px solid #f5f5f5;
    position: relative;
  }
  .stretch-controller {
    width: 100%;
    height: 3px;
    position: absolute;
    left: 0;
    top: -3px;
    background-color: var(--sub);
    cursor: n-resize;
  }
  .body-inner {
    width: 100%;
  }
  .menu-bar {
    width: 50px;
    height: 100%;
    border-right: 1px solid #eee;
    color: #555;
    padding-top: 20px;
  }
  .menu-item {
    display: inline-block;
    text-align: center;
    width: 50px;
    height: 50px;
    cursor: pointer;
    padding-top: 13px;
    transition: all .2s;
    position: relative;
  }
  .menu-caption {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    width: 100%;
    opacity: 0;
    transition: all .2s;
  }
  .menu-item:hover {
    padding-top: 5px;
  }
  .menu-item:hover i {
    font-size: 20px;
  }
  .menu-item:hover p {
    opacity: 1;
  }
  .viewport {
    height: 100%;
    flex-grow: 1;
    position: relative;
    overflow: hidden;
  }
  .viewport-inner {
    height: 100%;
    overflow: auto;
    padding: 25px 0;
  }
  .control-panel {
    width: 360px;
    height: 100%;
    border-left: 1px solid #f5f5f5;
  }
  .screen {
    width: 750px;
    background-image:
      linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0),
      linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0);
    background-position: 0 0, 15px 15px;
    background-size: 30px 30px;
    margin: 0 auto;
    transform-origin: center top;
    position: relative;
  }
  .zoom-wrap {
    width: 200px;
    height: 30px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    opacity: 0;
    transition: opacity .3s;
  }
  .viewport:hover .zoom-wrap{
    opacity: 1;
  }
  .zoom-value {
    position: absolute;
    top: 2px;
    left: -36px;
  }
</style>