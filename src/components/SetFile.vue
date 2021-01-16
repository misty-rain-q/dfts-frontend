<template>
    <div id="SetFile">
      <br>
      <div class="extraction">
        添加提取码：
        <a-input-password placeholder="不添加则不写" v-model="password" />

      </div>

        <br>
        <div>
          <span>有&nbsp;效&nbsp;日&nbsp;期：&nbsp;&nbsp;</span>
          <a-select class="date" default-value="forever"
            style="width: 120px"
            @change="handleChange"

            v-model="datelist">
            <a-select-option value="forever">
              永久
            </a-select-option>
            <a-select-option value="month">
              1个月
            </a-select-option>
            <a-select-option value="week">
              1星期
            </a-select-option>
            <a-select-option value="day">
              1天
            </a-select-option>
            <a-select-option value="hour">
              1小时
            </a-select-option>
          </a-select>
        </div>

        <br>
        <div>
        <span>可下载次数：&nbsp;&nbsp;</span>
        <a-select class="counter" default-value="max"
         style="width: 90px" @change="downloadCountChange" v-model="downlist">
          <a-select-option value="max" >
            无限次
          </a-select-option>
          <a-select-option value="number" >
            有限次
          </a-select-option>
        </a-select>
        <a-input-number :disabled="disabled"
        id="inputNumber" :min="1" @change="onChange" v-model="downnum" />
        </div>

        <br>
        <div class="verificationArea">
        <p class="verifyP">验证码：</p><a-input class = "vecode" v-model="vcode" />
        <div class="s-canvas" @click="createdCode">
          <canvas ref="captchaCanvas" :width="contentWidth" :height="contentHeight"></canvas>
        </div>

        </div>

    </div>
</template>

<script>

// import svgCaptcha from 'svg-captcha';

export default {
  name: 'SetFile',
  props: {
    fontSizeMin: {
      type: Number,
      default: 25,
    },
    fontSizeMax: {
      type: Number,
      default: 30,
    },
    backgroundColorMin: {
      type: Number,
      default: 255,
    },
    backgroundColorMax: {
      type: Number,
      default: 255,
    },
    colorMin: {
      type: Number,
      default: 0,
    },
    colorMax: {
      type: Number,
      default: 160,
    },
    lineColorMin: {
      type: Number,
      default: 100,
    },
    lineColorMax: {
      type: Number,
      default: 255,
    },
    dotColorMin: {
      type: Number,
      default: 0,
    },
    dotColorMax: {
      type: Number,
      default: 255,
    },
    contentWidth: {
      type: Number,
      default: 120,
    },
    contentHeight: {
      type: Number,
      default: 34,
    },
  },

  data() {
    return {
      disabled: true,
      password: '',
      datelist: 'day',
      downlist: 'max',
      downnum: 0,
      identifyCode: '',
      vcode: '',

    };
  },

  watch: {
    password() {
      this.$emit('changeECode', this.password);
    },
    datelist() {
      this.$emit('changeEDate', this.datelist);
    },
    downlist() {
      this.$emit('changeDset', this.downlist);
    },
    downnum() {
      this.$emit('changeDTime', this.downnum);
    },
    identifyCode() {
      this.$emit('changeIdentifyCode', this.identifyCode);
    },
    vcode() {
      this.$emit('inputCode', this.vcode);
    },

  },

  methods: {
    createdCode() {
      const len = 4;
      const codeList = [];
      const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz23456789';
      const charsLen = chars.length;
      for (let i = 0; i < len; i += 1) {
        codeList.push(chars.charAt(Math.floor(Math.random() * charsLen)));
      }
      this.identifyCode = codeList.join('');
      this.$emit('getIdentifyCode', this.identifyCode.toLowerCase());
      this.drawPic();
    },

    // 生成一个随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 生成一个随机的颜色
    randomColor(min, max) {
      const r = this.randomNum(min, max);
      const g = this.randomNum(min, max);
      const b = this.randomNum(min, max);
      return `rgb(${r},${g},${b})`;
    },

    drawPic() {
      // const canvas = document.getElementById('s-canvas')
      const canvas = this.$refs.captchaCanvas;
      const ctx = canvas.getContext('2d');
      ctx.textBaseline = 'bottom';
      // 绘制背景
      ctx.fillStyle = this.randomColor(this.backgroundColorMin, this.backgroundColorMax);
      ctx.fillRect(0, 0, this.contentWidth, this.contentHeight);
      // 绘制文字
      for (let i = 0; i < this.identifyCode.length; i += 1) {
        this.drawText(ctx, this.identifyCode[i], i);
      }
      this.drawLine(ctx);
      this.drawDot(ctx);
    },

    drawText(ctx, txt, i) {
      const ctx1 = ctx;
      ctx1.fillStyle = this.randomColor(this.colorMin, this.colorMax);
      ctx1.font = `${this.randomNum(this.fontSizeMin, this.fontSizeMax)}px SimHei`;
      const x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1));
      const y = this.randomNum(this.fontSizeMax, this.contentHeight - 5);
      const deg = this.randomNum(-45, 45);
      // 修改坐标原点和旋转角度
      ctx1.translate(x, y);
      ctx1.rotate((deg * Math.PI) / 180);
      ctx1.fillText(txt, 0, 0);
      // 恢复坐标原点和旋转角度
      ctx1.rotate((-deg * Math.PI) / 180);
      ctx1.translate(-x, -y);
    },

    // 绘制干扰线
    drawLine(ctx) {
      const ctx1 = ctx;
      for (let i = 0; i < 5; i += 1) {
        ctx1.strokeStyle = this.randomColor(this.lineColorMin, this.lineColorMax);
        ctx1.beginPath();
        ctx1.moveTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight));
        ctx1.lineTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight));
        ctx1.stroke();
      }
    },

    // 绘制干扰点
    drawDot(ctx) {
      const ctx1 = ctx;
      for (let i = 0; i < 80; i += 1) {
        ctx1.fillStyle = this.randomColor(0, 255);
        ctx1.beginPath();
        ctx1.arc(this.randomNum(0, this.contentWidth),
          this.randomNum(0, this.contentHeight), 1, 0, 2 * Math.PI);
        ctx1.fill();
      }
    },
    handleChange() {
      console.log('handleChange');
    },
    onChange(value) {
      console.log('changed', value);
    },
    downloadCountChange() {
      if (this.downlist === 'max') this.disabled = true;
      else this.disabled = false;
    },
    clearData() {
      this.disabled = true;
      this.password = '';
      this.datelist = 'day';
      this.downlist = 'max';
      this.downnum = 0;
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        let fileResult = '';
        reader.readAsDataURL(file);
        reader.onload = () => {
          fileResult = reader.result;
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.onloadend = () => {
          resolve(fileResult);
        };
      });
    },
  },
  mounted() {
    this.createdCode();
  },
};

</script>

<style scoped>
.s-canvas {
  height: 38px;
  cursor: pointer;
}
.s-canvas canvas{
  margin-top: 1px;
  margin-left: 8px;
}

#SetFile{
    /* text-align: left;
    position: absolute; */
    bottom: 20%;
    right:13%;

}

.counter {
  margin-right: 10px;
}

.extraction .ant-input-password {
  width: 150px;
}

.ant-input-number {
  width: 80px;
}

.vecode{
  width: 80px;
}

.verificationArea {
  display: flex;
}

.verifyP {
  line-height: 20px;
  width: 88px;
}

</style>
