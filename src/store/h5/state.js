export default {
  top: 0,                 // 添加元件的初始纵坐标
  page: {
    page: true,
    title: '一个活动',    // 页面 title
    height: 2800,         // 画布高度
    endTime: new Date()   // 截止日期
  },
  activeElement: {},      // 选中对象，要么是元件，要么是页面
  type: '',               // 选中元素类型
  index: -1,              // 选中元素索引
  counter: 0,             // 容器副本命名时避免重名所用的计数器
  image: [],              // 图片元件
  text: [],               // 文本元件
  container: [],          // 容器元件
  signup: []              // 注册组件
}