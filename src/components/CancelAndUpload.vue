<template>
    <div class="cancelandupload">
     <a-button id="cancel" @click="turnToMainPage" type="primary">
       取消
      </a-button>
    <a-button  id="upl" type="primary" icon="upload" :size="size">
      上传文件
    </a-button>
    </div>
</template>

<style scoped>
.cancelandupload{
  position: absolute;
  bottom: 5%;
  right: 15%;

}

#cancel{
  position: relative;
  right:90%;

}

#upl{
position: relative;
left:90%;
}

</style>
