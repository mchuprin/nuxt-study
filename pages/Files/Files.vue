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
        @click.prevent
        accept="image/png, image/gif, image/jpeg"
        id="file"
        type="file"
        class="file-input"
        multiple
      />
      <label
        @dragover.prevent
        @drop.prevent @drag
        for="file"
        @drop="dragFile">
        <TransitionGroup class="drop-zone" name="images">
          <div
            v-for="(file, index) in files"
            :key="index+file"
            class="drop-zone__file-view"
            :style="{ backgroundImage: `url(${file})` }"
          ></div>
          <div
            v-for="(preview, index) in filesPreview"
            :key="index+preview"
            class="drop-zone__file-preview"
            :style="{ backgroundImage: `url(${preview})` }"
          ></div>
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
    const filesPreview = ref([]);

    onMounted(async () => {
      await getFiles();
      files.value = gotFiles.value.reverse();
    })

    const dragFile = async (e) => {
      const data = new FormData();
      [...e.dataTransfer.files].forEach((file, index) => {
        filesPreview.value.push(URL.createObjectURL(file))
        data.append(`file${index+1}`, file)
      })
      await sendFiles(data);
      filesPreview.value = [];
      URL.revokeObjectURL(filesPreview.value)
      sentFiles.value.forEach(file => files.value.push(file))
    }
    return { dragFile, files, gettingFilesLoading, sendingFilesLoading, filesPreview }
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
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: max-content;
  min-height: max-content;
  border: solid white 2px;
  border-radius: 20px;
  &__file-preview {
    border-radius: 10px;
    background-size: cover;
    opacity: 0.5;
    background-position: center;
    width: 100px;
    height: 100px;
  }
  &__file-view {
    border-radius: 10px;
    background-size: cover;
    background-position: center;
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
