<template>
    <div class="uploadwindow">
        <UploadWord></UploadWord>

        <div id="flexbox1">
        <UploadList></UploadList>
        <DragUpload></DragUpload>
        <div id="flexbox2">
        <SetFile></SetFile>
        </div >
        </div>
        <CancelAndUpload></CancelAndUpload>

    </div>
</template>

<script>
import UploadWord from '@/components/UploadWord.vue';
import UploadList from '@/components/UploadList.vue';
import DragUpload from '@/components/DragUpload.vue';
import SetFile from '@/components/SetFile.vue';
import CancelAndUpload from '@/components/CancelAndUpload.vue';

export default {
  name: 'UploadWindow',

  components: {
    UploadWord,
    UploadList,
    DragUpload,
    SetFile,
    CancelAndUpload,
  },

};
</script>

<style scoped>

#flexbox1{
    display: flex;
}

#flexbox2{
    display:flex;
    flex-direction: row;
}

</style>
