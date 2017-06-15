<template>
  <img data-type="image"
    :data-draggable="val.belong === 'page'"
    :data-index="val.index"
    :data-hover="!!val.hoverPic"
    :src="val.url"
    :width="val.width / width * 100 + '%'"
    :style="{
      position: val.belong === 'page' ? 'absolute' : 'static',
      left: val.left / width * 100 + '%',
      top:  val.top / height * 100 + '%',
      zIndex: val.z
    }">
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