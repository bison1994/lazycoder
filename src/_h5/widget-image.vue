<template>
	<img v-if="val.belong === belong"
    data-type="image"
    :data-draggable="val.belong === 'page'"
    :data-index="i"
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
			'i', 					// 图片对象在数组中的索引
			'width', 			// 包含块的宽
			'height', 		// 包含块的高
			'belong'			// 从属于谁，要么属于页面，要么属于某个容器
		]
	}
</script>