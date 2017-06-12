<template>
	<div class="panel-wrap">
		<div class="panel-row" flex>
			<i class="material-icons">bookmark_border</i>
			<div class="panel-label">动画名称</div>
			<div class="panel-value">
				<select>
					<option>无</option>
					<option></option>
				</select>
			</div>
		</div>

		<div class="panel-row" flex>
			<i class="material-icons">alarm</i>
			<div class="panel-label">动画时长</div>
			<div class="panel-value">
				<div class="panel-slider-wrap">
	        <slider :max="20" />
	      </div>
			</div>
		</div>

		<div class="panel-row" flex>
			<i class="material-icons">hourglass_empty</i>
			<div class="panel-label">动画延迟</div>
			<div class="panel-value">
				<select>
					<option>无</option>
					<option></option>
				</select>
			</div>
		</div>

		<div class="panel-row" flex>
			<i class="material-icons">cached</i>
			<div class="panel-label">动画循环</div>
			<div class="panel-value">
				<select>
					<option>无</option>
					<option></option>
				</select>
			</div>
		</div>
	</div>
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