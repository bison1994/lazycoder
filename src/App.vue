<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(./assets/MaterialIcons-Regular.ttf) format('truetype');
  }
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    transition: all .2s;
    text-rendering: optimizeLegibility;
  }
  i {
    color: var(--main);
  }

  /* 全局变量 */
  :root {
    --main: #86A697;
    --main-light: rgba(134, 166, 151, .3);
    --sub: #B47157;
    --sub-light: rgba(180, 113, 87, .3);
  }

  [flex] {
    display: flex;
  }

  [rel] {
    position: relative;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: var(--main-light);
  }

  ::-webkit-input-placeholder {
    color: #ccc;
  }

  .container-active {
    outline: 1px solid var(--sub);
  }
  .container-active > .size-control,
  .container-active > .move-bar {
    display: block;
  }
  .size-control {
    position: absolute;
    width: 10px;
    height: 10px;
    bottom: -5px;
    right: -5px;
    border: 1px solid var(--sub);
    cursor: nwse-resize;
    display: none;
    background-color: #fff;
  }
  .move-bar {
    position: absolute;
    width: calc(100% + 2px);
    height: 6px;
    cursor: move;
    background-color: var(--sub);
    left: -1px;
    top: -6px;
    display: none;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html,
  body,
  .app {
    height: 100%;
    overflow: hidden;
  }
  html {
    font-size: 28px;
  }
  body {
    -webkit-font-smoothing: antialiased;
    text-size-adjust: 100%;
    font-size: 14px;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  a:active,
  a:focus,
  a:hover {
    outline-width: 0;
    background-color: transparent;
  }
  ul, 
  ol {
    list-style-type: none;
  }
  img {
    border: none;
  }
  input {
    border:  none;
    outline: none;
    background-color: transparent;
  }
  input[type="color"] {
    cursor: pointer;
    vertical-align: middle;
  }
  input[type="checkbox"] {
    cursor: pointer;
    vertical-align: middle;
  }
  label {
    cursor: pointer;
  }
  select {
    appearance: none;
    outline: none;
    cursor: pointer;
    border: none;
  }
</style>
