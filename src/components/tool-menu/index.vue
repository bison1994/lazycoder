<template>
	<ul class="menu-bar" @mousedown="updateSrollTop">
    <li class="menu-item" @click="addImage">
      <i class="material-icons">wallpaper</i>
      <p class="menu-caption">图片</p>
    </li>
    <li class="menu-item" @click="addText">
      <i class="material-icons">translate</i>
      <p class="menu-caption">文本</p>
    </li>
    <li class="menu-item" @click="addContainer">
      <i class="material-icons">inbox</i>
      <p class="menu-caption">容器</p>
    </li>
    <li class="menu-item">
      <i class="material-icons">face</i>
      <p class="menu-caption">注册</p>
    </li>
    <li class="menu-item">
      <i class="material-icons">share</i>
      <p class="menu-caption">分享</p>
    </li>
  </ul>
</template>

<script>
	export default {
    props: ['zoom'],
    data () {
      return {
        scrollTop: 0
      }
    },
		methods: {
			//添加图片
      addImage () {
        $communicator.$emit('upload', 0, this.scrollTop)
      },

			// 添加文本
      addText () {
        this.$store.commit('addText', {
          top: this.scrollTop
        });

        // 设置选中
        this.$store.commit('select', {
          type: 'text',
          index: this.$store.state.h5.text.length - 1
        });
      },

      // 添加容器
      addContainer () {
        this.$store.commit('addContainer', {
          top: this.scrollTop
        });

        // 设置选中
        this.$store.commit('select', {
          type: 'container',
          index: this.$store.state.h5.container.length - 1
        });
      },

      // 为确保添加的元件出现在可视区内，获取画布向上滚动距离作为元件初始 top 值
      updateSrollTop () {
        this.scrollTop = document.getElementById('viewport').scrollTop / this.zoom * 100
      }
		}
	}
</script>

<style scoped>
	.menu-bar {
    width: 50px;
    height: 100%;
    border-right: 1px solid #eee;
    color: #555;
    padding-top: 20px;
  }
  .menu-item {
    display: inline-block;
    text-align: center;
    width: 50px;
    height: 50px;
    cursor: pointer;
    padding-top: 13px;
    transition: all .2s;
    position: relative;
  }
  .menu-caption {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    width: 100%;
    opacity: 0;
    transition: all .2s;
  }
  .menu-item:hover {
    padding-top: 5px;
  }
  .menu-item:hover i {
    font-size: 20px;
  }
  .menu-item:hover p {
    opacity: 1;
  }
</style>