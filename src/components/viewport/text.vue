<template>
	<div :class="{'container-active': type == 'text' && index == val.index}"
	  :style="{
	    position: val.belong === 'page' ? 'absolute' : 'relative',
	    left: val.belong === 'page' ? val.left / width * 100 + '%' : '0',
	    top: val.belong === 'page' ? val.top / height * 100 + '%' : '0',
	    width: val.width / width * 100 + '%',
	    height: val.height / height * 100 + '%',
	    zIndex: val.z,
	    lineHeight: val.lineHeight
	  }">

	  <!-- 内容编辑区 -->
	  <div :id="'text' + val.index"
	    class="text-edit-area"
	    contenteditable="true"
	    data-type="text"
	    :data-index="val.index"
	    v-html="val.text"
	    @mouseup.stop="syncFontParam"
	    @blur="updateText(val.index)">
	  </div>

	  <!-- 移动控件 -->
	  <div v-if="val.belong === 'page'"
	  　class="move-bar" 
	    data-type="text"
	    data-draggable="true"
	    :data-index="val.index">
	  </div>

	  <!-- 尺寸调节控件 -->
	  <div data-type="text" 
	    :data-index="val.index" 
	    class="size-control"
	    @mousedown="handleResize">
	  </div>
	</div>
</template>

<script>
	export default {
		// 属性含义参照 widget-image.vue
		props: ['val', 'height', 'width', 'type', 'index'],
		methods: {
			// 调整大小
			handleResize (e) {
				e.stopPropagation();
				this.$emit('resize', e)
			},

      // 更新文本
      updateText (index) {
        var id = 'text' + index;
        var text = document.getElementById(id).innerHTML;
        this.$store.commit('updateText', {
          index: index,
          text: text
        })
      },

			// 文本元件编辑状态下，点击文本时，同步字体参数
      syncFontParam (e) {
        var sele = document.getSelection();
        var bold = false;

        if (sele.toString()) {
          var node = sele.anchorNode.nodeName;
          var pnode = sele.anchorNode.parentNode.nodeName;

          if (node === 'B' || pnode === 'B') {
            bold = true;
          }
        }

        $communicator.$emit('syncFont', bold)
      }
		}
	}
</script>

<style>
	.text-edit-area {
    width: 100%;
    height: 100%;
    outline: none;
    font-size: 28px;
  }
  .text-edit-area:focus {
  	outline: 1px solid var(--sub); 
  }
  .text-edit-area:focus ~ div {
    display: block;
  }
</style>