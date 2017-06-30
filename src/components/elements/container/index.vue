<template>
  <div flex
    data-type="container"
    :data-index="i"
    :class="[{'g-active': 'container' + i === id}, playState ? 'anm-' + val.animationName : '']"
    :style="{
      position: 'absolute',
      width: val.width / 7.5 + '%',
      height: val.height / height * 100 + '%',
      left: val.left / 7.5 + '%',
      top: val.top / height * 100 + '%',
      zIndex: val.z,
      backgroundColor: val.bgColor,
      borderStyle: 'solid',
      borderRadius: val.radius + 'px',
      borderColor: val.borderColor,
      borderWidth: val.borderWidth + 'px',
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
			
			<!-- 图片 -->
      <pic :val="img"
        :height="img.height" 
        :width="img.width">
      </pic>
    </div>

    <!-- 文本 -->
    <txt v-for="(txt, index) in text"
      :key="index"
      :id="id"
      :val="txt"
      :height="val.height" 
      :width="val.width">
    </txt>
  </div>
</template>

<script>
  import pic from '@/components/elements/pic'
  import txt from '@/components/elements/txt'

  export default {
    props: ['height', 'val', 'i', 'id', 'playState'],
    
    components: {
    	pic: pic,
    	txt: txt
    },
    
    computed: {
      // 文本
      text () {
        return this.$store.getters.text.filter(item => item.belong === this.val.name)
      },
      // 图片
      image () {
        return this.$store.getters.image.filter(item => item.belong === this.val.name)
      }
    }
  }
</script>