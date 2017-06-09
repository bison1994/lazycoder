<template>
  <div>
    <ul class="tabs" flex>
      <router-link to="/h5/style" tag="li" class="tab">样式</router-link>
      <router-link to="/h5/event" tag="li" class="tab">交互</router-link>
      <router-link to="/h5/animate" tag="li" class="tab">动画</router-link>
      <router-link to="/h5/widget" tag="li" class="tab">元件</router-link>
    </ul>

    <router-view></router-view>
  </div>
</template>

<style scoped>
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
  .tab.router-link-active {
    border-bottom: 2px solid var(--main);
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
