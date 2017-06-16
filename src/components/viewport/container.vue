<template>
  <div :class="{'container-active': type == 'container' && index == i}"
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
    <div flex data-type="container"
      :data-index="i"
      :style="{
        width: '100%',
        height: '100%',
        flexDirection: val.dir,
        justifyContent: val.justify,
        alignItems: val.align
      }">

      <!-- 图片 -->
      <div v-for="img in image"
        :style="{
          width: img.width / val.width * 100 + '%',
          height: img.height / val.height * 100 + '%',
          position: 'relative'
        }">
        <!-- hover 图片 -->
        <hover :val="img"
          :height="img.height" 
          :width="img.width">
        </hover>
  			
  			<!-- 图片 -->
        <pic :val="img"
          :height="img.height" 
          :width="img.width">
        </pic>
      </div>

      <!-- 文本 -->
      <txt v-for="(txt, i) in text"
        :key="i"
        :val="txt"
        :type="type" 
        :index="index" 
        :height="val.height" 
        :width="val.width"
        @resize="handleResize">
      </txt>
    </div>

    <!-- 尺寸调节控件 -->
    <div data-type="container" 
      :data-index="i" 
      class="size-control"
      @mousedown="handleResize">
    </div>
  </div>
</template>

<script>
	import pic from './image'
  import txt from './text'
  import hover from './hover-pic'

  export default {
    props: ['height', 'type', 'index', 'val', 'i'],
    components: {
    	pic: pic,
    	txt: txt,
      hover: hover
    },
    methods: {
      // 调整大小
      handleResize (e) {
        this.$emit('resize', e)
      }
    },
    computed: {
      // 文本
      text () {
        return this.$store.getters.text.filter(item => item.belong === this.val.name)
      },
      // 图片
      image () {
        return this.$store.getters.image.filter(item => item.belong === this.val.name)
      },
      // hover 图片
      hoverPic () {
        return this.image.filter(item => item.hoverPic)
      }
    }
  }
</script>