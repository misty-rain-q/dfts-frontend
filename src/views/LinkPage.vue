<template>
    <div class="linkPage">
        <a-progress class="successIcon"
        type="circle"
        :stroke-color="{
            '0%': '#108ee9',
            '100%': '#87d068',
        }"
        :percent="100" :width="80"
        />
        <div class="linkAdress">
          <p class="fontLink">文件ID</p>
          <p class="address">afbe12kjr3422kjf</p>
          <a-button class="copy" type="primary" icon="copy">复制</a-button>
        </div>
        <div class="linkAdress">
          <p class="fontLink">复制链接</p>
          <p class="address">https://www.antdv.com/components/progress-cn/12313213123132132132132</p>
          <a-button class="copy" type="primary" icon="copy">复制</a-button>
        </div>
        <p class="codeTitle">二维码</p>
        <div class="code"></div>
    </div>
</template>

<script>
export default {
  name: 'LinkPage',
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>

<style scoped>
.linkPage {
    text-align: center;
    /* display: flex; */
}

.successIcon {
    margin-bottom: 20px;
}
.linkAdress {
    display: flex;
    align-items: center;
}

.fontLink {
    font-size: 16px;
    margin-right: 20px;
    width: 80px;
}

.address {
    border: 1px solid silver;
    width: 60%;
    padding: 4px 2px;
}

.copy {
    margin-right: 10px;
    margin-left: auto;
}

.codeTitle {
    margin: 5px auto;
}

.code {
    border: 1px solid black;
    width: 100px;
    height: 100px;
    margin: 5px auto;
}
</style>
