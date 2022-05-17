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
    <div>
      <input
        id="file"
        ref="file"
        type="file"
        class="file-input"
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
    </div>
  </div>

</template>

<script>
import { ref, useContext, watch } from "@nuxtjs/composition-api";

export default {
  name: "files",
  layout: "Layout",
  setup() {
    const files = ref()
    const { $axios } = useContext();

    $axios.get('/api/files', )
      .then(value => files.value = value.data)

    const uploadFile = (e) => e.target.files;
    const dragFile = async (e) => {
      let formData = new FormData();
      [...e.dataTransfer.files].forEach((file, index) => {
        formData.append(`file${index+1}`, file)
      })
      await $axios.post( '/api/files',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
    }
    return { uploadFile, dragFile, files }
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
.file-input {
  display: none;
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
