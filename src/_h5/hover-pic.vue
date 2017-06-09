<template>
	<div>
		<img v-for="val in hoverPic"
      :src="val.hoverPic"
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
      // hover 图片
      hoverPic () {
        return this.$store.getters.hoverPic
      }
		}
	}
</script>