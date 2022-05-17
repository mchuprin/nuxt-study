<template>
  <div>
    <div class="files">
      <button class="files__button">
        <img src="~/assets/grid.svg">
      </button>
      <button class="files__button">
        <img src="~/assets/list.svg">
      </button>
    </div>
    <form>
      <input
        id="file"
        ref="file"
        type="file"
        multiple
        @change="uploadFile"
      />
      <label
        @dragover.prevent
        @drop.prevent @drag
        for="file"
        class="drop-zone"
        @drop="dragFile">
        <div
          v-if="files"
          v-for="file in files"
          class="drop-zone__file-preview"
          :style="{ backgroundImage: `url(${file})` }" >
        </div>
      </label>
    </form>
  </div>

</template>

<script>
import { ref, useContext, watch } from "@nuxtjs/composition-api";

export default {
  name: "files",
  layout: "Layout",
  setup() {
    const files = ref()
    const uploadedFiles = ref(null)
    const { $axios } = useContext();

    $axios.get('/api/files', )
      .then(value => files.value = value.data)

    watch(files, (v) => console.log(v))

    const uploadFile = (e) => e.target.files;
    const dragFile = async (e) => {
      let data = new FormData();
      console.log(e.dataTransfer.files)
      data.append('file', e.dataTransfer.files[0])
      await $axios.post( '/api/files',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
    }
    return { uploadFile, dragFile, files, uploadedFiles }
  }
}
</script>

<style scoped lang="scss">
.files {

  &__button {
    img {
      height: 35px;
    }
  }
}
.drop-zone {
  padding: 10px;
  display: flex;
  flex-direction: row;
  width: 80%;
  min-height: 200px;
  border: solid white 2px;
  border-radius: 20px;
  &__file-preview {
    border-radius: 10px;
    background-size: cover;
    background-position: center;
    margin-right: 10px;
    width: 100px;
    height: 100px;
  }
}
</style>
