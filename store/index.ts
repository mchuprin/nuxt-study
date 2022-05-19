export const state = () => ({
  selectedFiles: [],
})

export const mutations = {
  addSelectedFile(state, file) {
    console.log(file)
    state.selectedFiles.push(file)
  },
  removeSelectedFile(state, file) {
    console.log(file)
    state.selectedFiles = state.selectedFiles.filter(selectedFile => selectedFile !== file)
    console.log(state.selectedFiles)
  },
  clearSelectedFiles(state) {
    state.selectedFiles = [];
  }
}

export const actions = {}

export const getters = {
  getSelectedFiles(state) {
    return state.selectedFiles;
  }
}
