<template>
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
      <i class="material-icons">web_asset</i>
      <div class="panel-label">display</div>
      <div>
        <select v-model="activeElement.display">
          <option>flex</option>
          <option>block</option>
        </select>
      </div>
    </div>

    <div class="panel-row" flex v-show="activeElement.display === 'flex'">
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

    <div class="panel-row" flex v-show="activeElement.display === 'flex'">
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

    <div class="panel-row" flex v-show="activeElement.display === 'flex'">
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

    <hr>
    <div class="panel-row" flex>
      <i class="material-icons">invert_colors</i>
      <div class="panel-label">背景色</div>
      <div class="panel-value">{{ activeElement.bgColor }}</div>
      <div>
        <input type="color" v-model="activeElement.bgColor">
      </div>
    </div>

    <div class="panel-row" flex>
      <i class="material-icons">wallpaper</i>
      <div class="panel-label">背景图</div>
      <div class="panel-cell">
        <div class="panel-preview"
          @click="addPic"
          :style="{ backgroundImage: 'url(' + activeElement.backPic + ')' }">
          <i class="material-icons" v-show="!activeElement.backPic">add</i>
        </div>
      </div>
    </div>

    <div class="panel-row" flex>
      <i class="material-icons">crop_square</i>
      <div class="panel-label">圆角</div>
      <div>
        <input type="text" v-model="activeElement.radius">
      </div>
    </div>

    <div class="panel-row" flex>
      <i class="material-icons">border_outer</i>
      <div class="panel-label">边的宽度</div>
      <div>
        <input type="text" v-model="activeElement.borderWidth">
      </div>
    </div>

    <div class="panel-row" flex>
      <i class="material-icons">border_color</i>
      <div class="panel-label">边的颜色</div>
      <div class="panel-value">{{ activeElement.borderColor }}</div>
      <div>
        <input type="color" v-model="activeElement.borderColor">
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		props: ['activeElement'],
    methods: {
      addPic () {
        $communicator.$emit('upload', (payload) => {
          this.$store.commit('addContainerBackPic', payload)
        })
      }
    }
	}
</script>