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
    <div v-if="gettingFilesLoading || sendingFilesLoading">Dear loading...</div>
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
        <TransitionGroup name="images">
          <div
            v-for="(file, index) in files"
            :key="index"
            class="drop-zone__file-preview"
            :style="{ backgroundImage: `url(${file})` }"
          >
          </div>
        </TransitionGroup>
      </label>
    </div>
  </div>

</template>

<script>
import { onMounted, ref } from "@nuxtjs/composition-api";
import { useGetFiles, useSendFiles } from "@/composables/useFiles";

export default {
  name: "files",
  layout: "Layout",
  setup() {
    const { fetch: getFiles, result: gotFiles, error: gettingFilesError, isLoading: gettingFilesLoading } = useGetFiles();
    const { fetch: sendFiles, result: sentFiles, error: sendingFilesError, isLoading: sendingFilesLoading } = useSendFiles();

    const files = ref([]);

    onMounted(async () => {
      await getFiles();
      files.value = gotFiles.value;
    })

    const dragFile = async (e) => {
      const data = new FormData();
      [...e.dataTransfer.files].forEach((file, index) => {
        data.append(`file${index+1}`, file)
      })
      await sendFiles(data);
      files.value.unshift(sentFiles.value);
    }
    return { dragFile, files, gettingFilesLoading, sendingFilesLoading }
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
.images-enter-active,
.images-leave-active {
  transition: all 0.5s ease;
}
.images-enter-from,
.images-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
