<template>
  <div class="control-panel">
    <ul class="tabs" flex>
      <li class="tab" :class="{active: activeTab === 1}" @click="activeTab = 1">样式</li>
      <li class="tab" :class="{active: activeTab === 2}" @click="activeTab = 2">交互</li>
      <li class="tab" :class="{active: activeTab === 3}" @click="activeTab = 3">动画</li>
      <li class="tab" :class="{active: activeTab === 4}" @click="activeTab = 4">元件</li>
    </ul>
  
    <page :activeElement="activeElement" :tab="activeTab"></page>
    <appearance :activeElement="activeElement" :tab="activeTab"></appearance>
    <event :activeElement="activeElement" :tab="activeTab"></event>
    <animation :activeElement="activeElement" :tab="activeTab"></animation>
    <widget :activeElement="activeElement" :tab="activeTab"></widget>
  </div>
</template>

<script>
  import page from './page'
  import style from './style'
  import event from './event'
  import animation from './animation'
  import widget from './widget'

  export default {
    components: {
      page: page,
      appearance: style,
      event: event,
      animation: animation,
      widget: widget
    },
    data () {
      return {
        activeTab: 1
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
  .control-panel {
    width: 360px;
    height: 100%;
    border-left: 1px solid #f5f5f5;
  }
  .tabs {
    border-bottom: 1px solid #f5f5f5;
  }
  .tab {
    width: 25%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
  }
  .active {
    border-bottom: 2px solid var(--main)
  }
</style>

<!-- 面板区域公共样式 -->
<style>
  .panel-wrap {
    padding: 15px 20px;
  }
  .panel-row {
    margin-bottom: 10px;
    font-size: 13px;
    line-height: 32px;
  }
  .panel-row i {
    font-size: 16px;
    line-height: inherit;
  }
  .panel-label {
    display: inline-block;
    width: 80px;
    height: 32px;
    padding-left: 6px;
    color: #999;
  }
  .panel-value {
    width: 80px;
  }
  .panel-slider-wrap {
    flex-grow: 1;
    padding-top: 3px;
    opacity: 0;
    transition: opacity .3s;
  }
  .panel-row:hover .panel-slider-wrap{
    opacity: 1;
  }
  .panel-wrap label {
    color: #ccc;
    padding-right: 12px;
    margin-left: -4px;
    font-size: 12px;
    line-height: inherit;
  }
  .panel-wrap input:checked + label {
    color: #333;
  }
  .panel-wrap input[type="radio"] {
    width: 0;
  }
  .panel-select {
    width: 100%;
    height: 32px;
    border: 1px solid #ccc;
  }
  hr {
    margin: 20px 0;
    border: none;
    border-top: 1px solid #f5f5f5;
  }
</style>
