<template>
  <div class="app">
    <!-- 整体布局 -->
    <div flex class="container">
      <!-- 顶栏 -->
      <div class="navbar">
        <navbar @copy="copy"></navbar>
      </div>

      <!-- 中腰 -->
      <div flex class="body">
        <div flex class="body-inner">
          <!-- 左侧元件菜单 -->
          <toolbar :zoom="zoom"></toolbar>

          <!-- 中央编辑区 -->
          <div class="viewport">
            <!-- 画布 -->
            <viewport :zoom="zoom"></viewport>

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
    <uploader></uploader>

    <!-- 提示信息组件 -->
    <toast ref="toast"></toast>

    <!-- 代码生成组件 -->
    <generator @notify="notify"></generator>
  </div>
</template>

<script>
  import navbar from './components/nav-bar'
  import toolbar from './components/tool-menu'
  import panel from './components/panel'
  import viewport from './components/viewport'
  import animation from './components/animation'
  import toast from './components/toast'
  import uploader from './utility/uploader'
  import generator from './utility/generator'

  export default {
    components: {
      navbar:     navbar,           // 顶部导航栏
      toolbar:    toolbar,          // 左侧菜单栏
      panel:      panel,            // 右侧参数面板
      viewport:   viewport,         // 编辑视区
      animation:  animation,        // 底部动画面板
      toast:      toast,            // 提示框
      generator:  generator,        // 复制-生成代码
      uploader:   uploader          // 上传图片
    },
    data () {
      return {
        zoom: 64,                   // 画布缩放
        panelHeight: 0              // 动画面板高度
      }
    },
    mounted () {
      // 初始化选中元件（将页面作为初始选中元件）
      this.$store.commit('initActive')
    },
    methods: {
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

      /**
       * 全局方法：提示信息
       * option.info { String } 内容
       * option.type { Boolean } 成功/失败
       */
      notify (option) {
        this.$refs.toast.notify(option.info, option.type)
      },

      // 点击顶部导航栏“标签”图标，触发复制代码到剪贴板的
      copy () {
        this.$refs.generator.generate()
      }
    }
  }
</script>

<style scoped>
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
  .viewport {
    height: 100%;
    flex-grow: 1;
    position: relative;
    overflow: hidden;
  }
  .control-panel {
    width: 360px;
    height: 100%;
    border-left: 1px solid #f5f5f5;
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

<style>
  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(./assets/MaterialIcons-Regular.ttf) format('truetype');
  }
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    transition: all .2s;
    text-rendering: optimizeLegibility;
  }
  i {
    color: var(--main);
  }

  /* 全局变量 */
  :root {
    --main: #86A697;
    --main-light: rgba(134, 166, 151, .3);
    --sub: #B47157;
    --sub-light: rgba(180, 113, 87, .3);
  }

  [flex] {
    display: flex;
  }

  [rel] {
    position: relative;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: var(--main-light);
  }

  ::-webkit-input-placeholder {
    color: #ccc;
  }

  .container-active {
    outline: 1px solid var(--sub);
  }
  .container-active > .size-control,
  .container-active > .move-bar {
    display: block;
  }
  .size-control {
    position: absolute;
    width: 10px;
    height: 10px;
    bottom: -5px;
    right: -5px;
    border: 1px solid var(--sub);
    cursor: nwse-resize;
    display: none;
    background-color: #fff;
  }
  .move-bar {
    position: absolute;
    width: calc(100% + 2px);
    height: 6px;
    cursor: move;
    background-color: var(--sub);
    left: -1px;
    top: -6px;
    display: none;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html,
  body,
  .app {
    height: 100%;
    overflow: hidden;
  }
  html {
    font-size: 28px;
  }
  body {
    -webkit-font-smoothing: antialiased;
    text-size-adjust: 100%;
    font-size: 14px;
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
    border: none;
  }
  input {
    border:  none;
    outline: none;
    background-color: transparent;
  }
  input[type="color"] {
    cursor: pointer;
    vertical-align: middle;
  }
  input[type="checkbox"] {
    cursor: pointer;
    vertical-align: middle;
  }
  label {
    cursor: pointer;
  }
  select {
    appearance: none;
    outline: none;
    cursor: pointer;
    border: none;
  }
</style>
