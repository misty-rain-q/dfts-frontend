<template>
    <div id="SetFile">
         <button id="selectfile">选择文件</button>
         <br>
        添加提取码：<input type="text" id="extraction" value="不添加则不填写"
        onfocus="if(value=='不添加则不填写')value=''" onblur="if(!value)value='不添加则不填写'" name="keyword" >
        <br>
        有效日期：&nbsp;&nbsp;<input type="text" id="date" value="1"/>
        <input type="button" v-on:click="adddate" value="+">
        <input type="button" v-on:click="subdate" value="-">天
        <br>
        下载次数：&nbsp;&nbsp;<input type="text" id="downloadtime" value="1"/>
        <input type="button" v-on:click="addtime" value="+">
        <input type="button" v-on:click="subtime" value="-">次

    </div>
</template>

<script>
export default {
  methods: {
    adddate() {
      const txt = document.getElementById('date');
      let a = txt.value;
      a += 1;
      txt.value = a;
    },
    subdate() {
      const txt = document.getElementById('date');
      let a = txt.value;
      if (a > 1) {
        a -= 1;
        txt.value = a;
      } else {
        txt.value = 1;
      }
    },

    addtime() {
      const txt = document.getElementById('downloadtime');
      let a = txt.value;
      a += 1;
      txt.value = a;
    },

    subtime() {
      const txt = document.getElementById('downloadtime');
      let a = txt.value;
      if (a > 1) {
        a -= 1;
        txt.value = a;
      } else {
        txt.value = 1;
      }
    },
  },
};

</script>

<style scoped>
#SetFile{
    text-align: left;
    position: absolute;
    bottom: 20%;
    right:13%;

}

#selectfile{
    margin-bottom: 20px;
    position: relative;
    top:0px;
    left:30%;

}

#extraction{

}

#date{
    margin-top:20px;
}

#downloadtime{
    margin-top: 20px;

    position: relative;

}

</style>
