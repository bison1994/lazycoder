<template>
  <div class="panel-wrap" v-if="!activeElement.page && tab === 1">
    <!-- 基础属性 -->
    <div class="panel-row" flex>
      <i class="material-icons">layers</i>
      <div class="panel-label">层级</div>
      <div class="panel-value">{{ activeElement.z }}</div>
      <div class="panel-slider-wrap">
        <slider v-model="activeElement.z" :step="1" :max="20" />
      </div>
    </div>

    <hr>

    <div class="panel-row" flex v-show="activeElement.type !== 'image'">
      <i class="material-icons">border_horizontal</i>
      <div class="panel-label">宽度</div>
      <div class="panel-value">{{ activeElement.width }}</div>
      <div class="panel-slider-wrap">
        <slider v-model="activeElement.width" :max="750" />
      </div>
    </div>

    <div class="panel-row" flex v-show="activeElement.type !== 'image'">
      <i class="material-icons">border_vertical</i>
      <div class="panel-label">高度</div>
      <div class="panel-value">{{ activeElement.height }}</div>
      <div class="panel-slider-wrap">
        <slider v-model="activeElement.height" :max="height" />
      </div>
    </div>

    <div class="panel-row" flex>
      <i class="material-icons">arrow_back</i>
      <div class="panel-label">横坐标</div>
      <div class="panel-value">{{ activeElement.left }}</div>
      <div class="panel-slider-wrap">
        <slider v-model="activeElement.left" :step="1" :max="750" />
      </div>
    </div>

    <div class="panel-row" flex>
      <i class="material-icons">arrow_upward</i>
      <div class="panel-label">纵坐标</div>
      <div class="panel-value">{{ activeElement.top }}</div>
      <div class="panel-slider-wrap">
        <slider v-model="activeElement.top" :step="1" :max="height" />
      </div>
    </div>

    <div class="panel-row" flex v-if="activeElement.lineHeight !== undefined">
      <i class="material-icons">format_line_spacing</i>
      <div class="panel-label">行高</div>
      <div class="panel-value">{{ activeElement.lineHeight }}</div>
      <div class="panel-slider-wrap">
        <slider :max="5" :min="1" v-model="activeElement.lineHeight" />
      </div>
    </div>


    <!-- 文本私有属性 -->
    <div v-if="activeElement.type === 'text'">
      <hr>

      <div class="panel-row" flex>
        <i class="material-icons">format_size</i>
        <div class="panel-label">字号</div>
        <div class="panel-value">{{ fontSize | convertFont }}px</div>
        <div class="panel-slider-wrap">
          <slider :step="1" :max="7" :min="1" v-model="fontSize" @input="execCommand('fontSize')" />
        </div>
      </div>

      <div class="panel-row" flex>
        <i class="material-icons">format_color_text</i>
        <div class="panel-label">颜色</div>
        <div class="panel-value">{{ foreColor }}</div>
        <div>
          <input type="color" v-model="foreColor" @input="execCommand('foreColor')">
        </div>
      </div>

      <div class="panel-row" flex>
        <i class="material-icons">format_bold</i>
        <div class="panel-label">加粗</div>
        <div>
          <input type="checkbox" v-model="bold" @mousedown="execSingleCommand('bold')">
        </div>
      </div>

      <div class="panel-row" flex>
        <i class="material-icons">format_align_justify</i>
        <div class="panel-label" @mousedown="execSingleCommand('justifyCenter')">对齐</div>
        <div>
          <input type="radio" name="align" value="left" id="txleft" 
            v-model="activeElement.align">
          <label for="txleft" title="左对齐" class="material-icons" 
            @mousedown="execSingleCommand('justifyLeft')">
            format_align_left
          </label>

          <input type="radio" name="align" value="center" id="txcenter" 
            v-model="activeElement.align">
          <label for="txcenter" title="居中" class="material-icons"
            @mousedown="execSingleCommand('justifyCenter')">
            format_align_center
          </label>

          <input type="radio" name="align" value="right" id="txright" 
            v-model="activeElement.align">
          <label for="txright" title="右对齐" class="material-icons"
            @mousedown="execSingleCommand('justifyRight')">
            format_align_right
          </label>
        </div>
      </div>
    </div>
    
    <!-- 容器私有属性 -->
    <div v-if="activeElement.type === 'container'">
      <hr>
      <div class="panel-row" flex>
        <i class="material-icons">bookmark_border</i>
        <div class="panel-label">容器名称</div>
        <div>
          <input type="text" v-model.trim="activeElement.name" placeholder="起个名儿">
        </div>
      </div>

      <div class="panel-row" flex>
        <i class="material-icons">shuffle</i>
        <div class="panel-label">主轴方向</div>
        <div>
          <select v-model="activeElement.dir">
            <option>row</option>
            <option>row-reverse</option>
            <option>column</option>
            <option>column-reverse</option>
          </select>
        </div>
      </div>

      <div class="panel-row" flex>
        <i class="material-icons">filter_list</i>
        <div class="panel-label">主轴分布</div>
        <div>
          <select v-model="activeElement.justify">
            <option>flex-start</option>
            <option>space-between</option>
            <option>center</option>
            <option>space-around</option>
            <option>flex-end</option>
          </select>
        </div>
      </div>

      <div class="panel-row" flex>
        <i class="material-icons">graphic_eq</i>
        <div class="panel-label">侧轴分布</div>
        <div>
          <select v-model="activeElement.align">
            <option>flex-start</option>
            <option>center</option>
            <option>flex-end</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 布局私有属性 -->
    <div v-if="activeElement.type === 'layout'">
      <hr>

      <div class="panel-row" flex>
        <i class="material-icons">bookmark_border</i>
        <div class="panel-label">标记</div>
        <div>
          <input type="text" v-model="activeElement.name" placeholder="起个名方便查找">
        </div>
      </div>

      <div class="panel-row" flex>
        <i class="material-icons">bookmark_border</i>
        <div class="panel-label">列数</div>
        <div>
          <input type="radio" v-model="activeElement.cols" value="2" name="columes">
          <input type="radio" v-model="activeElement.cols" value="3" name="columes">
          <input type="radio" v-model="activeElement.cols" value="4" name="columes">
        </div>
      </div>

      <div class="panel-row" flex>
        <i class="material-icons">panorama_horizontal</i>
        <div class="panel-label">高度</div>
        <div class="panel-value">
          <input type="checkbox">
          由内容决定
        </div>
        <div>
          <input type="text" v-model="activeElement.height" placeholder="请输入数字">
        </div>
      </div>
    </div>

    <!-- 添加到容器 -->
    <div v-if="activeElement.type === 'image' || activeElement.type === 'text'">
      <hr>
      <div class="panel-row" flex>
        <i class="material-icons">bookmark_border</i>
        <div class="panel-label">所属容器</div>
        <div class="panel-value">
          <select v-model="activeElement.belong">
            <option>page</option>
            <option v-for="val in containerName">{{ val }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
    data () {
      return {
        fontSize: 1,
        foreColor: '#333333',
        bold: false
      }
    },
    props: ['activeElement', 'tab'],
    mounted () {
      // 注册一个全局事件，来同步点中文本的参数
      $communicator.$on('syncFont', (val) => {
        this.bold = val;
      })
    },
    methods: {
      execCommand (type) {
        var _this = this;
        document.execCommand(type, false, _this[type]);
        // 重置色值
        this.foreColor = '#333333'
      },
      execSingleCommand (type) {
        document.execCommand(type)
      }
    },
		computed: {
      // 页面高度
      height () {
        return this.$store.state.h5.page.height
      },

      // 容器名称
      containerName () {
        return this.$store.getters.containerName
      }
    },
    filters: {
      convertFont (val) {
        switch (val) {
          case 1:
            return 12;
          case 2:
            return 14;
          case 3:
            return 16;
          case 4:
            return 18;
          case 5:
            return 24;
          case 6:
            return 28;
          case 7:
            return 32;
        }
      }
    }
	}
</script>

<style scoped>
  select {
    width: 100%;
    height: 100%;
  }
</style>

