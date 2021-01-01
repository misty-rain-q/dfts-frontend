<template>
    <div class="dragupload">
        <img class="file" src="../assets/file.png" alt="">
        <p id="sentence1">点击或将文件拖拽到这里上传</p>
        <p id="sentence2">支持扩展名：.rar .zip .doc .docx .pdf .jpg</p>

    </div>
</template>
<style scoped>
    .dragupload{
        border: 1px solid silver;
        text-align: center;
        /* height: 200; */
        /* width:400; */
        /* position: absolute;
        top: 15%;
        right:5%; */

    }

    .file{
        width: 10%;;
    }

    #sentence1{
        font-size: 16px;

    }

    #sentence2{
        color: dashed silver;
        font-size: 12px;
    }

</style>
