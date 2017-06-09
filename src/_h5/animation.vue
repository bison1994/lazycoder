<template>
	<div>1</div>
</template>

<script>
	export default {
		computed: {
	    // 选中元素对象
	    activeElement () {
	      return this.$store.state.h5.activeElement
	    }
	  }
	}
</script>

<style scoped>
	
</style>