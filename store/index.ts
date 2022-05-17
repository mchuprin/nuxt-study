import IFile from '~/interfaces/IFile';

export const state = () => ({
  files: [] as IFile[]
})

export const mutations = {
  addFile(state: any, file: IFile) {
    state.files.push(file)
  },
  deleteFile(state: any, fileId: string) {
    state.files = state.files.filter((file: IFile) => file.id !== fileId)
  }
}


export const actions = {}

export const getters = {
  getFiles: (state: any) => state.files
}
