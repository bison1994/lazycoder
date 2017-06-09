<template>
  <div>
    <div v-for="(val, i) in container"
      :class="{'container-active': type == 'container' && index == i}"
      :style="{
        position: 'absolute',
        width: val.width / 7.5 + '%',
        height: val.height / height * 100 + '%',
        left: val.left / 7.5 + '%',
        top: val.top / height * 100 + '%',
        zIndex: val.z
      }">

      <!-- 移动控件 -->
		  <div class="move-bar"
		    data-type="container"
		    data-draggable="true"
		    :data-index="i">
		  </div>
      
      <!-- 容器包含的元件 -->
      <div flex
        class="wrap"
        data-type="container"
        :data-index="i"
        :style="{
          flexDirection: val.dir,
          justifyContent: val.justify,
          alignItems: val.align
        }">
				
				<!-- 图片 -->
        <images v-for="(img, i) in image"
          :key="i"
          :val="img"
          :i="i"
          :type="type" 
          :index="index" 
          :height="val.height" 
          :width="val.width" 
          :belong="val.name">
        </images>

        <!-- 文本 -->
        <texts v-for="(txt, i) in text"
          :key="i"
          :val="txt"
          :i="i"
          :type="type" 
          :index="index" 
          :height="val.height" 
          :width="val.width" 
          :belong="val.name"
          @resize="handleResize">
        </texts>
      </div>

      <!-- 尺寸调节控件 -->
      <div data-type="container" 
        :data-index="i" 
        class="size-control"
        @mousedown="handleResize">
      </div>
    </div>
  </div>
</template>

<script>
	import image from './widget-image'
  import text from './widget-text'

  export default {
    props: ['height', 'type', 'index'],
    components: {
    	images: image,
    	texts: text
    },
    methods: {
      // 调整大小
      handleResize (e) {
        this.$emit('resize', e)
      }
    },
    computed: {
      // 容器
      container () {
        return this.$store.state.h5.container
      },
      // 文本
      text () {
        return this.$store.state.h5.text
      },
      // 图片
      image () {
        return this.$store.state.h5.image
      }
    }
  }
</script>

<style scoped>
  .wrap {
    width: 100%;
    height: 100%;
  }
</style>

<!-- 容器公共样式 -->
<style>
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
</style>