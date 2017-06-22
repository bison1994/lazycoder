<template>
	<form 
    v-if="data"
		data-type="signup"
    data-index="0"
    :class="{'container-active': type == 'signup' && index == 0}"
    :style="{
      position: 'absolute',
      width: data.width / 7.5 + '%',
      height: data.height / height * 100 + '%',
      left: data.left / 7.5 + '%',
      top: data.top / height * 100 + '%',
      zIndex: data.z
    }">

		<!-- 移动控件 -->
	  <div class="move-bar"
	    data-type="signup"
	    data-draggable="true"
	    data-index="0">
	  </div>

	  <!-- 尺寸调节控件 -->
    <div data-type="signup" 
      data-index="0" 
      class="size-control"
      @mousedown="handleResize">
    </div>
    
    <!-- 手机号 -->
    <div flex class="item">
      <div class="ipt-l">
        <img :src="data.phoneIcon" height="24px" @click="uploadIcon('phoneIcon')">
      </div>
			
			<div class="ipt-m">
      	<input maxlength="11" type="tel" name="phone" placeholder="请输入手机号">
			</div>

      <div class="ipt-r">
        <img src="./assets/times_circle.png" height="24px">
      </div>
    </div>
    
    <!-- 密码 -->
    <div flex class="item">
      <div class="ipt-l">
        <img :src="data.passIcon" height="24px" @click="uploadIcon('passIcon')">
      </div>
			
			<div class="ipt-m">
  	    <input type="password" name="password" placeholder="请设置登录密码">
			</div>

      <div class="ipt-r">
        <img src="./assets/eye_close.png" height="24px">
      </div>
    </div>
  
    <!-- 图形验证码 -->
    <div flex id="valicode-li" class="item" v-show="data.toggleVali">
      <div class="ipt-l">
        <img :src="data.graphIcon" height="24px" @click="uploadIcon('graphIcon')">
      </div>

      <div class="ipt-m">
        <input type="text" name="valicode" placeholder="请输入图形验证码">
      </div>
    </div>
    
    <!-- 短信验证码 -->
    <div flex class="item">
      <div class="ipt-l">
        <img :src="data.valiIcon" height="24px" @click="uploadIcon('valiIcon')">
      </div>
			
			<div class="ipt-m">
	      <input type="text" name="phoneValicode" placeholder="请输入验证码">
			</div>

			<div class="ipt-r">
	      <input type="button" class="btn" value="获取验证码">
			</div>
    </div>

    <!-- 邀请人 -->
    <div flex class="item" v-if="!data.hideInvite">
      <div class="ipt-l">
        <img :src="data.inviteIcon" height="24px" @click="uploadIcon('inviteIcon')">
      </div>
      
      <div class="ipt-m">
        <input type="text" name="invitee" placeholder="请填写邀请人手机号（选填）">
      </div>
    </div>
  
    <!-- 提交按钮 -->
    <div
      class="submit" 
      :style="{
        bottom: data.bottom + 'px'
      }">
      <span @click="addBtnPic" v-show="!btn.belong">+上传按钮图片</span>
      <hover
        :val="btn"
        :width="data.width">
      </hover>
      <pic
        :val="btn"
        :width="data.width">
      </pic>
    </div>
    
    <p class="login" v-if="!data.hideSignIn">已有账号？直接登录</p>
  </form>
</template>

<script>
  import hover from '@/elements/hoverpic'
  import pic from '@/elements/image'

	export default {
		props: ['height', 'type', 'index'],

    components: {
      pic: pic,
      hover: hover
    },

		methods: {
      // 调整大小
      handleResize (e) {
        this.$emit('resize', e)
      },

      // 添加/替换注册按钮图片
      addBtnPic () {
        $communicator.$emit('upload', (payload) => {
          payload[0].belong = 'signup';
          this.$store.commit('addImage', payload);
        })
      },

      // 添加/替换小图标
      uploadIcon (name) {
        $communicator.$emit('upload', (payload) => {
          this.$store.commit('addSignIcon', {
            name: name,
            payload: payload[0]
          })
        })
      }
    },

		computed: {
			data () {
				return this.$store.state.h5.signup[0]
			},

      btn () {
        var b = this.$store.state.h5.image.filter(val => val.belong === 'signup');
        if (b.length > 0) {
          return b[0]
        } else {
          return {}
        }
      }
		}
	}
</script>

<style scoped>
.item {
  margin-bottom: .6rem;
  height: 3rem;
  align-items: center;
  background-color: #fff;
}
.ipt-l {
	width: 2rem;
	text-align: center;
	font-size: 0;
  flex-shrink: 0;
}
.ipt-m {
	flex-grow: 1;
  position: relative;
}
.ipt-r {
	font-size: 0;
  min-width: 2rem;
	text-align: center;
  height: 100%;
  line-height: 3.6rem;
}
.btn {
	width: 6.5rem;
	height: 100%;
  border: none;
  outline: none;
  box-shadow: none;
  opacity: .6;
  font-size: .875rem;
  background-color: #ccc;
}
.btn.forbid {
  pointer-events: none;
  background-color: #E8D6C0;
}
.btn:active {
  opacity: 1;
}
.vcode-wrapper {
  display: block;
  width: 180px;
}
input {
  border: none;
  width: 100%;
  font-size: .875rem;
}
input::-webkit-input-placeholder {
  color: #ccc;
}
.submit {
  width: 100%;
  position: absolute;
  left: 0;
  font-size: .8rem;
  height: 2rem;
  text-align: center;
  cursor: pointer;
}
.submit img {
  left: 50% !important;
  transform: translate(-50%);
}
.login {
  position: absolute;
  font-size: .875rem;
  width: 60%;
  height: 2rem;
  line-height: 2rem;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  text-align: center;
}
.ipt-l img {
  position: relative;
  cursor: pointer;
  min-width: 24px;
}
.ipt-l img:before {
  display: block;
  width: 24px;
  height: 24px;
  font-family: 'Material Icons';
  content: 'add';
  position: absolute;
  top: -1px;
  left: -1px;
  z-index: 2;
  background-color: #fff;
  font-size: 1rem;
  color: #ccc;
}
</style>