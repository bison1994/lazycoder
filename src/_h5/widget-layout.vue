<template>
	<div>
		<img v-for="(val, i) in image"
	    data-type="image"
	    data-draggable="true"
	    :data-index="i"
	    :data-hover="!!val.hoverPic"
	    :src="val.url"
	    :width="val.width / 7.5 + '%'"
	    :style="{
	      position: 'absolute',
	      left: val.left / 7.5 + '%',
	      top: val.top / height * 100 + '%',
	      zIndex: val.z
	    }">
	</div>
</template>

<script>
	export default {
		props: ['height'],
		computed: {
			// 图片
      image () {
        return this.$store.state.h5.image
      }
		}
	}
</script>