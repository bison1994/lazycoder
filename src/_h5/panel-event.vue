<template>
	<div class="panel-wrap">
		<div class="panel-row" flex>
			<i class="material-icons">touch_app</i>
			<div class="panel-label">点击时</div>
		</div>

		<div class="panel-row" flex v-if="activeElement.href !== undefined">
      <div class="panel-label">链接至</div>
      <div class="cell">
      	<input type="text" v-model="activeElement.href" placeholder="绝对路径，以https://开头">
      </div>
		</div>

		<div class="panel-row" flex v-if="activeElement.href !== undefined">
      <div class="panel-label">跳转至</div>
      <div class="cell">
      	<select>
      		<option>无</option>
      		<option>投资列表</option>
      		<option>首投抽奖</option>
      		<option>邀请好友</option>
      	</select>
      </div>
		</div>

		<!-- 图片的交互 -->
		<div class="panel-row" flex v-if="activeElement.hoverPic !== undefined">
      <div class="panel-label">hover 图片</div>
      <div class="cell">
      	<div class="preview"
      		@click="addPic"
      		:style="{
	      		backgroundImage: 'url(' + activeElement.hoverPic + ')'
	      	}">
	      	<i class="material-icons" v-show="!activeElement.hoverPic">add</i>
	      </div>
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
	  },
	  methods: {
	  	addPic () {
	  		$communicator.$emit('upload', 2)
	  	}
	  }
	}
</script>

<style scoped>
	.cell {
		flex-grow: 1;
		padding-left: 20px;
	}
	.preview {
		width: 50px;
		height: 32px;
		background: no-repeat center/100%;
		cursor: pointer;
	}
  select {
    height: 100%;
  }
</style>