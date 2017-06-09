export default {
	page: {
		page: true,
		title: '一个活动',		// 页面 title
		height: 2800          // 画布高度
	},
	activeElement: {				// 选中对象，要么是元件，要么是页面
		page: true
	},    	
	type: '',								// 选中元素类型
	index: -1,							// 选中元素索引
	image: [],
	text: [],
	container: [],
	counter: 0              // 容器副本命名时避免重名所用的计数器
}