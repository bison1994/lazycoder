<template>
	<img v-if="val.hoverPic"
    :src="val.hoverPic"
    :width="val.width / width * 100 + '%'"
    :height="val.height / height * 100 + '%'"
    :style="{
      position: 'absolute',
      left: val.belong === 'page' ? val.left / width * 100 + '%' : '0',
      top:  val.belong === 'page' ? val.top / height * 100 + '%' : '0',
      zIndex: val.z
    }">
</template>

<script>
	export default {
		props: [
      'val',        // 图片对象
      'width',      // 包含块的宽
      'height'      // 包含块的高
    ]
	}
</script>