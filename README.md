# lazycoder

[have a try]()

### 说明
1、h5 端 psd 文件宽度限定只能是 750px，所有切出的图片保持原大小，lazycoder 会自动计算出一个百分比宽度<br>
2、必须给画布一个高度，此高度等于 psd 文件中整个图片的高度<br>
3、所有图片大小不可调整，保持在 psd 中的原始大小。如需调整，请修改 psd<br>
4、所有元件均采用绝对定位，坐标全部采用百分比，以满足适配的需要<br>

### 结构
1、图片和文本是基础元件，基础元件可以添加到容器中<br>
2、容器采用 flex 布局<br>

### 操作
1、双击图片可以重新上传替换原图<br>
2、按 delete 键，可以删除当前选中的元件<br>
3、点右上角图标，可对选中元件进行复制与删除操作<br>