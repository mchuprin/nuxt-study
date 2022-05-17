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
        type="file"
        class="file-input"
        multiple
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
import { ref, useContext } from "@nuxtjs/composition-api";
import { useFilesToFormData } from "@/composables/useFiles";

export default {
  name: "files",
  layout: "Layout",
  setup() {
    const files = ref();
    const { $axios } = useContext();

    $axios.get('/api/files', )
      .then(value => files.value = value.data)

    const dragFile = async (e) => {
      const filesToSend = useFilesToFormData(e.dataTransfer.files)
      await $axios.post( '/api/files',
        filesToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
    }
    return { dragFile, files }
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
