<template>
  <div class="holder" id="viewport">
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

      <!-- 参考线 -->
      <guides :moving="moving"></guides>
    </div>
  </div>
</template>
<script>
  import hover from './hover-pic'
  import pic from './image'
  import txt from './text'
  import container from './container'
  import guides from './guides'

  export default {
    components: {
      hover: hover,              // hover 图片
      pic: pic,                  // 图片元件
      txt: txt,                  // 文本元件
      container: container,      // 容器元件
      guides: guides             // 参考线
    },
    props: ['zoom'],
    data () {
      return {
        originX: 0,              // 选中元件的横向初始值
        originY: 0,              // 选中元件的纵向初始值
        startX: 0,               // 鼠标摁下时的横坐标
        startY: 0,               // 鼠标摁下时的纵坐标
        moving: false,           // 是否正在移动元件（参考线仅在移动元件时显示）
        moveType: 'move'         // move - 移动元件 | resize - 调节尺寸
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

      // 替换图片
      replaceImage () {
        if (this.type === 'image') {
          $communicator.$emit('upload', 1)
        }
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
  .screen {
    width: 750px;
    background-image:
      linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0),
      linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0);
    background-position: 0 0, 15px 15px;
    background-size: 30px 30px;
    margin: 25px auto;
    transform-origin: center top;
    position: relative;
  }
  .holder {
    height: 100%;
    overflow: auto;
  }
</style>