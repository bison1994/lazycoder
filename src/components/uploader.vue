<template>
  <div>
  	<input type="file" 
  		accept="image/png, image/jpeg, image/gif" 
  		multiple
  		id="uploader" 
  		style="display: none" 
  		@change="handleUpload">

    <!-- loading -->
    <!-- 上传过程中，应禁止用户其它操作，故须设置遮罩层 -->
    <div class="mask"></div>
  </div>
</template>

<script>
	export default {
		data () {
			return {
				uploader: null,
        uploadAction: 0,    // 0 - 新增 | 1 - 替换 | 2 - 添加 hover 图片
        top: 0
			}
		},
		mounted () {
      this.uploader = document.getElementById('uploader');

      // 在全局通信中介上注册一个自定义事件
      $communicator.$on('upload', (type, top) => {
        this.top = top || 0;
        this.triggerUploader(type);
      })
		},
		methods: {
			triggerUploader (type) {
				type = type || 0;
				this.uploadAction = type;
        this.uploader.click();
      },

      /**
       * 处理添加图片操作
 			 * uploadAction 0 - 添加 | 1 - 替换 | 2 - 添加 hover 图片 | 3 - 添加 结束状态 图
       */
      handleUpload () {
        var files = this.uploader.files;

        if (!files || files.length == 0) return

        // 将 filelist 转换为数组格式
        files = Array.prototype.slice.call(this.uploader.files);

        // 上传图片
        // $.post('', files, () => {

        // })

        // 等所有图片下载完，再提交 mutation
        new Promise((resolve) => {
          this.handleDownloadQueue(resolve, files)();
        })
        .then((payload) => {
          // 新增图片
          if (this.uploadAction === 0) {
            this.$store.commit('addImage', payload)
          }

          // 替换图片
          if (this.uploadAction === 1) {
            this.$store.commit('replaceImage', payload)
          }

          // 添加/替换 hover 图片
          if (this.uploadAction === 2) {
            this.$store.commit('addHoverPic', payload)
          }

          // 添加/替换 结束状态 图片
          if (this.uploadAction === 3) {
            this.$store.commit('addExpirePic', payload)
          }
        })
      },

      /* 使用 new Image 预加载的方式获取图片宽高
			 * 这是一个异步操作，须采用 promise
       */
      getImageWidth (url, res) {
        var img = new Image();
        img.src = url;
        img.onload = function () {
          res({
          	w: Math.round(img.width),
          	h: Math.round(img.height)
          })
        }
      },

      /* 处理下载队列
       * 图片按顺序下载完一张再下载下一张，确保图片数组按上传的顺序排列
       */
      handleDownloadQueue (resolve, files) {
        var i = 0;
        var len = files.length;
        var payload = [];

        var download = () => {
        	// 接入后端后，files 应改为回调参数
          // url = files[i]
          var url = window.URL.createObjectURL(files[i]);
          
          new Promise((res) => {
            this.getImageWidth(url, res)
          })
          .then((size) => {
            payload.push({
              width: size.w,
              height: size.h,
              top: this.top,
              url: url,                         // 图片预览地址
              src: 'images/' + files[i].name,   // 图片实际地址
            })

	          if (++i == len) {
	          	resolve(payload)
	          } else {
	          	download();
	          }
          })
        }

        return download
      }
		}
	}
</script>