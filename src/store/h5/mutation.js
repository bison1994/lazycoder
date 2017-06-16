export default {
  // 设置 mousemove 操作的初始值
  initmovement (state, payload) {
    for (var key in payload) {
      state[key] = payload[key]
    }
  },

  // 移动元件
  move (state, payload) {
    var target = state.activeElement;
    var left = payload.dx > 0 ? payload.dx : 0;
    var top = payload.dy > 0 ? payload.dy : 0;

    target.left = left;
    target.top = top;
  },

  // 调整元件尺寸
  resize (state, payload) {
    var target = state.activeElement;
    var width = payload.dx < 10 ? 10 : payload.dx < 750 ? payload.dx : 750;
    var height = payload.dy < 10 ? 10 : payload.dy;

    target.width = width;
    target.height = height;
  },

  // 初始化选中对象
  initActive (state) {
    state.activeElement = state.page;
  },

  // 选中元件与取消选中
  select (state, payload) {
    if (payload.type) {
      state.activeElement = state[payload.type][payload.index];
      state.type = payload.type;
      state.index = payload.index;
    } else {
      state.activeElement = state.page;
      state.type = '';
      state.index = -1;
    }
  },

  // 删除选中元件
  delete (state) {
    if (state.type) {
      // 如果删除的是容器，须将内部元件一并删除
      if (state.type === 'container') {
        var name = state.activeElement.name;

        for (var i = 0; i < state.image.length; i++) {
          if (state.image[i].belong === name) {
            state.image.splice(i, 1)
          }
        }
        for (var i = 0; i < state.text.length; i++) {
          if (state.text[i].belong === name) {
            state.text.splice(i, 1)
          }
        }
      }

      // 删除元件
      state[state.type].splice(state.index, 1);

      // 重置选中项为页面
      state.activeElement = state.page;
      state.type = '';
      state.index = -1;
    }
  },

  // 添加图片
  addImage (state, payload) {
    var base = {  
      type: 'image',
      left: 0,
      z: 0,
      href: '',                         // 超链接
      hoverPic: '',                     // hover 图片预览的 url（base64 或 线上路径）
      hoverSrc: '',                     // hover 图片实际的 url
      expirePic: '',                    // 结束状态 图片预览的 url（base64 或 线上路径）
      expireSrc: '',                    // 结束状态 图片实际的 url
      belong: 'page',                    // 属于哪个容器
      index: 0
    }

    payload.forEach(function (val) {
      state.image.push(Object.assign(val, base))
    })
  },

  // 添加 hover 图片
  addHoverPic (state, payload) {
    state.activeElement.hoverPic = payload[0].url;
    state.activeElement.hoverSrc = payload[0].src;
  },

  // 添加 结束状态 图片
  addExpirePic (state, payload) {
    state.activeElement.expirePic = payload[0].url;
    state.activeElement.expireSrc = payload[0].src;
  },

  // 替换图片
  replaceImage (state, payload) {
    state.activeElement.width = payload[0].width;
    state.activeElement.url = payload[0].url;
  },

  // 添加文本
  addText (state, payload) {
    state.text.push({
      type: 'text',
      width: 650,
      height: 100,
      left: 50,
      top: payload.top,
      lineHeight: 1.6,
      text: '',
      z: 0,
      href: '',
      belong: 'page',
      index: 0
    });
  },

  // 更新文本
  updateText (state, payload) {
    var target = state.text[payload.index];
    if (target) {
      target.text = payload.text;
    }
  },

  // 添加容器
  addContainer (state, payload) {
    state.container.push({
      name: '',
      type: 'container',
      width: 650,
      height: 300,
      left: 50,
      top: payload.top,
      z: 0,
      dir: 'row',
      justify: 'flex-start',
      align: 'flex-start'
    });
  },

  // 复制元件
  copy (state, payload) {
    if (state.type) {
      var copy = Object.assign({}, state.activeElement);

      // 由于容器的名称必须是唯一的，故复制容器需作处理
      if (state.type === 'container') {
        var name = state.activeElement.name;
        if (name) {
          // 设置容器副本的名称
          var copyName = name.split('-')[0] + '-' + state.counter;
          copy.name = copyName;

          // 复制容器内的图片和文本
          for (var i = 0, len = state.image.length; i < len; i++) {
            if (state.image[i].belong === name) {
              state.image.push(Object.assign({}, state.image[i], {belong: copyName}))
            }
          }
          for (var i = 0, len = state.text.length; i < len; i++) {
            if (state.text[i].belong === name) {
              state.text.push(Object.assign({}, state.text[i], {belong: copyName}))
            }
          }

          state.counter += 1;
        } else {
          alert('只有命名容器才能复制，请先命名')
        }
      }

      state[state.type].push(copy)
    }
  }
}