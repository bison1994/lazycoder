<template>
  <div
    :style="{
      position: val.belong === 'page' ? 'absolute' : 'relative',
      display: 'inline-block',
      width: val.width / width * 100 + '%',
      left: val.belong === 'page' ? val.left / width * 100 + '%' : '0',
      top:  val.belong === 'page' ? val.top / height * 100 + '%' : '0',  
    }">
    <!-- hover 图 -->
    <img 
      v-if="val.hoverPic"
      width="100%"
      :src="val.hoverPic"
      :style="{
        position: 'absolute',
        left: '0',
        top: '0',
        zIndex: val.z
      }">
    <img 
      width="100%"
      data-type="image"
      :data-index="val.index"
      :data-hover="!!val.hoverPic"
      :src="val.url"
      :style="{
        position: 'absolute',
        left: '0',
        top: '0',
        zIndex: val.z
      }">
  </div>
</template>

<script>
	export default {
		props: [
			'val', 				// 图片对象
			'width', 			// 包含块的宽
			'height'  		// 包含块的高
		]
	}
</script>