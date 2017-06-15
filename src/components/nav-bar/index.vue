<template>
  <div class="nav" flex>
    <!-- logo -->
    <div class="logo"></div>
    
    <!-- 菜单栏 -->
    <ul>
      <li @click="copy" title="获取代码">
        <i class="material-icons">code</i>
      </li>
    </ul>
  
    <div class="side">
      <ul v-show="activeElement.type">
        <li title="复制元件 Ctrl + C" @click="copyWidget">
          <i class="material-icons f18">note_add</i>
        </li>
        <li title="删除元件 Delete" @click="dele">
          <i class="material-icons f20">delete_forever</i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    mounted () {
      // Ctrl + C 复制元件
      document.addEventListener('keyup', (e) => {
        e.stopPropagation();
        if (e.ctrlKey && e.keyCode === 67) {
          this.$store.commit('copy')
        }
      }, true);

      // Delete 删除选中元件
      document.addEventListener('keyup', (e) => {
        e.stopPropagation();
        if (e.keyCode === 46) {
          this.$store.commit('delete')
        }
      }, true);

    },
    methods: {
      // 生成并复制代码
      copy () {
        $communicator.$emit('copy');
      },

      // 复制元件
      copyWidget () {
        this.$store.commit('copy')
      },

      // 删除元件
      dele () {
        this.$store.commit('delete')
      }
    },
    computed: {
      // 选中元素对象
      activeElement () {
        return this.$store.state.h5.activeElement
      }
    }
  }
</script>

<style scoped>
  .logo {
    width: 50px;
    height: 50px;
    background: url(../../assets/sleepycat.png) no-repeat center/100%;
  }
  .nav {
    height: 50px;
    justify-content: space-between;
  }
  .side {
    width: 360px;
    height: 50px;
  }
  li {
    display: inline-block;
    width: 50px;
    height: 50px;
    text-align: center;
    cursor: pointer;
    line-height: 50px;
  }
  i {
    color: #eee;
    line-height: inherit;
    vertical-align: middle;
  }
  .pt12 {
    padding-top: 12px;
  }
  .pt14 {
    padding-top: 14px;
  }
  .f16 {
    font-size: 16px;
  }
  .f18 {
    font-size: 18px;
  }
  .f20 {
    font-size: 20px;
  }
</style>